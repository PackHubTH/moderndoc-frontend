export type ApiResponse<T> = {
  data: T
  error?: unknown
  message?: string
}

export type UploadFileResponse = {
  fileUrl: string
  accessUrl: string
}
