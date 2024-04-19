import { useEffect, useState } from 'react'

import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useGetUsersByDepartmentId from '@/modules/user/hooks/api/useGetUsersByDepartmentId'
import { useUserStore } from '@/stores/userStore'
import { Controller } from 'react-hook-form'
import { UserRole } from 'types/user'
import useActionDocument from '../hooks/api/useActionDocument'
import useActionDocumentForm from '../hooks/useActionDocumentForm'
import { ActionDocumentForm } from '../hooks/useActionDocumentForm/validation'
import { DocumentAction } from '../types/types'

type PropsType = {
  createdById: string
  documentId: string
  departmentId?: string
  isOpen: boolean
  close: () => void
}

const ActionDocumentModal: React.FC<PropsType> = ({
  createdById,
  documentId,
  departmentId,
  isOpen,
  close,
}: PropsType) => {
  const { methods } = useActionDocumentForm()
  const { mutate: actionDocument } = useActionDocument()
  const { data: staffList } = useGetUsersByDepartmentId(departmentId ?? '')
  const userRole = useUserStore((state) => state.user?.role)
  const [documentAction, setDocumentAction] = useState(
    userRole === UserRole.TEACHER
      ? DocumentAction.SEND_TO_OPERATOR
      : DocumentAction.SEND_TO_REVIEW
  )
  const [searchStaffList, setSearchStaffList] = useState('')

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  useEffect(() => {
    methods.reset({ receiverId: '', message: '' })
    if (
      documentAction === DocumentAction.SEND_BACK_TO_OWNER ||
      documentAction === DocumentAction.SEND_TO_OPERATOR
    ) {
      methods.reset({ receiverId: createdById, message: '' })
    }
    methods.trigger()
  }, [documentAction])

  const onSubmit = async (data: ActionDocumentForm) => {
    console.log('submit', data)
    // try {
    //   actionDocument(
    //     {
    //       documentId,
    //       element: {},
    //       action: documentAction,
    //       message: data.message ?? '',
    //       receiverId: data.receiverId ?? '',
    //     },
    //     {
    //       onSuccess: () => {
    //         toast('ดำเนินการเอกสารสำเร็จ', { type: 'success' })
    //         close()
    //       },
    //       onError: (error) => {
    //         toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, {
    //           type: 'error',
    //         })
    //       },
    //     }
    //   )
    // } catch (error) {
    //   toast(`เกิดข้อผิดพลาดในการดำเนินการเอกสาร ${error}`, { type: 'error' })
    // }
  }

  const renderActionDocumentForm = () => {
    if (
      documentAction === DocumentAction.COMPLETE ||
      documentAction === DocumentAction.REJECT
    )
      return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        {documentAction === DocumentAction.SEND_TO_REVIEW && (
          <Controller
            control={methods.control}
            name="receiverId"
            render={({ field: { onChange } }) => (
              <AutocompleteInput
                label="เลือกผู้รับเอกสาร"
                options={
                  staffList?.data?.map((staff) => ({
                    label: staff.nameTh,
                    value: staff.id,
                  })) ?? []
                }
                onChange={(e) => {
                  onChange(e)
                  setSearchStaffList('')
                }}
                onSearch={setSearchStaffList}
                value={searchStaffList ?? ''}
              />
            )}
          />
        )}
        {(documentAction === DocumentAction.SEND_BACK_TO_OWNER ||
          documentAction === DocumentAction.SEND_TO_OPERATOR) && (
          <Controller
            control={methods.control}
            name="receiverId"
            render={() => (
              <TextInput label="เลือกผู้รับเอกสาร" value={createdById} />
            )}
          />
        )}
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
          {userRole === UserRole.STAFF && (
            <RadioGroup
              label="เลือกดำเนินการ"
              options={[
                { value: DocumentAction.SEND_TO_REVIEW, label: 'ส่งต่อเอกสาร' },
                {
                  value: DocumentAction.SEND_BACK_TO_OWNER,
                  label: 'แจ้งผู้ส่งแก้ไขเอกสาร',
                },
                { value: DocumentAction.COMPLETE, label: 'ดำเนินการเสร็จสิ้น' },
                { value: DocumentAction.REJECT, label: 'ยกเลิกเอกสาร' },
              ]}
              value={documentAction}
              onChange={setDocumentAction}
            />
          )}
          {renderActionDocumentForm()}
          {documentAction === DocumentAction.COMPLETE && (
            <p>
              เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
              ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
            </p>
          )}
          {documentAction === DocumentAction.REJECT && (
            <p>เอกสารจะถูกยกเลิก ท่านจะไม่สามารถดำเนินการเอกสารต่อได้</p>
          )}
        </div>
      }
    />
  )
}

export default ActionDocumentModal
