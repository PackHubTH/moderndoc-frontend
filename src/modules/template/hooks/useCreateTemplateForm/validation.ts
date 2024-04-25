import { z } from 'zod'

export const CreateTemplateFormValidation = z.object({
  title: z.string().min(1),
  description: z.string(),
  //   element
  exampleFile: z.instanceof(File).optional(),
  operatorId: z.array(z.string().uuid()).optional(),
  operatorGroup: z.string().min(1),
})

export type CreateTemplateForm = z.infer<typeof CreateTemplateFormValidation>
