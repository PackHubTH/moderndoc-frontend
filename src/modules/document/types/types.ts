// export enum DocumentStatus {
//   SEND_DOCUMENT = '0',
//   NOTIFY_SENDER = '1',
//   COMPLETE = '2',
//   CANCEL = '3',
// }

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
