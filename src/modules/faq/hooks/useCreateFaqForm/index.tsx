import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CreateFaqForm, CreateFaqFormValidation } from './validation'

const useCreateFaqForm = () => {
  const methods = useForm<CreateFaqForm>({
    resolver: zodResolver(CreateFaqFormValidation),
    defaultValues: {
      tagIds: [],
      templateId: null,
      extraContact: {
        ['วันเวลาทำการ']: 'วันจันทร์ - วันศุกร์ เวลา 08.30 น. - 16.30 น.',
      },
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateFaqForm
