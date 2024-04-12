import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { Faq } from '@/modules/faq/types'
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import useDeleteFaq from '../../hooks/api/useDeleteFaq'
import useGetDepartmentFaqs from '../../hooks/api/useGetDepartmentFaqs'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  faq: Faq | null
}
const DeleteFaqModal: React.FC<PropsType> = ({ isOpen, onClose, faq }) => {
  const { mutate: deleteFaq } = useDeleteFaq()
  const { refetch } = useGetDepartmentFaqs(1)

  const onDeleteFaq = (faqId: string) => {
    deleteFaq(faqId, {
      onSuccess: () => {
        toast('ลบรายการ FAQ สำเร็จ', { type: 'success' })
        refetch()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการลบ FAQ ${error}`, {
          type: 'error',
        })
      },
    })
    onClose()
  }
  return (
    <Modal
      leftIcon={
        <HiTrash
          size={25}
          className="rounded-full bg-red-200 p-0.5 text-red-500"
        />
      }
      title={`ลบรายการ '${faq?.titleTh}' หรือไม่?`}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <p className="text-gray-600">
          หากลบออกจะทำให้หมวดหมู่ในรายการ FAQ ที่เชื่อมถึงหายไป
        </p>
      }
      actions={
        <div className="flex gap-3">
          <Button label="ยกเลิก" variant="white" onClick={onClose} />
          <Button
            label="ลบ"
            variant="red"
            onClick={() => onDeleteFaq(faq!.id)}
          />
        </div>
      }
    />
  )
}

export default DeleteFaqModal
