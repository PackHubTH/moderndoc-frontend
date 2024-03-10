import { useEffect, useRef } from 'react'
import { addField, initCanvas } from '../utils/documentEditorUtils'

import { useDrop } from 'react-dnd'
import { useDocumentStore } from '../stores/documentStore'
import { DnDItem } from '../types/DocumentField'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const canvasListRef = useRef(canvasList)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    canvasListRef.current = canvasList
  }, [canvasList])

  useEffect(() => {
    // pdf should be loaded first before canvas from Fabric.js
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas = canvasList.findIndex((page) => page.id === id) !== -1
    if (isHasPage && !isHasCanvas) {
      initCanvas(id, setCanvasList)
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
      if (canvas) addField(canvas, posX, posY)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  // const handleDrop = useCallback((item: DnDItem , monitor: ) => {
  //   console.log(item, id)
  //   const canvas = canvasListRef.current.find((page) => page.id === id)?.canvas
  //   console.log('ref', canvasRef.current?.getBoundingClientRect())
  //   const posX =
  //   if (canvas) addField(canvas)
  // }, [])

  console.log('canvas', canvasList)
  return (
    <div className="absolute z-10 border-2 border-black" ref={dropRef}>
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
