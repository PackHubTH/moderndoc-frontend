import { User } from '@/modules/user/hooks/types'
import { UserRole } from 'types/user'

const autoFillData = [
  { label: 'ชื่อ-นามสกุล', value: 'name' },
  { label: 'ระดับการศึกษา', value: 'educationLevel' },
  { label: 'คณะ', value: 'faculty' },
  { label: 'ภาค/สาขาวิชา', value: 'major' },
  { label: 'หลักสูตร', value: 'course' },
  { label: 'รหัสนักศึกษา', value: 'studentNumber' },
  { label: 'เบอร์โทรศัพท์', value: 'phone' },
  { label: 'E-mail', value: 'email' },
  { label: 'อาจารย์ที่ปรึกษา', value: 'teacher' },
]

export const parseUserDatatoAutofill = (user: User, role?: any): any => {
  console.log('before parseuser', user, user.role)
  if (!user || user.role !== UserRole.STUDENT) return {}

  return {
    name: user.nameTh,
    educationLevel: 'ระดับการศึกษา',
    faculty: 'คณะ',
    major: 'ภาค/สาขาวิชา',
    course: 'หลักสูตร',
    studentNumber: user.student.studentNumber,
    email: user.emails[user.defaultEmailIndex],
    phone: user.phones[user.defaultPhoneIndex],
    teacher: user.student?.advisor?.user?.nameTh ?? 'อาจารย์ที่ปรึกษา',
  }
}
