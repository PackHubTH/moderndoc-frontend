import { z } from 'zod'

export const CreateDocumentFormValidation = z.object({
  isEditable: z.boolean(),
  operatorUserId: z.string().uuid(),
  message: z.string().optional(),
})

export type CreateDocumentForm = z.infer<typeof CreateDocumentFormValidation>
