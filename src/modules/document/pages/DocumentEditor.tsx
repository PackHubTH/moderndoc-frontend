import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import exampleFile from '@/assets/example.pdf'

const DocumentEditor = () => {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  return (
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
  )
}

export default DocumentEditor
