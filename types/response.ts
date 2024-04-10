export type ApiResponse<T> = {
  data: T
  error?: unknown
  message?: string
}

export type UploadFileResponse = {
  fileUrl: string
  accessUrl: string
}

export type ListResponse<T> = {
  data: {
    data: T[]
    totalPages: number
    count: number
  }
  error?: unknown
  message?: string
}
