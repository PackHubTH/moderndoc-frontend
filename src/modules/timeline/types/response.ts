export interface GetAllTimeline {
  data: Timeline[]
  totalPages: number
  total: number
}

export interface Timeline {
  documentId: string
  message: string
  updatedBy: string
  createdAt: string
  userId: string
  id: string
  status: string
  document: Document
}
interface Document {
  title: string
  description: string
  userCreated: UserCreated
  operator: UserCreated
}
interface UserCreated {
  nameTh: string
  nameEn: string
  profileImg: string
}
