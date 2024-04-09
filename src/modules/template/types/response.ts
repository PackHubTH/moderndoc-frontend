import { Template } from './types'

export type GetAllTemplateResponse = {
  data: Template[]
  totalPages: number
  totalTemplatesCount: number
}

export type GetUsersByDepartmentId = {
  id: string
  nameTh: string
  role: string
}

export type GetUsersByAllAgency = {
  departmentId: string
  users: GetUsersByDepartmentId[]
}
