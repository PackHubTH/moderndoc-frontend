import { useEffect, useMemo } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import useUploadFile from '@/hooks/useUploadFile'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import { Controller } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import colors from 'tailwindcss/colors'
import useCreateTemplate from '../hooks/api/useCreateTemplate'
import useGetUsersByDepartmentId from '../hooks/api/useGetUsersByDepartmentId'
import useCreateTemplateForm from '../hooks/useCreateTemplateForm'
import { CreateTemplateForm } from '../hooks/useCreateTemplateForm/validation'

interface TemplateInfoModalProps {
  isOpen: boolean
  templateFile: File | null
  close: () => void
}

const TemplateInfoModal = ({
  isOpen,
  templateFile,
  close,
}: TemplateInfoModalProps) => {
  const { methods } = useCreateTemplateForm()
  const { mutate: createTemplate, isSuccess } = useCreateTemplate()
  const { data: rawDepartments } = useGetDepartments()
  const { data: users } = useGetUsersByDepartmentId(
    methods.getValues('operatorGroup') ?? ''
  )
  const { mutateAsync: uploadFile } = useUploadFile()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    }
  }, [isOpen])

  const onSubmit = async (data: CreateTemplateForm) => {
    console.log('submit', data)
    try {
      let uploadTemplateRes = null
      let uploadExampleRes = null
      if (templateFile)
        uploadTemplateRes = uploadFile({
          file: templateFile,
          folder: 'template',
        })
      if (data.exampleFile)
        uploadExampleRes = uploadFile({
          file: data.exampleFile,
          folder: 'template',
        })
      const response = await Promise.all([uploadTemplateRes, uploadExampleRes])

      if (response[0]?.data?.fileUrl)
        createTemplate(
          {
            title: data.title,
            description: data.description,
            exampleFile: response[1]?.data?.fileUrl ?? undefined,
            templateFile: response[0]?.data?.fileUrl,
          },
          {
            onSuccess: () => {
              toast('สร้าง Template สำเร็จ', { type: 'success' })
              setTimeout(() => navigate('/template-management'), 2000)
            },
            onError: (error) => {
              toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, {
                type: 'error',
              })
            },
          }
        )
      else {
        toast('เกิดข้อผิดพลาดในการอัพโหลดไฟล์', { type: 'error' })
      }
    } catch (error) {
      toast(`เกิดข้อผิดพลาดในการสร้าง Template ${error}`, { type: 'error' })
    }
  }

  const departments = useMemo(() => {
    if (rawDepartments) {
      return [
        { id: '', name: 'เจ้าหน้าที่ประจำภาควิชา' },
        ...rawDepartments?.data,
      ]
    }
  }, [rawDepartments])

  console.log('departments', departments)
  console.log('users', users)
  console.log('methods', methods.getFieldState('operatorGroup'))
  return (
    <Modal
      isOpen={isOpen}
      onClose={close}
      title="ตั้งค่ารายละเอียดเอกสารต้นฉบับ"
      leftIcon={<FaEdit size={24} color={colors.blue[500]} />}
      width="732px"
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
          <Button
            label="สร้าง Template"
            disabled={!methods.formState.isValid || isSuccess}
            onClick={() => methods.handleSubmit(onSubmit)()}
          />
        </div>
      }
      content={
        <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
          <Controller
            control={methods.control}
            name="title"
            render={({ field }) => (
              <TextInput
                label="ชื่อเอกสาร"
                placeholder="กรอกชื่อเอกสาร"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="operatorGroup"
            render={({ field: { onChange, value } }) => (
              <Select
                // className="w-1/3"
                label="กำหนดกลุ่มผู้ดำเนินการเอกสาร"
                onChange={onChange}
                value={value}
                options={
                  departments?.map((department) => ({
                    label: department.name,
                    value: department.id,
                  })) ?? []
                }
              />
            )}
          />
          {/* <Controller
            control={methods.control}
            name="operatorId"
            render={({ field: { onChange, value } }) => (
              <MultiSelect
        options={tagsList.map((tag) => ({ value: tag.id, label: tag.name }))}
        onChange={(selected) => {
          onChange(selected.map((item) => item.value))
        }}
        value={tagsList
          ?.filter((tag) => value?.includes(tag.id))
          .map((tag) => ({ value: tag.id, label: tag.name }))}
        name={label}
        isSearchable
        isMulti
      />
            )}
          /> */}
          <Controller
            control={methods.control}
            name="description"
            render={({ field }) => (
              <RichTextInput
                label="รายละเอียดเอกสาร"
                placeholder="กรอกรายละเอียด"
                {...field}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="exampleFile"
            render={({ field: { value, onChange } }) => (
              // <label>
              <input
                type="file"
                accept=".pdf"
                // className="hidden"
                onChange={onChange}
              />
              // </label>
            )}
          />
        </form>
      }
    />
  )
}

export default TemplateInfoModal
