import { z } from 'zod'

export const CreateDocumentFormValidation = z.object({
  isEditable: z.boolean().default(false),
  operatorUserId: z.string().uuid().default(''),
  message: z.string().optional().default(''),
})

export type CreateDocumentForm = z.infer<typeof CreateDocumentFormValidation>
