import { UserRole } from 'types/user'
import { z } from 'zod'

export const InviteUserFormValidation = z.object({
  email: z.string().email(),
  nameTh: z.string().min(3),
  departmentId: z.string(),
  role: z.nativeEnum(UserRole),
  message: z.string().min(3),
})

export type InviteUserForm = z.infer<typeof InviteUserFormValidation>
