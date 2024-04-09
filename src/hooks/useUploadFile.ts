import { ApiResponse, UploadFileResponse } from 'types/response'

import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'

type UploadFormData = {
  file: File
  folder: string
}

const useUploadFile = () => {
  const context = useMutation(['upload-file'], async (data: UploadFormData) => {
    const form = new FormData()
    form.append('file', data.file)
    form.append('folder', data.folder)

    const response = await moderndocApi.post<
      ApiResponse<UploadFileResponse | null>
    >('/upload-file', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  })

  return context
}

export default useUploadFile
