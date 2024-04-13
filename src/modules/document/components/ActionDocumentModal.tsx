import { useEffect, useState } from 'react'
import { DocumentAction, DocumentStatus } from '../types/types'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import useAssignOperator from '../hooks/api/useAssignOperator'
import useCreateDocument from '../hooks/api/useCreateDocument'
import useCreateDocumentForm from '../hooks/useCreateDocumentForm'

type PropsType = {
  isOpen: boolean
  documentId: string
  close: () => void
}

type CreateDocument = {
  templateId: string
  element: any
  documentStatus: DocumentStatus
}

type AssignOperator = {
  documentId: string
  operatorUserId: string
  message: string
  isEditable: boolean
}

const ActionDocumentModal: React.FC<PropsType> = ({
  isOpen,
  documentId,
  close,
}: PropsType) => {
  const { methods } = useCreateDocumentForm()
  const { mutate: createDocument } = useCreateDocument()
  const { mutate: assignOperator } = useAssignOperator()
  const [documentAction, setDocumentAction] = useState(
    DocumentAction.SEND_TO_REVIEW
  )

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onSubmit = async () => {
    console.log('submit', methods.getValues())
    // try {
    //   createDocument(
    //     {
    //       templateId,
    //       element: {},
    //       documentStatus,
    //     },
    //     {
    //       onSuccess: () => {
    //         toast('สร้างเอกสารสำเร็จ', { type: 'success' })
    //         close()
    //       },
    //       onError: (error) => {
    //         toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
    //           type: 'error',
    //         })
    //       },
    //     }
    //   )
    // } catch (error) {
    //   toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
    // }
  }

  // const renderCreateDocumentForm = () => {
  //   if (documentStatus !== DocumentStatus.PROCESSING) return null
  //   return (
  //     <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
  //       <Controller
  //         control={methods.control}
  //         name="operatorUserId"
  //         render={({ field: { value, onChange } }) => (
  //           <Select
  //             label="เลือกผู้ลงนามหรือผู้ดำเนินการต่อ"
  //             onChange={onChange}
  //             value={value}
  //             options={[]} // TODO: get from api
  //           />
  //         )}
  //       />
  //       <Controller
  //         control={methods.control}
  //         name="message"
  //         render={({ field }) => (
  //           <RichTextInput
  //             label="รายละเอียดเอกสาร"
  //             placeholder="กรอกรายละเอียด"
  //             {...field}
  //           />
  //         )}
  //       />
  //       <Controller
  //         control={methods.control}
  //         name="isEditable"
  //         render={({ field: { value, onChange } }) => (
  //           <label className="mb-2.5 mt-4 flex items-center gap-2">
  //             <input
  //               className="rounded-sm accent-blue-500"
  //               type="checkbox"
  //               checked={value}
  //               onChange={onChange}
  //             />
  //             <span className="text-sm">
  //               อนุญาตให้ผู้รับเอกสารแก้ไขเอกสารแทนตนเองได้
  //             </span>
  //           </label>
  //         )}
  //       />
  //     </form>
  //   )
  // }

  // console.log('metgods', methods, methods.formState.isValid, documentStatus)
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
          {/* {renderCreateDocumentForm()} */}
          {/* {documentStatus === DocumentStatus.COMPLETED && (
            <p>
              เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
              ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
            </p>
          )} */}
        </div>
      }
    />
  )
}

export default ActionDocumentModal
