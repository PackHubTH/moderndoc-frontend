import { Template } from './types'

export type GetAllTemplateResponse = {
  data: Template[]
  totalPages: number
  totalTemplatesCount: number
}
