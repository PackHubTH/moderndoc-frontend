import { useEffect, useRef } from 'react'
import { addImg, initCanvas, mouseHandler } from '../utils/documentEditorUtils'

import { useUserStore } from '@/stores/userStore'
import { parseUserDatatoAutofill } from '@/utils/parserUtils'
import { useDrop } from 'react-dnd'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { ActiveToolbarButton } from '../types/ToolbarButton'

interface DnDItem {
  src: string
}

interface DocumentCanvasProps {
  id: string
  element: any
  type: 'document-create' | 'document-edit' | 'template'
  isEditable?: boolean
}

const DocumentCanvas = ({
  id,
  isEditable = true,
  element,
  type,
}: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const isPreview = useDocumentStore((state) => state.isPreview)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)
  const setActiveButton = useDocumentToolbarStore(
    (state) => state.setActiveButton
  )
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )
  const setActiveCanvasId = useDocumentToolbarStore(
    (state) => state.setActiveCanvasId
  )
  const resetCanvasList = useDocumentStore((state) => state.resetCanvasList)

  const user = useUserStore((state) => state.user)

  const canvasListRef = useRef(canvasList)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const activeObjectRef = useRef(activeObject)

  useEffect(() => {
    canvasListRef.current = canvasList
  }, [canvasList])

  useEffect(() => {
    const isHasPage = canvasSizes.some((page) => page.id === id)
    const isHasCanvas = canvasList.some((page) => page.id === id)
    console.log('isHasPage', isHasPage, 'isHasCanvas', isHasCanvas, element)
    console.log('type', type, 'isEditable', isEditable)

    if (isHasPage && !isHasCanvas) {
      initCanvas(
        id,
        element ?? {},
        setCanvasList,
        type,
        isEditable,
        parseUserDatatoAutofill(user)
      )
    }

    return () => {
      const cleanup = async () => {
        const canvasEntry = canvasList.find((page) => page.id === id)
        if (canvasEntry && canvasEntry.canvas) {
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
      console.log(
        'mouse down',
        option?.absolutePointer,
        activeButton,
        isPreview
      )
      if (canvas) {
        mouseHandler(canvasList, canvas, activeButton, setActiveButton, {
          isEditable,
          isPreview,
          text: '',
          type,
          x: option.absolutePointer.x,
          y: option.absolutePointer.y,
        })
      }
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

    const handler3 = () => {
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
  }, [
    activeButton,
    canvasList,
    id,
    isPreview,
    isEditable,
    setActiveButton,
    setActiveObject,
    setActiveCanvasId,
  ])

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'sign',
    drop: (item: DnDItem, monitor) => {
      console.log(item, id)
      const canvas = canvasListRef.current.find((page) => page.id === id)
        ?.canvas
      const m = monitor.getClientOffset()
      const c = canvasRef.current?.getBoundingClientRect()
      const posX = m!.x - c!.x
      const posY = m!.y - c!.y
      console.log('pos', posX, posY)
      console.log(monitor.getClientOffset())
      console.log(canvasRef.current?.getBoundingClientRect())
      if (canvas) {
        addImg(canvas, item.src, posX, posY)
        setActiveButton(ActiveToolbarButton.Default)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  console.log('selected obj', activeObject)
  console.log(
    'canvas size',
    canvasSizes.find((page) => page.id === id)
  )

  const isActive = canDrop && isOver
  console.log('isActive', isActive)
  return (
    <div className="absolute z-10" ref={drop}>
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
