import { useUserStore } from '@/stores/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { EditProfileForm, editProfileFormSchema } from './validation'

const useEditProfile = () => {
  const user = useUserStore.getState().user

  const methods = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      ...user,
      notificationConfig: ['1', '3', '7'],
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useEditProfile
