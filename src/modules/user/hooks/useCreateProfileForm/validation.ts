import { z } from 'zod'

export const createProfileFormSchema = z.object({
  profileImg: z.string(),
  profileImgFile: z.any().optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN', 'STAFF']),
  nameTh: z.string(),
  nameEn: z.string(),
  studentNumber: z.string().min(11).max(11).optional(),
  staffNumber: z.string().optional(),
  emails: z.array(z.string()),
  defaultEmailIndex: z.number().default(0),
  phone: z.string().min(9).max(10),
  courseId: z.string().uuid().optional(),
  departmentIds: z.array(z.string()).optional(),
})

export type CreateProfileForm = z.infer<typeof createProfileFormSchema>
