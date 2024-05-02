import { SendChannel } from '@/modules/faq/types'
import { z } from 'zod'

export const CreateFaqFormValidation = z.object({
  titleTh: z.string().optional(),
  titleEn: z.string().optional(),
  documentCodeTh: z.string().optional(),
  documentCodeEn: z.string().optional(),
  description: z.string().optional(),
  sendChannel: z.nativeEnum(SendChannel),
  sendChannelInfo: z.string().optional(),
  extraContact: z.any().optional(),
  isInternal: z.boolean(),
  files: z.array(z.string()).optional(),
  templateId: z.string().nullable(),
  tagIds: z.array(z.string().uuid()).optional(),
  departmentId: z.string().uuid().optional(),
})

export type CreateFaqForm = z.infer<typeof CreateFaqFormValidation>
