import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { formatPhoneNumber } from '@/utils/formatUtils'
import { UserRole } from 'types/user'
import { GetDepartmentMemberResponse } from '../../hooks/api/types'

type PropsType = {
  isOpen: boolean
  onClose: () => void
  userData: GetDepartmentMemberResponse | null
  departmentName: string
}

const UserInfoModal: React.FC<PropsType> = ({
  isOpen,
  onClose,
  userData,
  departmentName,
}) => {
  if (!userData) return null
  return (
    <Modal
      width="800px"
      title={
        <span className="mt-4 flex items-center justify-center gap-2">
          ข้อมูลส่วนตัว
        </span>
      }
      content={
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">ชื่อ-นามสกุล :</h4>
            <span>{userData.nameTh}</span>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">Full name :</h4>
            <span>{userData.nameEn}</span>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">E-mail :</h4>
            <div className="space-y-2">
              {userData.emails.map((email) => (
                <h5>{email}</h5>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">เบอร์โทรศัพท์ :</h4>
            <div className="space-y-2">
              {userData.phones.map((phone) => (
                <h5>{formatPhoneNumber(phone)}</h5>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">สังกัด :</h4>
            <div className="space-y-2">{departmentName}</div>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="w-28 font-semibold">รหัสประจำตัว :</h4>
            <span>
              {userData.role === UserRole.STUDENT
                ? userData.student!.studentNumber
                : userData.role === UserRole.TEACHER
                ? userData.teacher!.staffNumber
                : userData.staff!.staffNumber}
            </span>
          </div>
        </div>
      }
      actions={
        <div className="space-x-2">
          <Button label="ปิด" onClick={onClose} variant="white" />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default UserInfoModal
