import { useMutation } from '@tanstack/react-query'

type Params = {
  title: string
  // description: string
  exampleFile: string
  // receiver: string[]
  // receiverGroup: string
  templateFile: string
  // element: any
}

const useCreateTemplate = () => {
  const context = useMutation(['create-template'], async (data: Params) => {
    // const response = await moderndocApi.post<ApiResponse<unknown | null>>(
    //   '/template',
    //   data
    // )
    const response = { data: { test: 'test' } }
    return response.data
  })

  return context
}

export default useCreateTemplate
