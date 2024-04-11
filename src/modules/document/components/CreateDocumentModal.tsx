import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import { Controller } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAssignOperator from '../hooks/api/useAssignOperator'
import useCreateDocument from '../hooks/api/useCreateDocument'
import useCreateDocumentForm from '../hooks/useCreateDocumentForm'
import { CreateDocumentForm } from '../hooks/useCreateDocumentForm/validation'
import { DocumentStatus } from '../types/types'

type PropsType = {
  isOpen: boolean
  templateId: string
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

const CreateDocumentModal: React.FC<PropsType> = ({
  isOpen,
  templateId,
  close,
}: PropsType) => {
  const { methods } = useCreateDocumentForm()
  const { mutate: createDocument } = useCreateDocument()
  const { mutate: assignOperator } = useAssignOperator()
  const [documentStatus, setDocumentStatus] = useState(
    DocumentStatus.PROCESSING
  )

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onProcessSubmit = async (data: CreateDocumentForm) => {
    console.log('submit', data)
    try {
      createDocument(
        {
          templateId,
          element: {},
          documentStatus,
        },
        {
          onSuccess: (res) => {
            assignOperator(
              {
                documentId: res.data.id,
                operatorUserId: data.operatorUserId,
                message: data.message,
                isEditable: data.isEditable,
              },
              {
                onSuccess: () => {
                  toast('สร้างเอกสารสำเร็จ', { type: 'success' })
                },
                onError: (error) => {
                  toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
                    type: 'error',
                  })
                },
              }
            )
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
      createDocument(
        {
          templateId,
          element: {},
          documentStatus,
        },
        {
          onSuccess: () => {
            toast('สร้างเอกสารสำเร็จ', { type: 'success' })
            close()
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
        <Controller
          control={methods.control}
          name="isEditable"
          render={({ field: { value, onChange } }) => (
            <label className="mb-2.5 mt-4 flex items-center gap-2">
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
          )}
        />
      </form>
    )
  }

  console.log('metgods', methods, methods.formState.isValid, documentStatus)
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
              documentStatus === DocumentStatus.PROCESSING
            }
            onClick={() => {
              if (documentStatus === DocumentStatus.PROCESSING)
                methods.handleSubmit(onProcessSubmit)()
              else onNonProcessSubmit()
            }}
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
