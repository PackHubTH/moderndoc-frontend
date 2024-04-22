import AutocompleteInput from '@/components/AutocompleteInput'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import { useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { blue } from 'tailwindcss/colors'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'
import useGetDepartmentMembers from '../../hooks/api/useGetDepartmentMembers'
import useSwapMemberDepartment from '../../hooks/api/useSwapMemberDepartment'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  memberUserId?: string
  oldDepartmentId?: string
  oldDepartmentName?: string
}

const SwapMemberModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  memberUserId,
  oldDepartmentId,
  oldDepartmentName,
}) => {
  const { mutate: updateDepartment } = useSwapMemberDepartment()

  const [departmentSearch, setDepartmentSearch] = useState('')
  const [departmentId, setDepartmentId] = useState<string | undefined>()

  const { refetch: refetchMembers } = useGetDepartmentMembers(
    1,
    true,
    oldDepartmentId
  )

  const { data: departments } = useGetAllDepartments(1, departmentSearch)

  const onSubmit = () => {
    updateDepartment(
      { memberId: memberUserId!, departmentId: departmentId! },
      {
        onSuccess: () => {
          toast('ย้ายสังกัดหน่วยงานสำเร็จ', { type: 'success' })
          onClose()
          refetchMembers()
        },
        onError: (error: any) => {
          toast(
            `เกิดข้อผิดพลาดในการย้ายสังกัดหน่วยงานสำเร็จ ${
              error?.response.data.error ?? ''
            }`,
            {
              type: 'error',
            }
          )
          onClose()
        },
      }
    )
    setDepartmentSearch('')
    setDepartmentId(undefined)
  }

  return (
    <Modal
      width="800px"
      leftIcon={<BiTransfer size={24} color={blue[500]} />}
      title="ย้ายสังกัดหน่วยงาน"
      content={
        <form className="space-y-4">
          <TextInput
            label="สังกัดปัจจุบัน"
            value={oldDepartmentName}
            disabled
          />
          <AutocompleteInput
            onSearch={setDepartmentSearch}
            onChange={(value) => {
              setDepartmentSearch(
                departments?.data.data.find((d) => d.id === value)?.name ?? ''
              )
              setDepartmentId(value)
            }}
            value={departmentSearch}
            label="สังกัดใหม่"
            options={
              departments?.data.data.map((department) => ({
                label: department.name,
                value: department.id,
              })) ?? []
            }
          />
        </form>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label="ย้าย"
            variant="blue"
            onClick={(e) => onSubmit()}
            disabled={!departmentId}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default SwapMemberModal
