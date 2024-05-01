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
  faculty?: Faculty
}

export enum DepartmentType {
  DEPARTMENT = 'DEPARTMENT',
  AGENCY = 'AGENCY',
}

export type Student = {
  id: string
  userId: string
  courseId: string
  advisorId?: string
  studentNumber: string
  advisor?: Advisor
  isApproved: ApprovalStatus
}

export type Advisor = {
  id: string
  userId: string
  staffNumber: string
  user?: User
}

export type Teacher = {
  id: string
  userId: string
  staffNumber: string
  teacherDepartments: TeacherDepartment[]
}

export enum StaffType {
  STAFF,
  ADMIN,
}

export type Staff = {
  id: string
  userId: string
  staffNumber: string
  type: StaffType
  staffDepartments: StaffDepartment[]
}

export type StaffDepartment = {
  id: string
  staffId: string
  departmentId: string
  isApproved: ApprovalStatus
  department?: Department
}

export type TeacherDepartment = {
  id: string
  teacherId: string
  departmentId: string
  isApproved: ApprovalStatus
  department?: Department
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
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
  teacher?: Teacher
  staff?: Staff
  token?: string
  isFinishRegister: boolean
}

export type GetCourseByIdResponse = Course & {
  department: Department
  faculty: Faculty
}

export type GetDepartmentByIdResponse = Department & {
  faculty: Faculty | null
}
