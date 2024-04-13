export enum DocumentAction {
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

export type Document = {
  id: string
  title: string
  templateFile: string
  exampleFile: string
  element: Element
  status: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
  operatorId: string
  description: string
  userCreated: UserCreated
  operator: UserCreated
  documentSents: DocumentSent[]
}
type DocumentSent = {
  documentId: string
  receiverId: string
  isEditable: boolean
  sendAt: string
  senderId: string
  status: string
  id: string
}
type UserCreated = {
  nameTh: string
  nameEn: string
  emails: string[]
  defaultEmailIndex: number
  profileImg: string
}
interface Element {}
