import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRole } from 'types/user'

const UserInfoSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Controller
        control={methods.control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Select
            disabled
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
              {
                value: UserRole.ADMIN,
                label: 'แอดมิน',
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
