import { useEffect, useRef } from 'react'
import { initCanvas, mouseHandler } from '../utils/documentEditorUtils'

import { useUserStore } from '@/stores/userStore'
import { parseUserDatatoAutofill } from '@/utils/parserUtils'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'

interface DocumentCanvasProps {
  id: string
  element: any
  type: 'document-create' | 'document-edit' | 'template'
}

const DocumentCanvas = ({ id, element, type }: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const canvasListRef = useRef(canvasList)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)
  const setActiveButton = useDocumentToolbarStore(
    (state) => state.setActiveButton
  )
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const activeObjectRef = useRef(activeObject)
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )
  const setActiveCanvasId = useDocumentToolbarStore(
    (state) => state.setActiveCanvasId
  )
  const resetCanvasList = useDocumentStore((state) => state.resetCanvasList)

  const user = useUserStore((state) => state.user)

  useEffect(() => {
    canvasListRef.current = canvasList
  }, [canvasList])

  useEffect(() => {
    // pdf should be loaded first before canvas from Fabric.js
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas = canvasList.findIndex((page) => page.id === id) !== -1
    console.log('isHasPage', isHasPage, 'isHasCanvas', isHasCanvas, element)
    console.log('type', type)
    if (isHasPage && !isHasCanvas) {
      initCanvas(
        id,
        element ?? {},
        setCanvasList,
        type,
        parseUserDatatoAutofill(user)
      )
    }

    return () => {
      const cleanup = async () => {
        const canvasEntry = canvasList.find((page) => page.id === id)
        if (canvasEntry && canvasEntry.canvas) {
          // await canvasEntry.canvas.dispose()
          canvasEntry.canvas.clear()
          resetCanvasList(id)
        }
      }
      console.log('cleanup')
      cleanup()
    }
  }, [canvasSizes])

  useEffect(() => {
    const canvas = canvasList.find((page) => page.id === id)?.canvas
    const handler = (option: any) => {
      console.log('mouse down', option?.absolutePointer, activeButton)
      if (canvas)
        mouseHandler(canvasList, canvas, activeButton, setActiveButton, {
          text: '',
          x: option.absolutePointer.x,
          y: option.absolutePointer.y,
        })
    }
    const handler2 = (option: any) => {
      console.log('selected', option)
      if (option.selected.length === 1) {
        const obj = option.selected[0]
        console.log('obj', obj)
        setActiveCanvasId(id)
        setActiveObject(obj)
      }
    }
    const handler3 = (option: any) => {
      setActiveObject(null)
    }

    const handler4 = (option: any) => {
      console.log('object:modified', option)
      const obj = option.target
      setActiveObject(obj)
    }

    if (canvas) {
      canvas.on('mouse:down', handler)
      canvas.on('selection:created', handler2)
      canvas.on('selection:cleared', handler3)
      canvas.on('selection:updated', handler2)
      canvas.on('object:modified', handler4)
      return () => {
        canvas.off('mouse:down', handler)
        canvas.off('selection:created', handler2)
        canvas.off('selection:cleared', handler3)
        canvas.off('selection:updated', handler2)
        canvas.off('object:modified', handler4)
      }
    }
  }, [activeButton, canvasList, id])

  console.log('selected obj', activeObject)
  return (
    <div className="absolute z-10">
      <canvas
        id={id}
        ref={canvasRef}
        width={canvasSizes.find((page) => page.id === id)?.w}
        height={canvasSizes.find((page) => page.id === id)?.h}
      />
    </div>
  )
}

export default DocumentCanvas
