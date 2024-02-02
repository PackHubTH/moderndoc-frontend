import { useForm } from 'react-hook-form'
import { UserRole } from 'types/user'
import { CreateProfileForm } from './validation'

const useCreateProfileForm = () => {
  const methods = useForm<CreateProfileForm>({
    defaultValues: {
      role: UserRole.STUDENT,
      emails: [''],
    },
  })

  const onSubmit = (data: CreateProfileForm) => {
    console.log(data)
  }
  return { methods, onSubmit } as const
}

export default useCreateProfileForm
