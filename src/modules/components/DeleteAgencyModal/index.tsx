import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { Department } from '@/modules/user/hooks/types'
import { HiTrash } from 'react-icons/hi'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  agency: Department | null
}
const DeleteAgencyModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  agency,
}) => {
  return (
    <Modal
      leftIcon={
        <HiTrash
          size={25}
          className="rounded-full bg-red-200 p-0.5 text-red-500"
        />
      }
      title={`ลบหน่วยงาน '${agency?.name}' หรือไม่?`}
      isOpen={isOpen}
      onClose={onClose}
      content={
        <p className="text-gray-600">
          มีรายการ FAQ ที่กำลังใช้งานอยู่ภายใต้หน่วยงานดังกล่าว
          หากลบออกจะทำให้หน่วยงานในรายการ FAQ ที่เชื่อมถึงหายไป
        </p>
      }
      actions={
        <div className="flex gap-3">
          <Button label="ยกเลิก" variant="white" onClick={onClose} />
          <Button
            label="ลบ"
            variant="red"
            onClick={() => console.log('delete agency')}
            disabled
          />
        </div>
      }
    />
  )
}

export default DeleteAgencyModal
