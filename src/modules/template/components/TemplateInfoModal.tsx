import * as CustomSelect from '@/components/Select'

import { useEffect, useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useUploadFile from '@/hooks/useUploadFile'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import colors from 'tailwindcss/colors'
import useCreateTemplate from '../hooks/api/useCreateTemplate'
import useGetUsersByAllAgency from '../hooks/api/useGetUsersByAllAgency'
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
  const { data: rawAgencyUsers } = useGetUsersByAllAgency()
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

  const departmentId = useWatch({
    control: methods.control,
    name: 'operatorGroup',
  })
  const agencyUsers = useMemo(() => {
    return (
      rawAgencyUsers?.data.filter(
        (user) => user.departmentId === departmentId
      )[0]?.users ?? []
    )
  }, [rawAgencyUsers, departmentId])

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
              <CustomSelect.default
                label="กำหนดกลุ่มผู้ดำเนินการเอกสาร"
                onChange={(e) => {
                  onChange(e)
                }}
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
          {departmentId !== '' && (
            <Controller
              control={methods.control}
              name="operatorId"
              render={({ field: { value, onChange } }) => (
                <Select
                  options={agencyUsers.map((user) => ({
                    value: user.id,
                    label: user.nameTh,
                  }))}
                  onChange={(selected) => {
                    onChange(selected.map((item) => item.value))
                  }}
                  value={agencyUsers
                    ?.filter((user) => value?.includes(user.id))
                    .map((user) => ({ value: user.id, label: user.nameTh }))}
                  isSearchable
                  isMulti
                />
              )}
            />
          )}
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
              <input type="file" accept=".pdf" onChange={onChange} />
            )}
          />
        </form>
      }
    />
  )
}

export default TemplateInfoModal
