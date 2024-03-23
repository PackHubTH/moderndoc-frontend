import { useForm } from 'react-hook-form'

// import { CreateFaqForm, CreateFaqFormValidation } from './validation'

const useCreateTemplateForm = () => {
  const methods = useForm<any>({
    // resolver: zodResolver(),
    defaultValues: {
      tagIds: [],
    },
    reValidateMode: 'onChange',
  })

  return { methods } as const
}

export default useCreateTemplateForm
