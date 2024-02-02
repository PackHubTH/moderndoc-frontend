import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRole } from 'types/user'

const UserInfoSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Controller
        control={methods.control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Select
            label="สถานภาพ"
            options={[
              {
                value: UserRole.STUDENT,
                label: 'นักศึกษา',
              },
              {
                value: UserRole.TEACHER,
                label: 'อาจารย์',
              },
              {
                value: UserRole.STAFF,
                label: 'เจ้าหน้าที่',
              },
            ]}
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="nameTh"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="ชื่อ-นามสกุล (ภาษาไทย)"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="nameEn"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="ชื่อ-นามสกุล (ภาษาอังกฤษ)"
            onChange={onChange}
            value={value}
          />
        )}
      />
    </div>
  )
}

export default UserInfoSection
