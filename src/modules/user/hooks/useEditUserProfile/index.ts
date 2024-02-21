import { useUserStore } from '@/stores/userStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useGetUser from '../api/useGetUser'
import { EditProfileForm, editProfileFormSchema } from './validation'

const useEditProfile = () => {
  const user = useUserStore.getState().user
  const { data: userData } = useGetUser()

  const methods = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      ...user,
      phone: user.phones[0] ?? '',
      notificationConfig: [1, 3, 7],
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useEditProfile
