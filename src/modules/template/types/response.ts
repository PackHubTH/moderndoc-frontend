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

export interface GetTemplateById {
  id: string
  departmentId: string
  title: string
  templateFile: string
  exampleFile: string
  description: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
  createdCount: number
  element: Element
  operators: Operator[]
}
export interface Operator {
  id: string
  nameTh: string
}
interface Element {
  data: any
}
