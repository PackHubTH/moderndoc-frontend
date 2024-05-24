import { useEffect, useState } from 'react'

import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import useGetUsersByName from '@/modules/user/hooks/api/useGetUsersByName'
import { useUserStore } from '@/stores/userStore'
import { Controller } from 'react-hook-form'
import { FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import useActionDocument from '../hooks/api/useActionDocument'
import useActionDocumentForm from '../hooks/useActionDocumentForm'
import { ActionDocumentForm } from '../hooks/useActionDocumentForm/validation'
import { useDocumentStore } from '../stores/documentStore'
import { DocumentAction } from '../types/types'
import { getJson } from '../utils/documentEditorUtils'

type PropsType = {
  createdById: string
  createdByName: string
  documentId: string
  operatorId: string
  operatorName: string
  isOpen: boolean
  close: () => void
}

const ActionDocumentModal: React.FC<PropsType> = ({
  createdById,
  createdByName,
  documentId,
  isOpen,
  operatorId,
  operatorName,
  close,
}: PropsType) => {
  const { methods } = useActionDocumentForm()
  const { mutate: actionDocument } = useActionDocument()
  const canvasList = useDocumentStore((state) => state.canvasList)
  const navigate = useNavigate()
  const userRole = useUserStore((state) => state.user?.role)
  // TODO: แก้ไขเอกสาร flow
  const [documentAction, setDocumentAction] = useState(
    userRole === UserRole.TEACHER || userRole === UserRole.STUDENT
      ? DocumentAction.SEND_TO_OPERATOR
      : DocumentAction.SEND_TO_REVIEW
  )
  const [searchUserList, setSearchUserList] = useState('')
  const { data: userList } = useGetUsersByName(searchUserList)

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  useEffect(() => {
    methods.reset({ receiverId: '', message: '' })
    if (
      documentAction === DocumentAction.SEND_BACK_TO_OWNER ||
      documentAction === DocumentAction.COMPLETE ||
      documentAction === DocumentAction.REJECT
    ) {
      methods.reset({ receiverId: createdById, message: '' })
      setSearchUserList(createdByName)
    }
    if (documentAction === DocumentAction.SEND_TO_OPERATOR) {
      methods.reset({ receiverId: operatorId, message: '' })
      setSearchUserList(operatorName)
    }
    methods.trigger()
  }, [documentAction, isOpen])

  const onSubmit = async (data: ActionDocumentForm) => {
    try {
      actionDocument(
        {
          documentId,
          element: { data: getJson(canvasList) },
          action: documentAction,
          message: data.message ?? '',
          receiverId: data.receiverId ?? '',
        },
        {
          onSuccess: () => {
            toast('ดำเนินการเอกสารสำเร็จ', { type: 'success' })
            setTimeout(() => navigate('/document-management'), 2000)
          },
          onError: (error) => {
            toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, {
              type: 'error',
            })
          },
        }
      )
    } catch (error) {
      toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, { type: 'error' })
    }
  }

  console.log('ActionDocumentModal', documentAction)
  const renderActionDocumentForm = () => {
    if (
      documentAction === DocumentAction.COMPLETE ||
      documentAction === DocumentAction.REJECT
    )
      return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        {/* {documentAction === DocumentAction.SEND_TO_REVIEW && ( */}
        <Controller
          control={methods.control}
          name="receiverId"
          render={({ field: { onChange } }) => (
            <AutocompleteInput
              label="เลือกผู้รับเอกสาร"
              options={
                userList?.data?.map((user) => ({
                  label: user.nameTh,
                  value: user.id,
                })) ?? []
              }
              onChange={(e) => {
                const name = userList?.data.find((user) => user.id === e)
                  ?.nameTh
                onChange(e)
                setSearchUserList(name ?? '')
              }}
              onSearch={(e) => {
                setSearchUserList(e)
                const name = userList?.data.find((user) => user.id === e)
                  ?.nameTh
                if (!name) onChange('')
              }}
              // value={searchUserList ?? ''}
              value={searchUserList ?? ''}
            />
          )}
        />
        {/* )} */}
        {/* {(documentAction === DocumentAction.SEND_BACK_TO_OWNER ||
          documentAction === DocumentAction.SEND_TO_OPERATOR) && (
          <Controller
            control={methods.control}
            name="receiverId"
            render={() => (
              <TextInput
                label="เลือกผู้รับเอกสาร"
                placeholder={
                  documentAction === DocumentAction.SEND_BACK_TO_OWNER
                    ? createdByName
                    : operatorName
                }
                disabled
              />
            )}
          />
        )} */}
        <Controller
          control={methods.control}
          name="message"
          render={({ field }) => (
            <RichTextInput
              label="รายละเอียดเอกสาร"
              placeholder="กรอกรายละเอียด"
              {...field}
            />
          )}
        />
      </form>
    )
  }

  console.log('method', methods.formState.isValid, methods.formState)
  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title="ดำเนินการ"
      width="531px"
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
          <Button
            label="ยืนยัน"
            disabled={
              !methods.formState.isValid &&
              documentAction !== DocumentAction.COMPLETE &&
              documentAction !== DocumentAction.REJECT
            }
            onClick={() => {
              if (
                documentAction !== DocumentAction.COMPLETE &&
                documentAction !== DocumentAction.REJECT
              )
                methods.handleSubmit(onSubmit)()
              else onSubmit(methods.getValues())
            }}
          />
        </div>
      }
      content={
        <div className="flex flex-col gap-5 px-6">
          <div>
            {userRole === UserRole.STAFF && (
              <RadioGroup
                label="เลือกดำเนินการ"
                options={[
                  {
                    value: DocumentAction.SEND_TO_REVIEW,
                    label: 'ส่งต่อเอกสาร',
                  },
                  {
                    value: DocumentAction.SEND_BACK_TO_OWNER,
                    label: 'แจ้งผู้ส่งแก้ไขเอกสาร',
                  },
                  {
                    value: DocumentAction.COMPLETE,
                    label: 'ดำเนินการเสร็จสิ้น',
                  },
                  { value: DocumentAction.REJECT, label: 'ยกเลิกเอกสาร' },
                ]}
                value={documentAction}
                onChange={setDocumentAction}
              />
            )}
            {documentAction === DocumentAction.COMPLETE && (
              <p className="ml-5 flex gap-2 text-xs">
                <FaInfoCircle className="text-amber-500" size={16} />
                เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
                ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
              </p>
            )}
            {documentAction === DocumentAction.REJECT && (
              <p className="ml-5 flex gap-2 text-xs">
                <FaInfoCircle className="text-amber-500" size={12} />
                เอกสารจะถูกยกเลิก ท่านจะไม่สามารถดำเนินการเอกสารต่อได้
              </p>
            )}
          </div>
          {renderActionDocumentForm()}
        </div>
      }
    />
  )
}

export default ActionDocumentModal
