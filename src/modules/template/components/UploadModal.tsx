import { useCallback, useEffect, useMemo } from 'react'
import { DropTargetMonitor, useDrop } from 'react-dnd'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useTemplateStore } from '@/stores/templateStore'
import { NativeTypes } from 'react-dnd-html5-backend'
import { FaFileSignature } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface UploadModalProps {
  isOpen: boolean
  close: () => void
}

const UploadModal = ({ isOpen, close }: UploadModalProps) => {
  // const templateFile = useTemplateStore((state) => state.templateFile)
  // const setTemplateFile = useTemplateStore((state) => state.setTemplateFile)
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
        if (item) {
          console.log('collect', item.files, item.items)
        }

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
  const fileList = useMemo(
    () => templateFile && list([templateFile]),
    [templateFile]
  )

  console.log('file', templateFile)
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
      content={
        <div className="h-[254px] bg-slate-50 px-24 py-5">
          <div
            ref={drop}
            className="flex h-full flex-col items-center justify-center border-2 border-dashed bg-white"
          >
            <FaFileSignature size={60} color="blue" />
            <p className="mt-2 font-medium">
              Drop your files here or{' '}
              <label className="cursor-pointer text-blue-500 hover:underline hover:underline-offset-2">
                browse
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </p>
            <p className="text-sm text-gray-400">Maximum size: 50MB</p>
            {isActive ? 'Release to drop' : 'Drag file here'}
            <ul>{fileList}</ul>
          </div>
        </div>
      }
      onClose={handleClose}
    />
  )
}

export default UploadModal
