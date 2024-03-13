import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useCreateSubFaq from '@/modules/faq/hooks/api/useCreateSubFaq'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  faqId: string | null
}
const CreateSubFaqModal: React.FC<PropsType> = ({ isOpen, onClose, faqId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const { mutate: createSubFaq } = useCreateSubFaq()
  const { refetch: refetchFaq } = useGetPublicFaqs(1)

  const onCreateSubFaq = () => {
    if (!faqId) return console.error('faqId is required')
    createSubFaq(
      { title, description, faqId },
      {
        onSuccess: () => {
          toast.success('สร้างรายการ FAQ สำเร็จ')
          refetchFaq()
          onClose()
        },
        onError: (error) => {
          toast.error(`สร้างรายการ FAQ ไม่สำเร็จ ${error}`)
          onClose()
        },
      }
    )
  }

  return (
    <Modal
      width="800px"
      title={
        <span className="mt-4 flex items-center justify-center gap-2">
          <FaPlus
            size={24}
            className="rounded-full bg-green-500 p-1 text-white"
          />
          เพิ่มรายการ FAQ
        </span>
      }
      content={
        <form className="max-h-[400px] space-y-5 overflow-y-auto p-1">
          <TextInput
            label="ชื่อรายการ FAQ (ภาษาไทย)"
            placeholder="กรอกรหัสชื่อรายการ FAQ"
            value={title}
            onChange={(val) => setTitle(val)}
          />
          <RichTextInput
            label="รายละเอียด"
            placeholder="กรอกรายละเอียด"
            value={description}
            onChange={(val) => setDescription(val)}
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label="สร้าง FAQ"
            disabled={!title || !description}
            onClick={onCreateSubFaq}
          />
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}

export default CreateSubFaqModal
