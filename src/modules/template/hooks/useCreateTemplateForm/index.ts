import { CreateTemplateForm, CreateTemplateFormValidation } from './validation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useCreateTemplateForm = () => {
  const methods = useForm<CreateTemplateForm>({
    resolver: zodResolver(CreateTemplateFormValidation),
    defaultValues: {
      title: '',
      operatorGroup: '',
      operatorId: [],
      description: '',
      exampleFile: undefined,
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateTemplateForm
