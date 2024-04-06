import Button from '@/components/Button'
import JsonTextInput from '@/components/JsonTextInput'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import TagsSelect from '@/modules/faq/components/TagsSelect'
import useCreateFaq from '@/modules/faq/hooks/api/useCreateFaq'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import useCreateFaqForm from '@/modules/faq/hooks/useCreateFaqForm'
import { CreateFaqForm } from '@/modules/faq/hooks/useCreateFaqForm/validation'
import { SendChannel } from '@/modules/faq/types'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'

type PropsType = {
  isOpen: boolean
  onClose: () => void
}
const CreateFaqModal: React.FC<PropsType> = ({ isOpen, onClose }) => {
  const { methods } = useCreateFaqForm()

  const { data: tags } = useGetAllTags()

  const { mutate: createFaq } = useCreateFaq()

  const onSubmit = (data: CreateFaqForm) => {
    createFaq(data, {
      onSuccess: () => {
        toast('สร้าง FAQ สำเร็จ', { type: 'success' })
        onClose()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการสร้าง FAQ ${error}`, { type: 'error' })
      },
    })
  }

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  return (
    <Modal
      width="800px"
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
        <form className="max-h-[400px] space-y-5 overflow-y-auto p-1">
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
              <RichTextInput
                label="รายละเอียด"
                placeholder="กรอกรายละเอียด"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="sendChannel"
            render={({ field }) => (
              <div>
                <RadioGroup
                  label="แนวทางการส่งเอกสาร"
                  options={[
                    {
                      label: 'สามารถส่งเอกสารภายในระบบได้ (Online)',
                      value: SendChannel.ONLINE,
                    },
                    {
                      label: 'ไม่สามารถส่งเอกสารภายในระบบได้ (Onsite)',
                      value: SendChannel.ONSITE,
                    },
                    {
                      label: 'สามารถส่งได้ทั้ง 2 รูปแบบ',
                      value: SendChannel.BOTH,
                    },
                    { label: 'อื่นๆ', value: SendChannel.OTHER },
                  ]}
                  {...field}
                />
                <Controller
                  control={methods.control}
                  name="sendChannelInfo"
                  render={({ field }) => (
                    <TextInput
                      placeholder="กรอกอีเมล/ชื่อ หรือแนวทางการส่งเอกสาร"
                      {...field}
                    />
                  )}
                />
              </div>
            )}
          />
          <Controller
            control={methods.control}
            name="extraContact"
            render={({ field }) => (
              <JsonTextInput
                label="ช่องทางการติดต่อเพิ่มเติม (ถ้ามี)"
                fields={[
                  'ที่ตั้ง',
                  'วันเวลาทำการ',
                  'เบอร์โทรศัพท์',
                  'เว็ปไซต์ (Link URL)',
                  'เพจ Facebook',
                  'Line ID',
                  'อื่นๆ',
                ]}
                {...field}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="tagIds"
            render={({ field }) => (
              <TagsSelect
                label="เพิ่ม Tag ของหมวดหมู่และหน่วยงานที่เกี่ยวข้อง"
                tagsList={tags?.data ?? []}
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="isInternal"
            render={({ field }) => (
              <RadioGroup
                label="ระดับการแชร์"
                options={[
                  {
                    label: 'สาธารณะ',
                    value: false,
                  },
                  {
                    label: 'เฉพาะภายในสังกัด/หน่วยงานของตนเอง',
                    value: true,
                  },
                ]}
                onChange={(value: boolean) => {
                  field.onChange(value)
                }}
                value={field.value}
              />
            )}
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label="สร้าง FAQ"
            disabled={!methods.formState.isValid}
            onClick={() => methods.handleSubmit(onSubmit)()}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default CreateFaqModal
