import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import { Controller } from 'react-hook-form'
import useCreateDocument from '../hooks/api/useCreateDocument'
import useCreateDocumentForm from '../hooks/useCreateDocumentForm'
import { DocumentStatus } from '../types/types'

type PropsType = {
  isOpen: boolean
  templateFile: File | null
  close: () => void
}

type CreateDocument = {
  templateId: string
  element: any
  documentStatus: DocumentStatus
}

const CreateDocumentModal: React.FC<PropsType> = ({
  isOpen,
  templateFile,
  close,
}: PropsType) => {
  const { methods } = useCreateDocumentForm()
  const { mutate: createDocument, isSuccess } = useCreateDocument()
  const [documentStatus, setDocumentStatus] = useState(
    DocumentStatus.PROCESSING
  )

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onSubmit = async (data: CreateDocument) => {
    const response = await createDocument(
      {
        ...data,
      },
      {
        onSuccess: () => {
          console.log('success')
        },
        onError: (error) => {
          console.log('error')
        },
      }
    )
  }

  const renderCreateDocumentForm = () => {
    if (documentStatus !== DocumentStatus.PROCESSING) return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        <Controller
          control={methods.control}
          name="operatorUserId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="เลือกผู้ลงนามหรือผู้ดำเนินการต่อ"
              onChange={onChange}
              value={value}
              options={[]} // get from api
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
            label="สร้าง Template"
            disabled={!methods.formState.isValid || isSuccess}
            // onClick={() => methods.handleSubmit(onSubmit)()}
          />
        </div>
      }
      content={
        <div className="flex flex-col gap-5 px-6">
          <RadioGroup
            label="เลือกดำเนินการ"
            options={[
              { value: DocumentStatus.PROCESSING, label: 'ส่งเอกสาร' },
              {
                value: DocumentStatus.DRAFT,
                label: 'บันทึกฉบับร่าง',
              },
              { value: DocumentStatus.COMPLETED, label: 'เสร็จสิ้นทันที' },
            ]}
            value={documentStatus}
            onChange={setDocumentStatus}
          />
          {renderCreateDocumentForm()}
          {documentStatus === DocumentStatus.COMPLETED && (
            <p>
              เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
              ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
            </p>
          )}
        </div>
      }
    />
  )
}

export default CreateDocumentModal
