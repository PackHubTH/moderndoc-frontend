import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { UserRole } from 'types/user'
import { CreateProfileForm, createProfileFormSchema } from './validation'

const useCreateProfileForm = () => {
  const methods = useForm<CreateProfileForm>({
    resolver: zodResolver(createProfileFormSchema),
    defaultValues: {
      role: UserRole.STUDENT,
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateProfileForm
