import { useCallback, useEffect, useMemo, useRef } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useTemplateStore } from '@/stores/templateStore'
import { NativeTypes } from 'react-dnd-html5-backend'
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
      className="min-h-[254px] border-b bg-slate-50 px-28 py-4"
      content={
        <>
          <div
            ref={drop}
            css={[
              tw`flex h-[213px] cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-white transition-all ease-in-out hover:border-blue-500`,
              isActive && tw`border-blue-500`,
            ]}
            onClick={onClickUploadBox}
          >
            {fileList ? (
              <>
                <h5 className="font-bold text-gray-700">Selected File</h5>
                <ul className="pl-3">
                  {fileList?.map((file) => (
                    <li className="my-2">
                      <span
                        className="cursor-pointer rounded-md border border-blue-300 bg-blue-100 px-4 py-1 text-blue-500 hover:underline"
                        onClick={() => openFileTempUrl(templateFile as File)}
                      >
                        {file.key}
                      </span>
                      <span
                        className="ml-2 cursor-pointer font-black text-red-500"
                        onClick={() => {
                          // onDeleteFile(index)
                        }}
                      >
                        X
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <img src={UploadFileImg} alt="upload" />
            )}
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
        </>
      }
      onClose={handleClose}
    />
  )
}

export default UploadModal
