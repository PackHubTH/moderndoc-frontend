import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { FaCopy } from 'react-icons/fa6'
import useCopyTemplate from '../hooks/api/useCopyTemplate'

interface TemplateCopyModalProps {
  isOpen: boolean
  templateId: string
  templateTitle: string
  close: () => void
}

const TemplateCopyModal = ({
  isOpen,
  templateId,
  templateTitle,
  close,
}: TemplateCopyModalProps) => {
  const { mutate: copyTemplate, isSuccess } = useCopyTemplate()

  return (
    <Modal
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-gray" onClick={close} />
          <Button
            label="คัดลอก"
            onClick={() => {
              copyTemplate(templateId)
              window.location.reload()
              close()
            }}
            disabled={isSuccess}
          />
        </div>
      }
      isOpen={isOpen}
      leftIcon={<FaCopy size={25} className="text-blue-500" />}
      title="คัดลอกเทมเพลต"
      variant="confirm"
      width="763px"
      onClose={close}
      content={<p>ต้องการคัดลอกเทมเพลต '{templateTitle}' หรือไม่</p>}
    />
  )
}

export default TemplateCopyModal
