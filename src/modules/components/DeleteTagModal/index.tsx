import Button from '@/components/Button'
import Modal from '@/components/Modal'
import useDeleteTag from '@/modules/faq/hooks/api/useDeleteTag'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import { Tag } from '@/modules/faq/types'
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  tag: Tag | null
}
const DeleteTagModal: React.FC<PropsType> = ({ isOpen, onClose, tag }) => {
  const { mutate: deleteTag } = useDeleteTag()
  const { refetch: refetchTag } = useGetAllTags()

  const onDeleteTag = (tagId: string) => {
    deleteTag(tagId, {
      onSuccess: () => {
        toast('ลบหมวดหมู่สำเร็จ', { type: 'success' })
        refetchTag()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการลบหมวดหมู่ ${error}`, {
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
      title={`ลบหมวดหมู่ '${tag?.name}' หรือไม่?`}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <p className="text-gray-600">
          มีรายการ FAQ ที่กำลังใช้งานอยู่ภายใต้หมวดหมู่ดังกล่าว
          หากลบออกจะทำให้หมวดหมู่ในรายการ FAQ ที่เชื่อมถึงหายไป
        </p>
      }
      actions={
        <div className="flex gap-3">
          <Button label="ยกเลิก" variant="white" onClick={onClose} />
          <Button
            label="ลบ"
            variant="red"
            onClick={() => onDeleteTag(tag!.id)}
          />
        </div>
      }
    />
  )
}

export default DeleteTagModal
