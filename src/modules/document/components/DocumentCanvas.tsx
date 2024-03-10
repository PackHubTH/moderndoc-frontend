import { useEffect, useRef } from 'react'
import { addField, initCanvas } from '../utils/documentEditorUtils'

import { useDrop } from 'react-dnd'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { DnDItem } from '../types/DocumentField'

interface DocumentCanvasProps {
  id: string
}

const DocumentCanvas = ({ id }: DocumentCanvasProps) => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const canvasSizes = useDocumentStore((state) => state.canvasSizes)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const setMousePosition = useDocumentStore((state) => state.setMousePosition)
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)

  useEffect(() => {
    // pdf should be loaded first before canvas from Fabric.js
    const isHasPage = canvasSizes.findIndex((page) => page.id === id) !== -1
    const isHasCanvas =
      canvasList.findIndex((canvas) => canvas.id === id) !== -1

    if (isHasPage && !isHasCanvas)
      initCanvas(id, {}, setCanvasList, setMousePosition)

    return () => {
      const cleanup = async () => {
        if (isHasCanvas)
          await canvasList.find((canvas) => canvas.id === id)?.canvas?.dispose()
      }
      cleanup()
    }
  }, [canvasSizes])

  // useEffect(() => {
  //   const canvas = canvasList.find((canvas) => canvas.id === id)?.canvas
  //   // const handler = () => {
  //   //   if (canvas) {
  //   //     console.log('canvas event' + id + 'active butt' + activeButton)
  //   //     // updated cursor based on activeButton
  //   //     if (activeButton === ActiveToolbarButton.Text) {
  //   //       canvas.hoverCursor = 'crosshair'
  //   //       canvas.defaultCursor = 'crosshair'
  //   //     } else {
  //   //       canvas.hoverCursor = 'default'
  //   //       canvas.defaultCursor = 'default'
  //   //     }
  //   //   }
  //   //   return () => {
  //   //     canvas?.removeListeners()
  //   //   }
  //   // }
  //   if (canvas) {
  //     // canvas?.off('mouse:over', mouseHandler(canvas, activeButton))
  //     canvas.off('mouse:over', mouseHandler(canvas, activeButton))
  //     console.log('off')
  //     canvas.on('mouse:over', mouseHandler(canvas, activeButton))
  //     console.log('on')
  //     // canvas.renderAll()
  //     // canvas.off('mouse:over', () => console.log('off'))
  //     // canvas.on('mouse:over', () => console.log('on'))
  //   }
  // }, [activeButton])

  const [, dropRef] = useDrop(() => ({
    accept: 'box',

    drop: (item: DnDItem) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const canvasListRef = useRef(canvasList)
  useEffect(() => {
    canvasListRef.current = canvasList
  }, [canvasList]) // Update ref when canvasList changes

  const handleDrop = (item: DnDItem) => {
    console.log(item, id)
    // Use the current value of the ref which always points to the latest state
    const canvas = canvasListRef.current.find((canvas) => canvas.id === id)
      ?.canvas
    console.log('canvas', canvasListRef.current, canvas)
    if (canvas) {
      addField(canvas)
      // saveCanvas(canvasList)
    }
  }

  console.log('active', activeButton)
  console.log('canvasList', canvasList)
  return (
    <div className="absolute z-10 border-2 border-black" ref={dropRef}>
      <canvas
        id={id}
        width={canvasSizes.find((page) => page.id === id)?.w}
        height={canvasSizes.find((page) => page.id === id)?.h}
      />
    </div>
  )
}

export default DocumentCanvas
