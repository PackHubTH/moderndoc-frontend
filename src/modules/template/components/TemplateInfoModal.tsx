import { FaCirclePlus } from 'react-icons/fa6'
import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import colors from 'tailwindcss/colors'

interface TemplateInfoModalProps {
  isOpen: boolean
  close: () => void
}

const TemplateInfoModal = ({ isOpen, close }: TemplateInfoModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title="รายละเอียดเอกสาร"
      leftIcon={<FaCirclePlus color={colors.green[500]} size={24} />}
      content={
        <div>
          <p className="text-gray-600">
            ข้อมูล Template ที่ใช้ในการสร้างเอกสาร
          </p>
          <TextInput type="" />
        </div>
      }
    />
  )
}

export default TemplateInfoModal
