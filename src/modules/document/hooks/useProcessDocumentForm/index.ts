import {
  ProcessDocumentForm,
  ProcessDocumentFormValidation,
} from './validation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useProcessDocumentForm = () => {
  const methods = useForm<ProcessDocumentForm>({
    resolver: zodResolver(ProcessDocumentFormValidation),
    defaultValues: {
      operatorId: '',
      description: '',
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useProcessDocumentForm
