import { UserRole } from 'types/user'
import { z } from 'zod'

export const InviteUserFormValidation = z
  .object({
    email: z.string().email(),
    nameTh: z.string().min(3),
    departmentId: z.string().uuid().optional(),
    role: z.nativeEnum(UserRole),
    message: z.string().optional().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.role === UserRole.ADMIN && data.departmentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
      })
    }

    if (data.role !== UserRole.ADMIN && !data.departmentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
      })
    }

    return data
  })

export type InviteUserForm = z.infer<typeof InviteUserFormValidation>
