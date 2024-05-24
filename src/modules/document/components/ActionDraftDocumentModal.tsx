import { useEffect, useMemo, useState } from 'react'

import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import { Operator } from '@/modules/template/types/response'
import useGetUsersByName from '@/modules/user/hooks/api/useGetUsersByName'
import { useUserStore } from '@/stores/userStore'
import { Controller } from 'react-hook-form'
import { FaInfoCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useActionDocument from '../hooks/api/useActionDocument'
import useAssignOperator from '../hooks/api/useAssignOperator'
import useCreateDocumentForm from '../hooks/useCreateDocumentForm'
import { CreateDocumentForm } from '../hooks/useCreateDocumentForm/validation'
import { useDocumentStore } from '../stores/documentStore'
import { DocumentAction } from '../types/types'
import { getJson } from '../utils/documentEditorUtils'

type PropsType = {
  isOpen: boolean
  documentId: string
  suggestOperators: Operator[]
  close: () => void
}

const ActionDraftDocumentModal = ({
  isOpen,
  documentId,
  suggestOperators,
  close,
}: PropsType) => {
  const { mutate: actionDocument } = useActionDocument()
  const { mutate: assignOperator } = useAssignOperator()
  const { methods } = useCreateDocumentForm()
  const canvasList = useDocumentStore((state) => state.canvasList)
  const navigate = useNavigate()
  const [documentAction, setDocumentAction] = useState(
    DocumentAction.SEND_TO_OPERATOR
  )
  const [searchOperator, setSearchOperator] = useState('')
  const { data: userList } = useGetUsersByName(searchOperator)
  const userId = useUserStore((state) => state.user?.id)

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
      setSearchOperator('')
    }
  }, [isOpen])

  const operators = useMemo(() => {
    if (!userList) return suggestOperators
    const filterStaffList = userList.data
      .filter(
        (user) => !suggestOperators.some((operator) => operator.id === user.id)
      )
      .map((user) => ({
        id: user.id,
        nameTh: user.nameTh,
      }))
    return [...suggestOperators, ...filterStaffList]
  }, [userList, suggestOperators])

  const onProcessSubmit = async (data: CreateDocumentForm) => {
    try {
      assignOperator(
        {
          documentId,
          operatorUserId: data.operatorUserId,
          message: data.message,
          isEditable: data.isEditable,
        },
        {
          onSuccess: () => {
            toast('สร้างเอกสารสำเร็จ', { type: 'success' })
            setTimeout(() => navigate('/document-management'), 2000)
          },
          onError: (error) => {
            toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
              type: 'error',
            })
          },
        }
      )
    } catch (error) {
      toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
    }
  }

  const onNonProcessSubmit = async () => {
    try {
      actionDocument(
        {
          documentId,
          element: { data: getJson(canvasList) },
          action: DocumentAction.COMPLETE,
          message: '',
          receiverId: userId,
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

  const renderActionDraftDocumentForm = () => {
    if (documentAction !== DocumentAction.SEND_TO_OPERATOR) return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        <Controller
          control={methods.control}
          name="operatorUserId"
          render={({ field: { onChange } }) => (
            <AutocompleteInput
              label="เลือกผู้รับเอกสาร"
              placeholder="เลือกหรือค้นหารายชื่อ"
              onChange={(e) => {
                const name = operators.find((operator) => operator.id === e)
                  ?.nameTh
                onChange(e)
                setSearchOperator(name ?? '')
              }}
              onSearch={(e) => {
                setSearchOperator(e)
                const name = operators.find((operator) => operator.id === e)
                  ?.nameTh
                if (!name) onChange('')
              }}
              value={searchOperator}
              options={
                operators?.map((operator) => ({
                  label: operator.nameTh,
                  value: operator.id,
                })) ?? []
              }
            />
          )}
        />
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
        <Controller
          control={methods.control}
          name="isEditable"
          render={({ field: { value, onChange } }) => (
            <div>
              <p className="block text-sm font-medium text-gray-800">
                สิทธิ์การแก้ไข
              </p>
              <label className="mt-2 flex items-center gap-2">
                <input
                  className="rounded-sm accent-blue-500"
                  type="checkbox"
                  checked={value}
                  onChange={onChange}
                />
                <span className="text-sm">
                  อนุญาตให้ผู้รับเอกสารแก้ไขเอกสารแทนตนเองได้
                </span>
              </label>
            </div>
          )}
        />
      </form>
    )
  }

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
              documentAction === DocumentAction.SEND_TO_OPERATOR
            }
            onClick={() => {
              if (documentAction === DocumentAction.SEND_TO_OPERATOR)
                methods.handleSubmit(onProcessSubmit)()
              else onNonProcessSubmit()
            }}
          />
        </div>
      }
      content={
        <div className="flex flex-col gap-5 px-6">
          <div>
            <RadioGroup
              label="เลือกดำเนินการ"
              options={[
                { value: DocumentAction.SEND_TO_OPERATOR, label: 'ส่งเอกสาร' },
                { value: DocumentAction.COMPLETE, label: 'เสร็จสิ้นทันที' },
              ]}
              value={documentAction}
              onChange={setDocumentAction}
            />
            {documentAction === DocumentAction.COMPLETE && (
              <p className="ml-5 flex gap-2 text-xs">
                <FaInfoCircle className="text-amber-500" size={16} />
                เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
                ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
              </p>
            )}
          </div>
          {renderActionDraftDocumentForm()}
        </div>
      }
    />
  )
}

export default ActionDraftDocumentModal
