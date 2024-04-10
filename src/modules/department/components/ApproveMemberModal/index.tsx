import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { toast } from 'react-toastify'
import { green, red } from 'tailwindcss/colors'
import useApproveDepartmentMember from '../../hooks/api/useApproveDepartmentMember'
import useGetDepartmentMembers from '../../hooks/api/useGetDepartmentMembers'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  isApproved?: boolean
  userId?: string
}

const ApproveMemberModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  isApproved,
  userId,
}) => {
  const { refetch: refetchMember } = useGetDepartmentMembers(isApproved)

  const { mutate: approveMember } = useApproveDepartmentMember()
  const onApprove = (memberUserId: string, isApproved: boolean) => {
    approveMember(
      { memberUserId, isApproved },
      {
        onSuccess: () => {
          refetchMember()
          toast(isApproved ? 'ตอบรับสำเร็จ' : 'ไม่ตอบรับสำเร็จ', {
            type: 'success',
          })
          close()
        },
        onError: () => {
          toast('เกิดข้อผิดพลาดในการตอบรับ', { type: 'error' })
          close()
        },
      }
    )
  }

  if (!userId) return null

  return (
    <Modal
      width="800px"
      leftIcon={
        isApproved ? (
          <MdCheckCircle size={24} color={green[500]} />
        ) : (
          <MdCancel size={24} color={red[500]} />
        )
      }
      title={isApproved ? 'ยืนยันการตอบรับ' : 'ปฏิเสธการตอบรับ'}
      content={
        <div>
          {isApproved
            ? 'ต้องการยืนยันการตอบรับสมาชิกหรือไม่'
            : 'ต้องการปฏิเสธการตอบรับสมาชิกหรือไม่'}
        </div>
      }
      actions={
        <div className="space-x-2">
          <Button label="ยกเลิก" onClick={onClose} variant="white" />
          <Button
            label="ยืนยัน"
            variant={isApproved ? 'green' : 'red'}
            onClick={() => onApprove(userId, isApproved!)}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default ApproveMemberModal
