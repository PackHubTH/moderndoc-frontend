import React, { useEffect, useRef, useState } from 'react'
import DocumentEditor from './DocumentEditor'
import * as fabric from 'fabric'

const CanvasComponent = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>()

  useEffect(() => {
    const initializeCanvas = async () => {
      const newCanvas = new fabric.Canvas('canvas', {
        // backgroundColor: 'blue',
        width: 1200,
        height: 400,
      })
      const text = new fabric.Textbox('fabric.js sandbox')
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
  }, [canvas])

  return (
    <div className="absolute z-10 border-2 border-black">
      <canvas id={'canvas'} />
    </div>
  )
}

const Toolbar = () => {
  return (
    <div className="flex h-[30px] w-full bg-green-600">
      <div className="bg-blue-200">Toolbar</div>
    </div>
  )
}

const DocumentPage = () => {
  return (
    <div>
      <div className="h-[92px] bg-yellow-200">Header</div>
      <div className="flex h-[calc(100vh-92px)] bg-red-500">
        <CanvasComponent />
        <div className="w-3/4">
          <Toolbar />
          <DocumentEditor />
        </div>
        <div>Sidebar</div>
      </div>
    </div>
  )
}

export default DocumentPage
