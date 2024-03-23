// import { SendChannel } from '@/modules/faq/types'

import { z } from 'zod'

export const CreateTemplateFormValidation = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  fileUrl: z.array(z.string()).optional(),
  tagIds: z.array(z.string().uuid()).optional(),
})

export type CreateTemplateForm = z.infer<typeof CreateTemplateFormValidation>

// export const CreateFaqFormValidation = z.object({
//   titleTh: z.string().min(3),
//   titleEn: z.string().min(3),
//   documentCodeTh: z.string(),
//   documentCodeEn: z.string(),
//   description: z.string().min(3),
//   sendChannel: z.nativeEnum(SendChannel),
//   sendChannelInfo: z.string().optional(),
//   extraContact: z.any().optional(),
//   isInternal: z.boolean(),
//   fileUrl: z.array(z.string()).optional(),
//   templateId: z.string().uuid().optional(),
//   tagIds: z.array(z.string().uuid()).optional(),
// })

// export type CreateFaqForm = z.infer<typeof CreateFaqFormValidation>
