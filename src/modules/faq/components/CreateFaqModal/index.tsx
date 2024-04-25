import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import JsonTextInput from '@/components/JsonTextInput'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useGetAllDepartments from '@/modules/department/hooks/api/useGetAllDepartments'
import TagsSelect from '@/modules/faq/components/TagsSelect'
import useCreateFaq from '@/modules/faq/hooks/api/useCreateFaq'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import useCreateFaqForm from '@/modules/faq/hooks/useCreateFaqForm'
import { CreateFaqForm } from '@/modules/faq/hooks/useCreateFaqForm/validation'
import { Faq, SendChannel } from '@/modules/faq/types'
import useGetAllTemplate from '@/modules/template/hooks/api/useGetAllTemplate'
import useGetDepartmentById from '@/modules/user/hooks/api/useGetDepartmentById'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import useGetDepartmentFaqs from '../../hooks/api/useGetDepartmentFaqs'
import useUpdateFaq from '../../hooks/api/useUpdateFaq'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  mode?: 'create' | 'edit'
  faq?: Faq
}
const CreateFaqModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  mode = 'create',
  faq,
}) => {
  const { methods } = useCreateFaqForm()
  const [departmentSearch, setDepartmentSearch] = useState('')

  const [searchTemplate, setSearchTemplate] = useState<string>('')

  const { data: userData } = useGetUser()
  const { data: templates } = useGetAllTemplate(1, searchTemplate)
  const { data: tags } = useGetAllTags()
  const { data: departments } = useGetAllDepartments(1, departmentSearch)
  const { data: departmentData, refetch: refetchDepartmentData } =
    useGetDepartmentById(methods.watch('departmentId') ?? '')
  const { refetch } = useGetDepartmentFaqs(1)

  const { mutate: createFaq } = useCreateFaq()
  const { mutate: updateFaq } = useUpdateFaq(faq?.id)

  const onSubmit = (data: CreateFaqForm) => {
    const templateId = templates?.data.data.find(
      (template) => template.title === data.templateId
    )?.id
    const actionFunction = mode === 'create' ? createFaq : updateFaq

    actionFunction(
      { ...data, templateId: templateId ?? null },
      {
        onSuccess: () => {
          toast(mode === 'edit' ? 'แก้ไข FAQ สำเร็จ' : 'สร้าง FAQ สำเร็จ', {
            type: 'success',
          })
          onClose()
          refetch()
        },
        onError: (error) => {
          toast(
            `เกิดข้อผิดพลาดในการ${
              mode === 'edit' ? 'แก้ไข' : 'สร้าง'
            } FAQ ${error}`,
            { type: 'error' }
          )
        },
      }
    )
  }

  useEffect(() => {
    if (mode === 'edit' && faq) {
      methods.reset({
        ...faq,
        fileUrl: faq.files ?? [],
        tagIds: faq.faqTags.map((tag) => tag.tagId),
        templateId: faq.template?.title ?? null,
      })
      methods.trigger()
    }
  }, [faq, mode])

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  useEffect(() => {
    if (methods.watch('departmentId')) {
      refetchDepartmentData()
    }
  }, [methods.watch('departmentId')])

  useEffect(() => {
    if (userData?.data.role === UserRole.ADMIN) {
      methods.setValue('departmentId', '')
    }
  }, [userData])

  useEffect(() => {
    if (departmentData) {
      setDepartmentSearch(departmentData.data.name)
    }
  }, [departmentData])

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
          <div className="flex items-end gap-1">
            <Controller
              control={methods.control}
              name="titleTh"
              render={({ field }) => (
                <TextInput
                  label="ชื่อรายการ FAQ (ภาษาไทย)"
                  placeholder="กรอกรหัสชื่อรายการ FAQ"
                  className="flex-grow"
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="documentCodeTh"
              render={({ field }) => (
                <TextInput
                  placeholder="รหัสเอกสาร (ภาษาไทย)"
                  className="w-48"
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex items-end gap-1">
            <Controller
              control={methods.control}
              name="titleEn"
              render={({ field }) => (
                <TextInput
                  label="ชื่อรายการ FAQ (ภาษาอังกฤษ)"
                  placeholder="กรอกรหัสชื่อรายการ FAQ"
                  className="flex-grow"
                  {...field}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="documentCodeEn"
              render={({ field }) => (
                <TextInput
                  placeholder="รหัสเอกสาร (ภาษาอังกฤษ)"
                  className="w-48"
                  {...field}
                />
              )}
            />
          </div>

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
            name="templateId"
            render={({ field }) => (
              <AutocompleteInput
                label="เลือก Template"
                options={
                  templates?.data.data.map((template) => ({
                    label: template.title,
                    value: template.title,
                  })) ?? []
                }
                onSearch={setSearchTemplate}
                onChange={(value) => {
                  field.onChange(value)
                  setSearchTemplate('')
                }}
                value={searchTemplate ?? ''}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="tagIds"
            render={({ field }) => (
              <TagsSelect
                label="กำหนดให้อยู่ในหมวดหมู่เอกสารใด"
                tagsList={tags?.data ?? []}
                value={field.value ?? []}
                onChange={field.onChange}
              />
            )}
          />
          {userData?.data.role === UserRole.ADMIN && (
            <Controller
              control={methods.control}
              name="departmentId"
              render={({ field }) => (
                <AutocompleteInput
                  onSearch={setDepartmentSearch}
                  onChange={(value) => {
                    setDepartmentSearch(
                      departments?.data.data.find((d) => d.id === value)
                        ?.name ?? ''
                    )
                    field.onChange(value)
                  }}
                  value={departmentSearch}
                  label="กำหนดให้อยู่ในหมวดหมู่ของหน่วยงานใด"
                  options={
                    departments?.data.data.map((department) => ({
                      label: department.name,
                      value: department.id,
                    })) ?? []
                  }
                />
              )}
            />
          )}
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
            label={mode === 'edit' ? 'แก้ไข FAQ' : 'สร้าง FAQ'}
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
