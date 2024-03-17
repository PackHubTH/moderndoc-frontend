import {
  addField,
  initCanvas,
  mouseHandler,
} from '../utils/documentEditorUtils'
import { useEffect, useRef } from 'react'

import { DnDItem } from '../types/DocumentField'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { useDrop } from 'react-dnd'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
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
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )

  useEffect(() => {
    canvasListRef.current = canvasList
  }, [canvasList])

  useEffect(() => {
    // pdf should be loaded first before canvas from Fabric.js
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas = canvasList.findIndex((page) => page.id === id) !== -1
    if (isHasPage && !isHasCanvas) {
      initCanvas(id, {}, setCanvasList)
    }
    return () => {
      const cleanup = async () => {
        const canvas = canvasList.find((page) => page.id === id)?.canvas
        if (canvas) await canvas.dispose()
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
        mouseHandler(canvas, activeButton, setActiveButton, {
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
        setActiveObject(obj)
      }
    }
    if (canvas) {
      canvas.on('mouse:down', handler)
      canvas.on('selection:created', handler2)
      return () => {
        canvas.off('mouse:down', handler)
        canvas.off('selection:created', handler2)
      }
    }
  }, [activeButton, canvasList, id])

  const [, dropRef] = useDrop(() => ({
    accept: 'box',
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
      if (canvas) addField(canvas, item.text, posX, posY, setActiveButton)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  console.log('canvas', canvasList)
  console.log('selected obj', activeObject)
  return (
    <div className="absolute z-10" ref={dropRef}>
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
