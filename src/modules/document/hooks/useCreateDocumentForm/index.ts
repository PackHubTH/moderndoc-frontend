import { CreateDocumentForm, CreateDocumentFormValidation } from './validation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useCreateDocumentForm = () => {
  const methods = useForm<CreateDocumentForm>({
    resolver: zodResolver(CreateDocumentFormValidation),
    defaultValues: {
      isEditable: false,
      operatorUserId: '',
      message: '',
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateDocumentForm
