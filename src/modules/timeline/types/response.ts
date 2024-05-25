import { Document, DocumentStatus } from '@/modules/document/types/types'
import { User } from '@/modules/user/hooks/types'
import { DocumentSentStatus } from './types'

export interface GetAllTimeline {
  data: Timeline[]
  totalPages: number
  total: number
}

export interface Timeline {
  documentId: string
  documentStatus: DocumentStatus
  message: string
  updatedBy: string
  createdAt: string
  userId: string
  id: string
  status: DocumentSentStatus
  document: Document
  userUpdatedBy: User
}
