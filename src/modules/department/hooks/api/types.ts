import { UserRole } from 'types/user'

export type GetDepartmentMemberResponse = {
  id: string
  role: UserRole
  emails: string[]
  defaultEmailIndex: number
  phones: string[]
  defaultPhoneIndex: number
  profileImg: string
  signatures: string[]
  notificationConfig: any
  createdAt: string
  nameEn: string
  nameTh: string
  student?: {
    studentNumber: string
  }
  staff?: {
    staffNumber: string
  }
  teacher?: {
    staffNumber: string
  }
}
