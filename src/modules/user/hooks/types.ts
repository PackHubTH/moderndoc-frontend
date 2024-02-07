import { Level, UserRole } from 'types/user'

export type Faculty = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export type Course = {
  id: string
  name: string
  departmentId: string
  level: Level
}

export type Department = {
  id: string
  name: string
  type: DepartmentType
  facultyId: string
}

export enum DepartmentType {
  DEPARTMENT = 'DEPARTMENT',
  AGENCY = 'AGENCY',
}

export type Student = {
  id: string
  userId: string
  courseId: string
  advisorId?: any
  studentNumber: string
  isApproved: boolean
}

export type User = {
  id: string
  role: UserRole
  emails: string[]
  defaultEmailIndex: number
  phones: string[]
  defaultPhoneIndex: number
  profileImg: string
  signatures: any[]
  notificationConfig: object
  createdAt: string
  nameEn: string
  nameTh: string
  student: Student
  teacher?: any
  staff?: any
  token?: string
}
