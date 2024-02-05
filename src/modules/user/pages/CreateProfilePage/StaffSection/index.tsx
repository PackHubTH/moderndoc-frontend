import EmailInput from '@/components/EmailInput'
import TextInput from '@/components/TextInput'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import { Controller, useFormContext } from 'react-hook-form'

const StaffSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  return (
    <div className="flex flex-col gap-5 mt-5">
      <Controller
        control={methods.control}
        name="staffNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="รหัสประจำตัวบุคลากร"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="emails"
        render={({ field: { value } }) => (
          <EmailInput
            label="E-mail"
            onChange={(value, defaultEmailIndex) => {
              methods.setValue('emails', value)
              methods.setValue('defaultEmailIndex', defaultEmailIndex)
            }}
            value={value}
            defaultEmailIndex={methods.watch('defaultEmailIndex')}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Phone"
            onChange={onChange}
            value={value}
            patternFormat="###-###-####"
          />
        )}
      />
    </div>
  )
}

export default StaffSection
