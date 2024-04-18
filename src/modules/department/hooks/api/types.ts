import { DepartmentType, Faculty } from '@/modules/user/hooks/types'
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

export type GetAllDepartmentsResponse = {
  id: string
  name: string
  type: DepartmentType
  facultyId?: string
  faculty?: Faculty
  staffCount: number
  awaitingApprovalCount: number
}
