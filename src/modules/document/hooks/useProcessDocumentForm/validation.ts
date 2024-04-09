import { z } from 'zod'

export const ProcessDocumentFormValidation = z.object({
  operatorId: z.string().uuid(),
  description: z.string().optional(),
})

export type ProcessDocumentForm = z.infer<typeof ProcessDocumentFormValidation>
