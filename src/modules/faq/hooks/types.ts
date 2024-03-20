import { Faq } from '../types'

export type GetFaqsListResponse = {
  faqs: Faq[]
  totalPages: number
  totalFaqsCount: number
}
