import { useRef } from 'react'
import { Document, Page } from 'react-pdf'
import exampleFile from '@/assets/example.pdf'
import DocumentCanvas from '../components/DocumentCanvas'
import * as Fabric from 'fabric'
import { useDocumentStore } from '../stores/documentStore'
import DocumentToolbar from '../components/DocumentToolbar'

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

  const addTextBox = (id: string) => {
    const canvas = canvasList.find((canvas) => canvas.id === id)?.canvas
    const text = new Fabric.Textbox('add')
    canvas?.add(text)
  }

  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-92px)] bg-red-500">
        <div className="w-3/4">
          <DocumentToolbar>
            <button onClick={() => addTextBox('0')}>Add</button>
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
                        className={'mt-2 border-black'}
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
        <div>Sidebar</div>
      </div>
    </div>
  )
}

export default DocumentEditor
