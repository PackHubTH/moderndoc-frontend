import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CreateFaqForm, CreateFaqFormValidation } from './validation'

const useCreateFaqForm = () => {
  const methods = useForm<CreateFaqForm>({
    resolver: zodResolver(CreateFaqFormValidation),
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateFaqForm
