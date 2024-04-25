import Button from '@/components/Button'
import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import useCreateAgencyDepartment from '@/modules/faq/hooks/api/useCreateAgency'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'

type PropsType = {
  isOpen: boolean
  onClose: () => void
}

const CreateDepartmentModal: React.FC<PropsType> = ({ isOpen, onClose }) => {
  const { mutate: createDepartment } = useCreateAgencyDepartment()

  const { refetch: refetchDepartments } = useGetAllDepartments(1)

  const [departmentName, setDepartmentName] = useState('')

  const onSubmit = () => {
    createDepartment(departmentName, {
      onSuccess: () => {
        toast('เพิ่มหน่วยงานสำเร็จ', { type: 'success' })
        refetchDepartments()
        onClose()
      },
      onError: (error: any) => {
        console.log('🚀 ~ inviteUser ~ error:', error)
        toast(
          `เกิดข้อผิดพลาดในการเพิ่มหน่วยงาน ${
            error?.response.data.error ?? ''
          }`,
          {
            type: 'error',
          }
        )
        onClose()
      },
    })
    setDepartmentName('')
  }

  return (
    <Modal
      width="800px"
      leftIcon={
        <FaPlus
          size={24}
          className="rounded-full bg-green-500 p-1 text-white"
        />
      }
      title="เพิ่มหน่วยงาน"
      content={
        <form className="space-y-4">
          <TextInput
            label="ชื่อหน่วยงาน/สังกัด"
            placeholder="กรอกชื่อหน่วยงาน/สังกัด"
            value={departmentName}
            onChange={(val) => setDepartmentName(val)}
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
