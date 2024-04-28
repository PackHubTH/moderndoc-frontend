import * as CustomSelect from '@/components/Select'

import { fetchFile, getFilename } from '@/utils/fileUtils'
import { useEffect, useMemo } from 'react'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import TextInput from '@/components/TextInput'
import useGetFile from '@/hooks/useGetFile'
import useUploadFile from '@/hooks/useUploadFile'
import { useDocumentStore } from '@/modules/document/stores/documentStore'
import { getJson } from '@/modules/document/utils/documentEditorUtils'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import { useTemplateStore } from '@/stores/templateStore'
import { Controller } from 'react-hook-form'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import colors from 'tailwindcss/colors'
import useCreateTemplate from '../hooks/api/useCreateTemplate'
import useGetUsersByAllAgency from '../hooks/api/useGetUsersByAllAgency'
import useUpdateTemplate from '../hooks/api/useUpdateTemplate'
import useCreateTemplateForm from '../hooks/useCreateTemplateForm'
import { CreateTemplateForm } from '../hooks/useCreateTemplateForm/validation'
import { GetTemplateById } from '../types/response'
import UploadFileButton from './UploadFileButton'
import UserMultiSelect from './UserMultiSelect'

interface TemplateInfoModalProps {
  templateData: GetTemplateById | undefined
  isOpen: boolean
  type: 'create' | 'edit'
  close: () => void
}

const TemplateInfoModal = ({
  templateData,
  isOpen,
  type,
  close,
}: TemplateInfoModalProps) => {
  const { methods } = useCreateTemplateForm()
  const canvasList = useDocumentStore((state) => state.canvasList)
  const templateFile = useTemplateStore((state) => state.templateFile)
  const { mutate: createTemplate, isSuccess: isCreateSuccess } =
    useCreateTemplate()
  const { mutate: updateTemplate, isSuccess: isUpdateSuccess } =
    useUpdateTemplate()
  const { data: rawDepartments } = useGetDepartments()
  const { data: rawAgencyUsers, refetch: refetchUsers } =
    useGetUsersByAllAgency(methods.watch('operatorGroup') ?? '')
  const { mutateAsync: uploadFile } = useUploadFile()
  const { data: exampleFileEdit, refetch: refetchExampleFileEdit } = useGetFile(
    templateData?.exampleFile ?? ''
  )
  const navigate = useNavigate()

  const departments = useMemo(() => {
    if (rawDepartments) {
      return [
        { id: '-', name: 'เจ้าหน้าที่ประจำภาควิชา' },
        ...rawDepartments?.data,
      ]
    }
  }, [rawDepartments])

  const setExampleFile = async (exampleFileUrl: string) => {
    if (exampleFileUrl) {
      const file = await fetchFile(exampleFileUrl)
      if (file) {
        methods.setValue('exampleFile', file)
        methods.trigger()
      }
    }
  }

  useEffect(() => {
    if (type === 'edit' && templateData) {
      refetchExampleFileEdit()
    }
  }, [type, templateData])

  useEffect(() => {
    if (!isOpen) {
      methods.reset()
    } else if (type === 'edit' && isOpen && templateData && departments) {
      methods.setValue('title', templateData.title)
      methods.setValue('description', templateData.description)

      // Call the function to handle file fetching
      setExampleFile(exampleFileEdit?.data ?? '')

      // Check and set operator group
      if (
        !departments.find(
          (department) => department.id === templateData.operatorGroup
        )
      ) {
        methods.setValue('operatorGroup', '-')
      } else {
        methods.setValue('operatorGroup', templateData.operatorGroup)
        methods.setValue(
          'operatorId',
          templateData.operators.map((operator) => operator.id)
        )
      }
      methods.trigger()
    }
  }, [isOpen, type, templateData, departments, methods])

  const operatorGroup = methods.watch('operatorGroup')
  useEffect(() => {
    if (operatorGroup !== '-' && operatorGroup) {
      refetchUsers()
    }
  }, [operatorGroup])

  const onCreateSubmit = async (data: CreateTemplateForm) => {
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
            element: {
              data: getJson(canvasList),
            },
            operatorId: data.operatorId ?? [],
            operatorGroup: data.operatorGroup === '-' ? '' : data.operatorGroup,
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

  const onUpdateSubmit = async (data: CreateTemplateForm) => {
    try {
      const isExampleFileChanged =
        getFilename(templateData?.exampleFile ?? '') !==
        getFilename(data.exampleFile?.name ?? '')

      let response = null
      if (isExampleFileChanged)
        response = await uploadFile({
          file: data.exampleFile,
          folder: 'template',
        })

      if (response?.data?.fileUrl || !isExampleFileChanged)
        updateTemplate(
          {
            id: templateData?.id ?? '',
            title: data.title,
            description: data.description,
            element: {
              data: getJson(canvasList),
            },
            operatorId: data.operatorId ?? [],
            operatorGroup: data.operatorGroup === '-' ? '' : data.operatorGroup,
            exampleFile: response?.data?.fileUrl || templateData?.exampleFile,
          },
          {
            onSuccess: () => {
              toast('อัพเดท Template สำเร็จ', { type: 'success' })
              setTimeout(() => navigate('/template-management'), 2000)
            },
            onError: (error) => {
              toast(`เกิดข้อผิดพลาดในการอัพเดท Template ${error}`, {
                type: 'error',
              })
            },
          }
        )
      else {
        toast('เกิดข้อผิดพลาดในการอัพโหลดไฟล์', { type: 'error' })
      }
    } catch (error) {
      toast(`เกิดข้อผิดพลาดในการอัพเดท Template ${error}`, { type: 'error' })
    }
  }

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
            label={
              type === 'create' ? 'สร้าง Template' : 'บันทึกการเปลี่ยนแปลง'
            }
            disabled={
              !methods.formState.isValid || isCreateSuccess || isUpdateSuccess
            }
            onClick={() =>
              type === 'create'
                ? methods.handleSubmit(onCreateSubmit)()
                : methods.handleSubmit(onUpdateSubmit)()
            }
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
          {methods.watch('operatorGroup') &&
            methods.watch('operatorGroup') !== '-' && (
              <Controller
                control={methods.control}
                name="operatorId"
                render={({ field: { value, onChange } }) => (
                  <UserMultiSelect
                    label="กำหนดรายชื่อผู้รับผิดชอบดำเนินการเอกสาร (ถ้ามี)"
                    value={value ?? []}
                    options={rawAgencyUsers?.data ?? []}
                    onChange={onChange}
                    placeholder="เลือกรายชื่อ"
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
              <UploadFileButton
                value={value}
                onChange={(file) => {
                  onChange(file)
                }}
              />
            )}
          />
        </form>
      }
    />
  )
}

export default TemplateInfoModal
