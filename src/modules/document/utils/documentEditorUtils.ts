import * as Fabric from 'fabric'
import { ActiveToolbarButton } from '../types/ToolbarButton'

const initCanvas = (id: string, json: any, setCanvasList: any) => {
  const _json = {
    version: '6.0.0-beta9',
    objects: [
      {
        fontSize: 16,
        text: 'fabric.js sandbox0',
        minWidth: 20,
        type: 'Textbox',
        version: '6.0.0-beta9',
        fill: 'rgb(0,0,0)',
      },
    ],
  }
  console.log('initCanvas')
  const newCanvas = new Fabric.Canvas(id)
  newCanvas?.on('object:modified', (e) => {
    console.log(JSON.stringify(e.target?.canvas))
  })
  // newCanvas.loadFromJSON(json, newCanvas.renderAll.bind(newCanvas))
  newCanvas.loadFromJSON(_json).then(() => {
    newCanvas.renderAll()
  })
  setCanvasList(id, newCanvas)
  //   newCanvas.renderAll()
}

const mouseHandler = (canvas: any, activeButton: any) => {
  if (canvas) {
    console.log('canvas event' + 'active butt' + activeButton)
    // updated cursor based on activeButton
    if (activeButton === ActiveToolbarButton.Text) {
      canvas.defaultCursor = 'crosshair'
      canvas.hoverCursor = 'default'
    } else {
      canvas.defaultCursor = 'default'
      canvas.hoverCursor = 'default'
    }
  }
  console.log('mouseHandler')
  return () => {
    canvas?.removeListeners()
  }
}

export { initCanvas, mouseHandler }
