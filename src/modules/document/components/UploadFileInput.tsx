import { uploadFileFolder } from '@/hooks/types'
import useGetFileMutate from '@/hooks/useGetFileMutate'
import useUploadFile from '@/hooks/useUploadFile'
import UploadFileImg from '@/modules/template/assets/upload-file.png'
import { getFileExtensionIcon, getFilename } from '@/utils/fileUtils'
import { useCallback, useRef } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'
import { HiTrash } from 'react-icons/hi'
import tw from 'twin.macro'

type PropsType = {
  label: string
  value: string[]
  onChange: (files: string[]) => void
  uploadFolder: uploadFileFolder
  isMultiple?: boolean
}

const UploadFileInput: React.FC<PropsType> = ({
  label,
  value,
  onChange,
  uploadFolder,
  isMultiple,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const { mutateAsync: uploadFile } = useUploadFile()
  const { mutateAsync: getFile } = useGetFileMutate()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const fileToUpload = isMultiple
        ? event.target.files[-1]
        : event.target.files[0]

      const result = await uploadFile({
        file: fileToUpload,
        folder: uploadFolder,
      })

      const temp = [...value]
      temp.push(result.data?.fileUrl as string)
      onChange(temp)
    }
  }

  const handleFileDrop = useCallback(
    async (item: { files: any[] }) => {
      if (item) {
        const files = item.files
        if (
          ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'].includes(
            files[0].type
          ) &&
          files[0].size <= 50000000
        ) {
          const result = await uploadFile({
            file: files[0],
            folder: uploadFolder,
          })

          const temp = [...value]
          temp.push(result.data?.fileUrl as string)
          onChange(temp)
        }
      }
    },
    [onChange, value]
  )

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE, 'image/png', 'image/jpeg', 'image/jpg'],
      drop(item: { files: any[] }) {
        handleFileDrop(item)
      },
      collect: (monitor: DropTargetMonitor) => {
        const item = monitor.getItem() as any

        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }
      },
    }),
    [onChange, value]
  )

  const openFileTempUrl = async (index: number) => {
    const url = await getFile(value[index])

    window.open(url.data, '_blank')
  }

  const onDeleteFile = (index: number) => {
    if (value) {
      const temp = [...value]
      temp.splice(index, 1)
      onChange(temp)
    }
  }

  const onClickUploadBox = () => {
    inputRef.current?.click()
  }

  const isActive = canDrop && isOver

  return (
    <div>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <div
        ref={drop}
        css={[
          tw`flex h-auto cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-white py-4 transition-all ease-in-out hover:border-blue-500`,
          isActive && tw`border-blue-500`,
        ]}
        onClick={onClickUploadBox}
      >
        <img src={UploadFileImg} alt="upload" />
        <p className="mt-2 font-medium">
          Drop your files here or{' '}
          <label className="cursor-pointer text-blue-500 hover:underline hover:underline-offset-2">
            browse
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="hidden"
              ref={inputRef}
              onChange={handleFileChange}
            />
          </label>
        </p>
        <p className="mt-1 text-sm text-gray-400">Maximum size: 50MB</p>
      </div>
      {value.length > 0 &&
        value.map((file, index) => (
          <li className="my-2 flex items-center text-center">
            <p
              className="flex w-full cursor-pointer items-center justify-between rounded-md border border-[#E5E7EB] bg-[#F0F7FF] px-3 py-1.5 text-[#6B7280] hover:underline"
              onClick={(e) => {
                e.stopPropagation()
                openFileTempUrl(index)
              }}
            >
              <div className="flex items-center gap-2">
                <img
                  className="h-6 w-6"
                  src={getFileExtensionIcon(file)}
                  alt="file"
                />
                <span>{getFilename(file)}</span>
              </div>
              <HiTrash
                size={18}
                className="cursor-pointer rounded-full text-gray-500"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteFile(index)
                }}
              />
            </p>
          </li>
        ))}
    </div>
  )
}
export default UploadFileInput
