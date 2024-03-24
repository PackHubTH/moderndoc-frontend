import { Document, Page } from 'react-pdf'

import Button from '@/components/Button'
import MainLogo from '@/components/MainLogo'
import { useDisclosure } from '@/hooks/useDisclosure'
import { useTemplateStore } from '@/stores/templateStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TemplateInfoModal from '../components/TemplateInfoModal'

// import file from './example.pdf'

interface TemplateEditorProps {
  type: 'create' | 'edit'
}

const TemplateEditor = ({ type }: TemplateEditorProps) => {
  const { isOpen, open, close } = useDisclosure()
  const navigate = useNavigate()
  const templateFile = useTemplateStore((state) => state.templateFile)
  const [pageTotal, setPageTotal] = useState(0)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('numPages', numPages)
    setPageTotal(numPages)
  }
  return (
    <div>
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b-2 p-5">
        <TemplateInfoModal
          isOpen={isOpen}
          templateFile={templateFile}
          close={close}
        />
        <div className="flex items-center gap-8">
          <MainLogo />
          <h1 className="text-xl font-bold text-gray-600">
            การสร้างเอกสารต้นฉบับ (Template)
          </h1>
        </div>
        <div className="flex gap-4">
          <Button
            disabled={templateFile ? false : true}
            label={
              type === 'create' ? 'ตั้งค่า Template' : 'บันทึกการเปลี่ยนแปลง'
            }
            variant="green"
            onClick={open}
          />
          <Button
            label="ยกเลิก"
            variant="gray"
            onClick={() => navigate('/template-management')}
          />
        </div>
      </div>
      {/* Content */}
      <div className="flex h-[calc(100vh-80px)] justify-center overflow-auto bg-gray-100">
        <Document
          file={templateFile}
          // renderMode="svg"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.apply(null, Array(pageTotal))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <div key={page} className="relative">
                  <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    scale={1}
                    width={800}
                    className="my-2 border-black"
                    // renderMode="svg"
                  />
                </div>
              )
            })}
        </Document>
      </div>
    </div>
  )
}

export default TemplateEditor
