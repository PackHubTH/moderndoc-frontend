import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import colors from 'tailwindcss/colors'
import useCreateTemplate from '../hooks/api/useCreateTemplate'
import useCreateTemplateForm from '../hooks/useCreateTemplateForm'
import { CreateTemplateForm } from '../hooks/useCreateTemplateForm/validation'

interface TemplateInfoModalProps {
  isOpen: boolean
  close: () => void
}

const TemplateInfoModal = ({ isOpen, close }: TemplateInfoModalProps) => {
  const { methods } = useCreateTemplateForm()
  const { mutate: createTemplate, isSuccess } = useCreateTemplate()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onSubmit = (data: CreateTemplateForm) => {
    console.log('submit', data)
    createTemplate(
      {
        title: data.title,
        exampleFile: 'https://www.google.com',
        templateFile: 'https://www.google.com',
      },
      {
        onSuccess: () => {
          console.log('success')
          toast('สร้าง Template สำเร็จ', { type: 'success' })
          setTimeout(() => navigate('/template-management'), 2000)
        },
        onError: (error) => {
          console.log('error', error)
          toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
        },
      }
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title="ตั้งค่ารายละเอียดเอกสารต้นฉบับ"
      leftIcon={<FaEdit size={24} color={colors.blue[500]} />}
      width="732px"
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
          <Button
            label="สร้าง Template"
            disabled={!methods.formState.isValid || isSuccess}
            onClick={() => methods.handleSubmit(onSubmit)()}
          />
        </div>
      }
      content={
        <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
          <Controller
            control={methods.control}
            name="title"
            render={({ field }) => (
              <TextInput
                label="ชื่อเอกสาร"
                placeholder="กรอกชื่อเอกสาร"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="receiverGroup"
            render={({ field }) => (
              <TextInput
                label="กำหนดกลุ่มผู้ดำเนินการเอกสาร"
                placeholder="เลือกกลุ่มผู้ดำเนินการ"
                {...field}
              />
            )}
          />
          {/* <Controller
            control={methods.control}
            name="receiver"
            render={({ field }) => (
              <TextInput
                label="กำหนดรายชื่อผู้รับผิดชอบดำเนินการเอกสาร (ถ้ามี)"
                placeholder="เลือกรายชื่อ"
                {...field}
              />
            )}
          /> */}
          <Controller
            control={methods.control}
            name="description"
            render={({ field }) => (
              <RichTextInput
                label="รายละเอียดเอกสาร"
                placeholder="กรอกรายละเอียด"
                {...field}
              />
            )}
          />
        </form>
      }
    />
  )
}

export default TemplateInfoModal
