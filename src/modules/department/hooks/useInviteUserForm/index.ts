import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { InviteUserForm, InviteUserFormValidation } from './validation'

const useInviteUserForm = () => {
  const methods = useForm<InviteUserForm>({
    resolver: zodResolver(InviteUserFormValidation),
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useInviteUserForm
