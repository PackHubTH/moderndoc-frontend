import { UserRole } from 'types/user'

export type CreateProfileForm = {
  profileImg: string
  role: UserRole
  nameTh: string
  nameEn: string
  studentNumber?: string
  staffNumber?: string
  email: string[]
  phone: string
}
