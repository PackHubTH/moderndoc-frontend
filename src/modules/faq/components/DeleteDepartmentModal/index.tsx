import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { Department } from '@/modules/user/hooks/types'
import { HiTrash } from 'react-icons/hi'
import { toast } from 'react-toastify'
import useDeleteDepartment from '../../hooks/api/useDeleteDepartment'
import useGetDepartmentFaqs from '../../hooks/api/useGetDepartmentFaqs'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  department: Department | null
  callback?: () => void
}
const DeleteDepartmentModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  department,
  callback,
}) => {
  const { mutate: deletedDepartment } = useDeleteDepartment()
  const { refetch } = useGetDepartmentFaqs(1)

  const onDeleteDepartment = (departmentId: string) => {
    deletedDepartment(departmentId, {
      onSuccess: () => {
        toast('ลบรายการ FAQ สำเร็จ', { type: 'success' })
        refetch()
        if (callback) {
          callback()
        }
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
      title={`ลบหน่วยงาน '${department?.name}' หรือไม่?`}
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
            onClick={() => onDeleteDepartment(department!.id)}
          />
        </div>
      }
    />
  )
}

export default DeleteDepartmentModal
