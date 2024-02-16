import exampleFile from '@/assets/example.pdf'
import { useRef } from 'react'
import { FaMousePointer } from 'react-icons/fa'
import { FaA } from 'react-icons/fa6'
import { Document, Page } from 'react-pdf'
import DocumentAccordion from '../components/DocumentAccordion'
import DocumentCanvas from '../components/DocumentCanvas'
import DocumentToolbar from '../components/DocumentToolbar'
import ToolbarButton from '../components/ToolbarButton'
import { useDocumentStore } from '../stores/documentStore'
import { ActiveToolbarButton as ButtonId } from '../types/ToolbarButton'

const DocumentEditor = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasList = useDocumentStore((state) => state.canvasList)
  const pageTotal = useDocumentStore((state) => state.pageTotal)
  const setCanvasSize = useDocumentStore((state) => state.setCanvasSize)
  const setPageTotal = useDocumentStore((state) => state.setPageTotal)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageTotal(numPages)
  }

  const onPageLoadSuccess = (pageNumber: number) => {
    const pages = canvasRef.current?.children[0]
    if (pages)
      setCanvasSize(
        `${pageNumber - 1}`,
        pages.children[pageNumber - 1].clientHeight,
        pages.children[pageNumber - 1].clientWidth
      )
  }

  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-92px)]">
        <div className="w-3/4">
          <DocumentToolbar>
            <ToolbarButton icon={<FaMousePointer />} id={ButtonId.Default} />
            <ToolbarButton icon={<FaA />} id={ButtonId.Text} />
          </DocumentToolbar>
          {/* canvas section */}
          <div
            className="flex h-[calc(100vh-122px)] justify-center overflow-auto bg-green-200"
            ref={canvasRef}
          >
            <Document
              file={exampleFile}
              // renderMode="svg"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.apply(null, Array(pageTotal))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <div key={page} className="relative">
                      <DocumentCanvas id={`${page - 1}`} />
                      <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={2}
                        width={400}
                        className="mt-2 border-black"
                        renderMode="svg"
                        onLoadSuccess={() => onPageLoadSuccess(page)}
                      />
                    </div>
                  )
                })}
            </Document>
          </div>
          {/*  */}
        </div>
        {/* sidebar */}
        <div className="hs-accordion-group w-1/4">
          <DocumentAccordion title={'ข้อมูลผู้สร้างเอกสาร'}>
            TEST
          </DocumentAccordion>
          <DocumentAccordion title={'การแสดงความคิดเห็น'}>
            TEST
          </DocumentAccordion>
          <DocumentAccordion title={'ลากข้อมูลลงหน้ากระดาษ'}>
            TEST
          </DocumentAccordion>
        </div>
      </div>
      {/*  */}
    </div>
  )
}

export default DocumentEditor
