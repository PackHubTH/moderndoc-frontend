import { Level, UserRole } from 'types/user'
import { z } from 'zod'
import { Student, Teacher } from '../types'
import { Staff } from './../types'

export const editProfileFormSchema = z.object({
  id: z.string().uuid(),
  profileImg: z.string().optional(),
  profileImgFile: z.any().optional(),
  role: z.nativeEnum(UserRole),
  level: z.nativeEnum(Level).optional(),
  nameTh: z.string(),
  nameEn: z.string(),

  emails: z
    .string()
    .email()
    .array()
    .superRefine((val, ctx) => {
      const set = new Set(val)
      if (set.size !== val.length) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'duplicate email',
        })
      }
    }),
  defaultEmailIndex: z.number().default(0),
  phone: z.string().min(9).max(10),
  notificationConfig: z.any().optional(),
  student: z.custom<Student>().optional(),
  staff: z.custom<Staff>().optional(),
  teacher: z.custom<Teacher>().optional(),
  signatures: z.string().array().max(3).optional(),
  signaturesFile: z.any().optional(),
  advisorId: z.string().uuid().optional(),
})

export type EditProfileForm = z.infer<typeof editProfileFormSchema>
