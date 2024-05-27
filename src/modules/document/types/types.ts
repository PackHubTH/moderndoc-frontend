import { User } from '@/modules/user/hooks/types'

export enum DocumentAction {
  DRAFT = 'DRAFT',
  SEND_BACK_TO_OWNER = 'SEND_BACK_TO_OWNER',
  SEND_TO_OPERATOR = 'SEND_TO_OPERATOR',
  SEND_TO_REVIEW = 'SEND_TO_REVIEW',
  APPROVE = 'APPROVE',
  COMPLETE = 'COMPLETE',
  REJECT = 'REJECT',
}

export enum DocumentStatus {
  PROCESSING = 'PROCESSING',
  DRAFT = 'DRAFT',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum DocumentSentStatus {
  SENT = 'SENT',
  PROCESSING = 'PROCESSING',
  RETURNING = 'RETURNING',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export type Document = {
  id: string
  title: string
  templateFile: string
  exampleFile: string
  element: Element
  status: string
  createdAt: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
  operatorId: string
  description: string
  userCreated: User
  operator: User
  documentSents: DocumentSent[]
}
export type DocumentSent = {
  documentId: string
  receiverId: string
  isEditable: boolean
  sendAt: string
  senderId: string
  status: string
  id: string
}

interface Element {}
