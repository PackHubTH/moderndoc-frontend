import { SendChannel } from '@/modules/faq/types'
import { z } from 'zod'

export const CreateFaqFormValidation = z.object({
  titleTh: z.string().min(3),
  titleEn: z.string().min(3),
  documentCodeTh: z.string(),
  documentCodeEn: z.string(),
  description: z.string().min(3),
  sendChannel: z.nativeEnum(SendChannel),
  sendChannelInfo: z.string().optional(),
  extraContact: z.any(),
  isInternal: z.boolean(),
  tagIds: z.array(z.string().uuid()),
})

export type CreateFaqForm = z.infer<typeof CreateFaqFormValidation>
