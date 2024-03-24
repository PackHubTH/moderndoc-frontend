import { z } from 'zod'

export const CreateTemplateFormValidation = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  //   element
  exampleFile: z.instanceof(File).optional(),
  receiver: z.array(z.string()).optional(),
  receiverGroup: z.string().optional(),
})

export type CreateTemplateForm = z.infer<typeof CreateTemplateFormValidation>
