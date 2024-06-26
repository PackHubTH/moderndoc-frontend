export type Template = {
  id: string
  departmentId: string
  title: string
  templateFile: string
  exampleFile: string | null
  description: string
  createdAt: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: Date
  createdCount: number
  element: any
  userCreated: UserCreated
}

interface UserCreated {
  id: string
  nameTh: string
  profileImg: string
  emails: string[]
  defaultEmailIndex: number
}
