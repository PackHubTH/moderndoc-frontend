import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useCreateSubFaq from '@/modules/faq/hooks/api/useCreateSubFaq'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import useUpdateSubFaq from '@/modules/faq/hooks/api/useUpdateSubFaq'
import { SubFaq } from '@/modules/faq/types'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  faqId: string | null
  subFaq?: SubFaq | null
  type: 'CREATE' | 'UPDATE'
}
const SubFaqActionModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  faqId,
  type,
  subFaq,
}) => {
  const [title, setTitle] = useState(
    type === 'UPDATE' && subFaq ? subFaq.title : ''
  )
  const [description, setDescription] = useState(
    type === 'UPDATE' && subFaq ? subFaq.description : ''
  )

  const { mutate: createSubFaq } = useCreateSubFaq()
  const { mutate: updateSubFaq } = useUpdateSubFaq()
  const { refetch: refetchFaq } = useGetPublicFaqs()

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

  const onUpdateSubFaq = () => {
    if (!subFaq?.id) return console.error('subFaqId is required')
    updateSubFaq(
      { id: subFaq.id, title, description },
      {
        onSuccess: () => {
          toast.success('แก้ไขรายการ FAQ สำเร็จ')
          refetchFaq()
          onClose()
        },
        onError: (error) => {
          toast.error(`แก้ไขรายการ FAQ ไม่สำเร็จ ${error}`)
          onClose()
        },
      }
    )
  }

  const handleAction = () => {
    if (type === 'CREATE') {
      onCreateSubFaq()
    } else {
      onUpdateSubFaq()
    }
  }

  useEffect(() => {
    if (type === 'UPDATE' && subFaq) {
      setTitle(subFaq.title)
      setDescription(subFaq.description)
    }
  }, [subFaq, type])

  return (
    <Modal
      width="800px"
      title={
        <span className="mt-4 flex items-center justify-center gap-2">
          <FaPlus
            size={24}
            className="rounded-full bg-green-500 p-1 text-white"
          />
          {type === 'CREATE' ? 'สร้างรายการ FAQ ย่อย' : 'แก้ไขรายการ FAQ ย่อย'}
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
            label={type === 'CREATE' ? 'สร้าง' : 'แก้ไข'}
            disabled={!title || !description}
            onClick={handleAction}
          />
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
    />
  )
}

export default SubFaqActionModal
