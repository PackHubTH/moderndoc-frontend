import * as Fabric from 'fabric'
import { useEffect } from 'react'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { ActiveToolbarButton } from '../types/ToolbarButton'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)

  useEffect(() => {
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas =
      canvasList.findIndex((canvas) => canvas.id === id) !== -1

    if (isHasPage && !isHasCanvas) initCanvas()

    return () => {
      const cleanup = async () => {
        if (isHasCanvas)
          await canvasList.find((canvas) => canvas.id === id)?.canvas?.dispose()
      }
      cleanup()
    }
  }, [canvasSizes])

  useEffect(() => {
    const canvas = canvasList.find((canvas) => canvas.id === id)?.canvas
    const handler = () => {
      if (canvas) {
        console.log('canvas event' + id + 'active butt' + activeButton)
        // updated cursor based on activeButton
        if (activeButton === ActiveToolbarButton.Text) {
          canvas.hoverCursor = 'crosshair'
          canvas.defaultCursor = 'crosshair'
        } else {
          canvas.hoverCursor = 'default'
          canvas.defaultCursor = 'default'
        }
      }
      return () => {
        canvas?.removeListeners()
      }
    }
    if (canvas) {
      canvas?.off('mouse:over', handler)
      console.log('off')
      canvas?.on('mouse:over', handler)
      console.log('on')
    }
  }, [activeButton])

  console.log('active', activeButton)

  const initCanvas = async () => {
    const newCanvas = new Fabric.Canvas(id)
    const text = new Fabric.Textbox('fabric.js sandbox' + id, {
      id: id,
    })
    newCanvas.add(text)
    setCanvasList(id, newCanvas)
    text.get('id')
  }

  const mockElements = [
    {
      type: 'rect',
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: 'red',
    },
    {
      type: 'circle',
      left: 200,
      top: 200,
      radius: 50,
      fill: 'green',
    },
  ]

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
