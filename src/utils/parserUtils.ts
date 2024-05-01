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

export const parseUserDatatoAutofill = (user: any, role?: any): any => {
  console.log('before parseuser', user)
  // if user is empty object return empty object
  if (!user) return {}

  const {
    nameTh,
    emails,
    phones,
    profileImg,
    defaultEmailIndex,
    defaultPhoneIndex,
  } = user
  return {
    name: nameTh,
    educationLevel: 'test',
    faculty: 'test',
    major: 'test',
    course: 'test',
    studentNumber: 'test',
    email: emails[defaultEmailIndex],
    phone: phones[defaultPhoneIndex],
    teacher: 'test',
  }
}
