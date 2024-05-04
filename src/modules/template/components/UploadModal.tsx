import { useCallback, useEffect, useMemo, useRef } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useTemplateStore } from '@/stores/templateStore'
import { getFileExtensionIcon, getFilename } from '@/utils/fileUtils'
import { NativeTypes } from 'react-dnd-html5-backend'
import { HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import UploadFileImg from '../assets/upload-file.png'

interface UploadModalProps {
  isOpen: boolean
  close: () => void
}

const UploadModal = ({ isOpen, close }: UploadModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { templateFile, setTemplateFile } = useTemplateStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setTemplateFile(null)
    }
  }, [isOpen, setTemplateFile])

  const handleClose = useCallback(() => {
    setTemplateFile(null)
    close()
  }, [close, setTemplateFile])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setTemplateFile(event.target.files[0])
    }
  }

  const handleFileDrop = useCallback(
    (item: { files: any[] }) => {
      if (item) {
        const files = item.files
        if (files[0].type === 'application/pdf') {
          setTemplateFile(files[0])
        }
      }
    },
    [setTemplateFile]
  )

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
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
    []
  )

  function list(files: File[]) {
    const label = (file: File) =>
      `'${file.name}' of size '${file.size}' and type '${file.type}'`
    return files.map((file) => <li key={file.name}>{label(file)}</li>)
  }

  const openFileTempUrl = (file: File) => {
    const url = URL.createObjectURL(file)
    window.open(url, '_blank')
  }

  const onDeleteFile = (index: number) => {
    if (fileList) {
      const temp = [...fileList]
      temp.splice(index, 1)
      setTemplateFile(null)
    }
  }

  const fileList = useMemo(
    () => templateFile && list([templateFile]),
    [templateFile]
  )

  const onClickUploadBox = () => {
    inputRef.current?.click()
  }

  const isActive = canDrop && isOver

  return (
    <Modal
      isOpen={isOpen}
      title="อัปโหลดเอกสารต้นฉบับ (Template)"
      width="530px"
      actions={
        <div className="flex gap-4">
          <Button label="ยกเลิก" variant="outline-blue" onClick={handleClose} />
          <Button
            disabled={templateFile ? false : true}
            label="อัปโหลด"
            onClick={() => navigate('/create-template')}
          />
        </div>
      }
      className=" border-b bg-slate-50"
      content={
        <>
          {templateFile ? (
            <li className="mx-4 my-2 flex items-center text-center">
              <p className="flex w-full cursor-pointer items-center justify-between rounded-md border border-[#E5E7EB] bg-[#F0F7FF] px-3 py-1.5 text-[#6B7280] hover:underline">
                <div className="flex items-center gap-4">
                  <img
                    className="h-6 w-6"
                    src={getFileExtensionIcon(templateFile.name)}
                    alt="file"
                  />
                  <div className="span flex flex-col items-start">
                    <span>{getFilename(templateFile.name)}</span>
                    <span className="text-gray-400">
                      {(templateFile.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <HiTrash
                  size={18}
                  className="cursor-pointer rounded-full text-gray-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    setTemplateFile(null)
                  }}
                />
              </p>
            </li>
          ) : (
            <div
              ref={drop}
              css={[
                tw`mx-28 my-4 flex h-[213px] cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-white transition-all ease-in-out hover:border-blue-500`,
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
                    accept=".pdf"
                    className="hidden"
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                </label>
              </p>
              <p className="mt-1 text-sm text-gray-400">Maximum size: 50MB</p>
            </div>
          )}
        </>
      }
      onClose={handleClose}
    />
  )
}

export default UploadModal
