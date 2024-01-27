import * as Fabric from 'fabric'
import { useEffect, useState } from 'react'
import { useDocumentStore } from '../stores/documentStore'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const [canvas, setCanvas] = useState<Fabric.Canvas>()
  const pageSizes = useDocumentStore((state) => state.pageSizes)

  useEffect(() => {
    const initializeCanvas = async () => {
      console.log('pagecan', pageSizes)
      const newCanvas = new Fabric.Canvas(id, {
        // backgroundColor: 'blue',
        width: pageSizes.find((page) => page.id === id)?.w,
        height: pageSizes.find((page) => page.id === id)?.h,
      })
      const text = new Fabric.Textbox('fabric.js sandbox')
      newCanvas.add(text)
      setCanvas(newCanvas)
    }
    console.log('canvas', canvas)
    if (!canvas) initializeCanvas()

    return () => {
      if (canvas) {
        const cleanUp = async () => {
          await canvas.dispose()
          // canvas.dispose()
          setCanvas(undefined)
        }
        cleanUp()
      }
    }
  }, [canvas, pageSizes])

  return (
    <div className="absolute z-10 border-2 border-black">
      <canvas id={id} />
    </div>
  )
}

export default DocumentCanvas
