import Button from '@/components/Button'
import Modal from '@/components/Modal'
import useDeleteSubFaq from '@/modules/faq/hooks/api/useDeleteSubFaq'
import useGetPublicFaqs from '@/modules/faq/hooks/api/useGetPublicFaqs'
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  subFaqId: string | null
}
const DeleteSubFaqModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  subFaqId,
}) => {
  const { mutate: deleteSubFaq } = useDeleteSubFaq()
  const { refetch: refetchFaqs } = useGetPublicFaqs(1)

  const onDeleteSubFaq = () => {
    if (!subFaqId) return console.error('subFaqId is required')
    deleteSubFaq(subFaqId, {
      onSuccess: () => {
        toast('ลบรายการ FAQ ย่อยสำเร็จ', { type: 'success' })
        refetchFaqs()
      },
      onError: (error) => {
        toast(`ลบรายการ FAQ ย่อยไม่สำเร็จ ${error}`, {
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
      title="ยืนยันการลบรายการ"
      isOpen={isOpen}
      onClose={onClose}
      content={
        <p className="text-gray-600">
          คุณกำลังลบรายการ FAQ ย่อย ยืนยันการลบหรือไม่?
        </p>
      }
      actions={
        <div className="flex gap-3">
          <Button label="ยกเลิก" variant="white" onClick={onClose} />
          <Button label="ลบ" variant="red" onClick={() => onDeleteSubFaq()} />
        </div>
      }
    />
  )
}

export default DeleteSubFaqModal
