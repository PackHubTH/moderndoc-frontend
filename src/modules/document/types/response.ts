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
