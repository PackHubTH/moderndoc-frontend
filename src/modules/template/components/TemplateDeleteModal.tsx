import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { HiTrash } from 'react-icons/hi'
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
          <Button label="ยกเลิก" variant="outline-gray" onClick={close} />
          <Button
            label="ลบ"
            variant="red"
            onClick={() => {
              deleteTemplate(templateId)
              close()
              window.location.reload()
            }}
            disabled={isSuccess}
          />
        </div>
      }
      isOpen={isOpen}
      leftIcon={<HiTrash size={25} className="text-red-500" />}
      title="ลบเทมเพลตหรือไม่?"
      variant="confirm"
      width="763px"
      onClose={close}
      content={<p>หากคุณลบเทมเพลตเอกสารแล้วจะไม่สามารถกู้คืนกลับมาได้</p>}
    />
  )
}

export default TemplateDeleteModal
