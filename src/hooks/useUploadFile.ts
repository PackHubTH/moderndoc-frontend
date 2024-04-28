import moderndocApi from '@/moderndocApi'
import { useMutation } from '@tanstack/react-query'
import { ApiResponse } from 'types/response'
import { uploadFileFolder } from './types'

type PropsType = {
  file: any
  folder: uploadFileFolder
  isPublic?: boolean
}

type ResponseType = {
  fileUrl: string
  accessUrl: string
}

const useUploadFile = () => {
  const context = useMutation(['upload-file'], async (params: PropsType) => {
    const bodyFormData = new FormData()

    bodyFormData.append('file', params.file)
    bodyFormData.append('folder', params.folder)
    bodyFormData.append('isPublic', params.isPublic ? 'true' : 'false')

    const response = await moderndocApi.post<ApiResponse<ResponseType | null>>(
      '/upload-file',
      bodyFormData,
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
