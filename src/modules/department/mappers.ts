import { UserRole } from 'types/user'

export const RoleMapper: Record<UserRole, string> = {
  [UserRole.STAFF]: 'เจ้าหน้าที่',
  [UserRole.TEACHER]: 'อาจารย์',
  [UserRole.STUDENT]: 'นักศึกษา',
  [UserRole.ADMIN]: 'แอดมิน',
}
