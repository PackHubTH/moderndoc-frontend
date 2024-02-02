import { useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import exampleFile from '@/assets/example.pdf'
import DocumentCanvas from '../components/DocumentCanvas'
import { useDocumentStore } from '../stores/documentStore'

const DocumentEditor = () => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>()
  const setPageSize = useDocumentStore((state) => state.setPageSizes)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const onPageLoadSuccess = (pageNumber: number) => {
    const pages = canvasRef.current?.children[0]
    if (pages)
      setPageSize({
        id: `${pageNumber - 1}`,
        h: pages.children[pageNumber - 1].clientHeight,
        w: pages.children[pageNumber - 1].clientWidth,
      })
  }

  return (
    <div
      className="flex h-[calc(100vh-122px)] justify-center overflow-auto bg-green-200"
      ref={canvasRef}
    >
      <Document
        file={exampleFile}
        // renderMode="svg"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.apply(null, Array(numPages))
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
  )
}

export default DocumentEditor
