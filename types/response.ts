export type ApiResponse<T> = {
  data: T
  error?: unknown
  message?: string
}
