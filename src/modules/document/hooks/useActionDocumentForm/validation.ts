import { z } from 'zod'

export const ActionDocumentFormValidation = z.object({
  receiverId: z.string().uuid().default(''),
  message: z.string().optional().default(''),
})

export type ActionDocumentForm = z.infer<typeof ActionDocumentFormValidation>
