import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import exampleFile from '@/assets/example.pdf'

const DocumentPage = () => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-200px)] bg-red-300">
        <div className="flex w-3/4 justify-center overflow-auto bg-green-200">
          <Document
            file={exampleFile}
            // renderMode="svg"
            onLoadSuccess={onDocumentLoadSuccess}
            className={''}
          >
            {Array.apply(null, Array(numPages))
              .map((x, i) => i + 1)
              .map((page) => {
                return (
                  <div key={page}>
                    <Page
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={2}
                      width={400}
                      className={'mt-2 border-black'}
                      renderMode="svg"
                    />
                  </div>
                )
              })}
          </Document>
        </div>
        <div>Sidebar</div>
      </div>
    </div>
  )
}

export default DocumentPage
