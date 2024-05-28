import { Level, UserRole } from 'types/user'

import { User } from '@/modules/user/hooks/types'

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

const educationLevelMapper: Record<Level, string> = {
  [Level.BACHELOR]: 'ปริญญาตรี',
  [Level.MASTER]: 'ปริญญาโท',
  [Level.DOCTOR]: 'ปริญญาเอก',
}

export const getUserDepartment = (user?: User) => {
  if (!user) return ''
  switch (user.role) {
    case UserRole.STAFF:
      return user.staff?.staffDepartments?.[0]?.department?.name
    case UserRole.TEACHER:
      return user.teacher?.teacherDepartments?.[0]?.department?.name
    case UserRole.STUDENT:
      return user.student?.course?.department?.name
  }
}

export const getUserFacultyName = (user?: User) => {
  if (!user) return ''
  switch (user.role) {
    case UserRole.STAFF:
      return user.staff?.staffDepartments?.[0]?.department?.faculty?.name
    case UserRole.TEACHER:
      return user.teacher?.teacherDepartments?.[0]?.department?.faculty?.name
    case UserRole.STUDENT:
      return user.student?.course?.department?.faculty?.name
  }
}

export const getUserCourseName = (user?: User) => {
  if (!user) return ''
  switch (user.role) {
    case UserRole.STUDENT:
      return user.student?.course?.name
    default:
      return ''
  }
}

export const parseUserDatatoAutofill = (user: User): any => {
  if (!user) return {}

  let educationLevel = user?.student?.course?.level
    ? educationLevelMapper[user.student.course.level]
    : ''

  return {
    name: user.nameTh,
    educationLevel: educationLevel,
    faculty: getUserFacultyName(user),
    major: getUserDepartment(user),
    course: getUserCourseName(user),
    studentNumber: user?.student?.studentNumber ?? '-',
    email: user.emails[user.defaultEmailIndex],
    phone: user.phones[user.defaultPhoneIndex],
    teacher: user.student?.advisor?.user?.nameTh ?? 'อาจารย์ที่ปรึกษา',
  }
}
