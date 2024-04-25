import Button from '@/components/Button'
import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import useCreateAgencyDepartment from '@/modules/faq/hooks/api/useCreateAgency'
import useUpdateDepartment from '@/modules/faq/hooks/api/useUpdateDepartment'
import { Department } from '@/modules/user/hooks/types'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { MdModeEditOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  department?: Department | null
  callback?: () => void
}

const CreateDepartmentModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  mode = 'create',
  department,
  callback,
}) => {
  const { mutate: createDepartment } = useCreateAgencyDepartment()
  const { mutate: updateDepartment } = useUpdateDepartment()

  const { refetch: refetchDepartments } = useGetAllDepartments(1)

  const [departmentName, setDepartmentName] = useState('')

  const onCreateDepartment = () => {
    createDepartment(departmentName, {
      onSuccess: () => {
        toast('เพิ่มหน่วยงานสำเร็จ', { type: 'success' })
        refetchDepartments()
        setDepartmentName('')
        onClose()
        if (callback) {
          callback()
        }
      },
      onError: (error: any) => {
        toast(
          `เกิดข้อผิดพลาดในการเพิ่มหน่วยงาน ${
            error?.response.data.error ?? ''
          }`,
          {
            type: 'error',
          }
        )
        setDepartmentName('')
        onClose()
      },
    })
    setDepartmentName('')
  }

  const onUpdateDepartment = () => {
    updateDepartment(
      { departmentId: department?.id ?? '', name: departmentName },
      {
        onSuccess: () => {
          toast('แก้ไขหน่วยงานสำเร็จ', { type: 'success' })
          refetchDepartments()
          setDepartmentName('')
          onClose()
          if (callback) {
            callback()
          }
        },
        onError: (error: any) => {
          console.log('🚀 ~ inviteUser ~ error:', error)
          toast(
            `เกิดข้อผิดพลาดในการแก้ไขหน่วยงาน ${
              error?.response.data.error ?? ''
            }`,
            {
              type: 'error',
            }
          )
          setDepartmentName('')
          onClose()
        },
      }
    )
    setDepartmentName('')
  }

  return (
    <Modal
      width="800px"
      leftIcon={
        mode === 'create' ? (
          <FaPlus
            size={24}
            className="rounded-full bg-green-500 p-1 text-white"
          />
        ) : (
          <MdModeEditOutline
            size={24}
            className="rounded-full bg-blue-500 p-1 text-white"
          />
        )
      }
      title={mode === 'create' ? 'เพิ่มหน่วยงาน' : 'แก้ไขหน่วยงาน'}
      content={
        <form className="space-y-4">
          {mode === 'edit' && (
            <TextInput
              label="ชื่อหน่วยงาน/สังกัด"
              value={department?.name ?? ''}
              disabled
            />
          )}
          <TextInput
            label={mode === 'create' ? 'ชื่อหน่วยงาน' : 'แก้ไขชื่อหน่วยงาน'}
            placeholder={
              mode === 'create' ? 'กรอกชื่อหน่วยงาน' : 'กรอกชื่อหน่วยงานใหม่'
            }
            value={departmentName}
            onChange={(val) => setDepartmentName(val)}
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label={mode === 'create' ? 'เพิ่ม' : 'แก้ไข'}
            variant="blue"
            onClick={() =>
              mode === 'create' ? onCreateDepartment() : onUpdateDepartment()
            }
            disabled={departmentName === ''}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default CreateDepartmentModal
