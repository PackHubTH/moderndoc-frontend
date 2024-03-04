import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useCreateFaqForm from '@/modules/hooks/useCreateFaqForm'
import { Controller } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'

type PropsType = {
  isOpen: boolean
  onClose: () => void
}
const CreateFaqModal: React.FC<PropsType> = ({ isOpen, onClose }) => {
  const { methods } = useCreateFaqForm()

  return (
    <Modal
      title={
        <span className="mt-4 flex items-center justify-center gap-2">
          <FaPlus
            size={24}
            className="rounded-full bg-green-500 p-1 text-white"
          />
          เพิ่มรายการ FAQ
        </span>
      }
      content={
        <form className="space-y-5">
          <Controller
            control={methods.control}
            name="titleTh"
            render={({ field }) => (
              <TextInput
                label="ชื่อรายการ FAQ (ภาษาไทย)"
                placeholder="กรอกรหัสชื่อรายการ FAQ"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="documentCodeTh"
            render={({ field }) => (
              <TextInput
                label="รหัสเอกสาร (ภาษาไทย)"
                placeholder="กรอกรหัสเอกสาร"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="titleEn"
            render={({ field }) => (
              <TextInput
                label="ชื่อรายการ FAQ (ภาษาอังกฤษ)"
                placeholder="กรอกรหัสชื่อรายการ FAQ"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="documentCodeEn"
            render={({ field }) => (
              <TextInput
                label="รหัสเอกสาร (ภาษาอังกฤษ)"
                placeholder="กรอกรหัสเอกสาร"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="description"
            render={({ field }) => (
              //   <TextInput
              //     label="รายละเอียด"
              //     placeholder="กรอกรายละเอีนด"
              //     {...field}
              //   />
              <RichTextInput
                label="รายละเอียด"
                placeholder="กรอกรายละเอียด"
                {...field}
              />
            )}
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} />
          <Button label="สร้าง FAQ" onClick={onClose} />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default CreateFaqModal
