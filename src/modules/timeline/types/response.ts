export interface GetAllTimeline {
  data: Timeline[]
  totalPages: number
  total: number
}

export interface Timeline {
  id: string
  documentId: string
  message: string
  updatedBy: string
  createdAt: string
  userId: string
  status: string
  document: Document
}

interface Document {
  title: string
  description: string
}
