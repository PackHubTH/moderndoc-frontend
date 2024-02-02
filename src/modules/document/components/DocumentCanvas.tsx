import * as Fabric from 'fabric'
import { useEffect, useState } from 'react'
import { useDocumentStore } from '../stores/documentStore'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)

  useEffect(() => {
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas =
      canvasList.findIndex((canvas) => canvas.id === id) !== -1

    if (isHasPage && !isHasCanvas) initCanvas()

    return () => {
      const cleanup = async () => {
        if (isHasCanvas)
          await canvasList.find((canvas) => canvas.id === id)?.canvas?.dispose()
        console.log('cleanup')
      }
      cleanup()
    }
  }, [canvasSizes])

  console.log('canvasList', canvasList)

  const initCanvas = async () => {
    const newCanvas = new Fabric.Canvas(id)
    const text = new Fabric.Textbox('fabric.js sandbox' + id)
    newCanvas.add(text)
    setCanvasList(id, newCanvas)
  }

  return (
    <div className="absolute z-10 border-2 border-black">
      <canvas
        id={id}
        width={canvasSizes.find((page) => page.id === id)?.w}
        height={canvasSizes.find((page) => page.id === id)?.h}
      />
    </div>
  )
}

export default DocumentCanvas
