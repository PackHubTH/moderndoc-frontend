import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'

type UploadFormData = {
  file: File
  folderPath: string
}

const useUploadFile = () => {
  const context = useMutation(['upload-file'], async (data: UploadFormData) => {
    const form = new FormData()
    form.append('file', data.file)
    form.append('folderPath', data.folderPath)

    const response = await moderndocApi.post<ApiResponse<unknown | null>>(
      '/upload-file',
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )

    return response.data
  })

  return context
}

export default useUploadFile
