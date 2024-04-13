import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import useActionDocument from '../hooks/api/useActionDocument'
import useActionDocumentForm from '../hooks/useActionDocumentForm'
import { ActionDocumentForm } from '../hooks/useActionDocumentForm/validation'
import { DocumentAction } from '../types/types'

type PropsType = {
  isOpen: boolean
  documentId: string
  close: () => void
}

// type CreateDocument = {
//   templateId: string
//   element: any
//   documentStatus: DocumentStatus
// }

// type AssignOperator = {
//   documentId: string
//   operatorUserId: string
//   message: string
//   isEditable: boolean
// }

const ActionDocumentModal: React.FC<PropsType> = ({
  isOpen,
  documentId,
  close,
}: PropsType) => {
  const { methods } = useActionDocumentForm()
  const { mutate: actionDocument } = useActionDocument()
  const [documentAction, setDocumentAction] = useState(
    DocumentAction.SEND_TO_REVIEW
  )

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onSubmit = async (data: ActionDocumentForm) => {
    console.log('submit', methods.getValues())
    try {
      actionDocument(
        {
          documentId,
          element: {},
          action: documentAction,
          message: data.message,
          receiverId: data.receiverId,
        },
        {
          onSuccess: () => {
            toast('ดำเนินการเอกสารสำเร็จ', { type: 'success' })
            close()
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

  const renderActionDocumentForm = () => {
    if (
      documentAction === DocumentAction.COMPLETE ||
      documentAction === DocumentAction.REJECT
    )
      return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        <Controller
          control={methods.control}
          name="receiverId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="เลือกผู้รับเอกสาร"
              onChange={onChange}
              value={value}
              options={[]} // TODO: get from api
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
            // disabled={
            //   !methods.formState.isValid &&
            //   documentStatus === DocumentStatus.PROCESSING
            // }
            onClick={() => {
              methods.handleSubmit(onSubmit)()
            }}
          />
        </div>
      }
      content={
        <div className="flex flex-col gap-5 px-6">
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
