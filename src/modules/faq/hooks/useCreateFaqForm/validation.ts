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
  extraContact: z.any().optional(),
  isInternal: z.boolean(),
  fileUrl: z.array(z.string()).optional(),
  templateId: z.string().optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

export type CreateFaqForm = z.infer<typeof CreateFaqFormValidation>
