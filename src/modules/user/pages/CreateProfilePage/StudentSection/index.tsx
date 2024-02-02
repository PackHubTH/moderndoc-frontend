import TextInput from '@/components/TextInput'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import { Controller, useFormContext } from 'react-hook-form'

const StudentSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  return (
    <div className="flex flex-col gap-5">
      <Controller
        control={methods.control}
        name="studentNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput label="รหัสนักศึกษา" onChange={onChange} value={value} />
        )}
      />
    </div>
  )
}

export default StudentSection
