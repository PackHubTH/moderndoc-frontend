import { UserRole } from 'types/user'
import { z } from 'zod'

export const InviteUserFormValidation = z.object({
  email: z.string().email(),
  nameTh: z.string().min(3),
  departmentId: z.string().uuid().optional(),
  role: z.nativeEnum(UserRole),
  message: z.string().optional().default(''),
})

export type InviteUserForm = z.infer<typeof InviteUserFormValidation>
