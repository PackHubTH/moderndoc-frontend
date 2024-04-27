import Button from '@/components/Button'
import Modal from '@/components/Modal'
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
          <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
          <Button
            label="คัดลอก"
            onClick={() => {
              copyTemplate(templateId)
              // close()
            }}
            disabled={isSuccess}
          />
        </div>
      }
      isOpen={isOpen}
      title="คัดลอกเทมเพลต"
      width="763px"
      onClose={close}
      content={<p>ต้องการคัดลอกเทมเพลต '{templateTitle}' หรือไม่</p>}
    />
  )
}

export default TemplateCopyModal
