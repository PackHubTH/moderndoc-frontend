import * as Fabric from 'fabric'
import { useEffect, useState } from 'react'
import { useDocumentStore } from '../stores/documentStore'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const [canvas, setCanvas] = useState<Fabric.Canvas | null>(null)
  const pageSizes = useDocumentStore((state) => state.pageSizes)

  useEffect(() => {
    if (pageSizes.length && pageSizes.find((page) => page.id === id) && !canvas)
      initCanvas()
    return () => {
      const cleanup = async () => {
        if (canvas) await canvas.dispose()
      }
      cleanup()
    }
  }, [pageSizes])

  const initCanvas = async () => {
    const newCanvas = new Fabric.Canvas(id)
    const text = new Fabric.Textbox('fabric.js sandbox' + id)
    newCanvas.add(text)
    setCanvas(newCanvas)
  }

  return (
    <div className="absolute z-10 border-2 border-black">
      <canvas
        id={id}
        width={pageSizes.find((page) => page.id === id)?.w}
        height={pageSizes.find((page) => page.id === id)?.h}
      />
    </div>
  )
}

export default DocumentCanvas
