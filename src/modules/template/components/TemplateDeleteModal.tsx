import Button from '@/components/Button'
import Modal from '@/components/Modal'
import useDeleteTemplate from '../hooks/api/useDeleteTemplate'

interface TemplateDeleteModalProps {
  isOpen: boolean
  templateId: string
  close: () => void
}

const TemplateDeleteModal = ({
  isOpen,
  templateId,
  close,
}: TemplateDeleteModalProps) => {
  const { mutate: deleteTemplate, isSuccess } = useDeleteTemplate()

  return (
    <Modal
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
          <Button
            label="ลบ"
            onClick={() => {
              deleteTemplate(templateId)
              // close()
            }}
            disabled={isSuccess}
          />
        </div>
      }
      isOpen={isOpen}
      title="ลบเทมเพลตหรือไม่?"
      width="763px"
      onClose={close}
      content={<p>หากคุณลบเทมเพลตเอกสารแล้วจะไม่สามารถกู้คืนกลับมาได้</p>}
    />
  )
}

export default TemplateDeleteModal
