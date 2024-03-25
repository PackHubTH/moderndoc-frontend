import { Faq } from '../types'

export type GetFaqsListResponse = {
  data: Faq[]
  totalPages: number
  total: number
}
