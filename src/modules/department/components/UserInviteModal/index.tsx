import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { IoIosSend } from 'react-icons/io'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'
import useInviteUser from '../../hooks/api/useInviteUser'
import useInviteUserForm from '../../hooks/useInviteUserForm'

type PropsType = {
  isOpen: boolean
  onClose: () => void
}

const UserInviteModal: React.FC<PropsType> = ({ isOpen, onClose }) => {
  const { methods } = useInviteUserForm()

  const { mutate: inviteUser } = useInviteUser()

  const [departmentSearch, setDepartmentSearch] = useState('')

  const { data: departments } = useGetAllDepartments(1, departmentSearch)

  const onSubmit = () => {
    inviteUser(methods.getValues(), {
      onSuccess: () => {
        toast('ส่งคำเชิญสำเร็จ', { type: 'success' })
        onClose()
      },
      onError: (error: any) => {
        console.log('🚀 ~ inviteUser ~ error:', error)
        toast(
          `เกิดข้อผิดพลาดในการส่งคำเชิญ ${error?.response.data.error ?? ''}`,
          {
            type: 'error',
          }
        )
        onClose()
      },
    })
    methods.reset({})
    setDepartmentSearch('')
  }

  useEffect(() => {
    if (methods.watch('role') === UserRole.ADMIN) {
      methods.setValue('departmentId', undefined, {
        shouldDirty: true,
        shouldValidate: true,
      })
      setDepartmentSearch('')
    }
  }, [methods.watch('role')])

  return (
    <Modal
      width="800px"
      leftIcon={<IoIosSend size={24} className="text-green-500" />}
      title="ส่งคำเชิญสร้างบัญชีในระบบ"
      content={
        <form className="space-y-4">
          <Controller
            control={methods.control}
            name="email"
            render={({ field }) => (
              <TextInput {...field} label="อีเมลถึง" type="email" />
            )}
          />
          <Controller
            control={methods.control}
            name="nameTh"
            render={({ field }) => (
              <TextInput {...field} label="ชื่อ-นามสกุลผู้รับ" />
            )}
          />
          <Controller
            control={methods.control}
            name="role"
            render={({ field }) => (
              <Select
                label="สถานภาพ"
                options={[
                  {
                    value: UserRole.TEACHER,
                    label: 'อาจารย์',
                  },
                  {
                    value: UserRole.STAFF,
                    label: 'เจ้าหน้าที่',
                  },
                  {
                    value: UserRole.ADMIN,
                    label: 'แอดมิน',
                  },
                ]}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="departmentId"
            render={({ field }) => (
              <AutocompleteInput
                disabled={methods.watch('role') === UserRole.ADMIN}
                onSearch={setDepartmentSearch}
                onChange={(value) => {
                  setDepartmentSearch(
                    departments?.data.data.find((d) => d.id === value)?.name ??
                      ''
                  )
                  field.onChange(value)
                }}
                value={departmentSearch}
                label="หน่วยงานที่สังกัด"
                options={
                  departments?.data.data.map((department) => ({
                    label: department.name,
                    value: department.id,
                  })) ?? []
                }
                placeholder="ค้นหาหน่วยงาน"
              />
            )}
          />
          <Controller
            control={methods.control}
            name="message"
            render={({ field }) => <RichTextInput {...field} label="ข้อความ" />}
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label="เพิ่ม"
            variant="blue"
            onClick={(e) => onSubmit()}
            disabled={!methods.formState.isValid}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default UserInviteModal
