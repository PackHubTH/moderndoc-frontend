import {
  DepartmentType,
  Faculty,
  StaffDepartment,
} from '@/modules/user/hooks/types'
import { UserRole } from 'types/user'
import { TeacherDepartment } from './../../../user/hooks/types'

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
    staffDepartments: StaffDepartment[]
  }
  teacher?: {
    staffNumber: string
    TeacherDepartment: TeacherDepartment[]
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
