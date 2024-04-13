import { z } from 'zod'

export const ActionDocumentFormValidation = z.object({
  receiverId: z.string().uuid(),
  message: z.string().default(''),
})

export type ActionDocumentForm = z.infer<typeof ActionDocumentFormValidation>
