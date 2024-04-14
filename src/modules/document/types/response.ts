export type GetDocumentById = {
  id: string
  title: string
  templateFile: string
  exampleFile: string
  element: Element
  status: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
  operatorId?: any
  description: string
  documentSents: any[]
  documentTimelines: any[]
}
interface Element {}

export type GetOperatorsByTemplateId = {
  templateId: string
  operatorId: string
  operator: Operator
}
interface Operator {
  id: string
  role: string
  emails: string[]
  defaultEmailIndex: number
  phones: string[]
  defaultPhoneIndex: number
  profileImg: string
  signatures: any[]
  notificationConfig: number[]
  createdAt: string
  nameEn: string
  nameTh: string
}
