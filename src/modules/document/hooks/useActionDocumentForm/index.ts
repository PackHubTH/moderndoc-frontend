import { ActionDocumentForm, ActionDocumentFormValidation } from './validation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

const useActionDocumentForm = () => {
  const methods = useForm<ActionDocumentForm>({
    resolver: zodResolver(ActionDocumentFormValidation),
    defaultValues: {
      receiverId: '',
      message: '',
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useActionDocumentForm
