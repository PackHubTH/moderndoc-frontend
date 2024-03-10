import * as Fabric from 'fabric'

import { ActiveToolbarButton } from '../types/ToolbarButton'

const _json = {
  version: '6.0.0-beta9',
  objects: [
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'red',
      width: 200,
      minWidth: 20,
      left: 164,
      top: 99,
      version: '6.0.0-beta9',
      // custom field
      is_locked: false,
    },
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'red',
      width: 200,
      minWidth: 20,
      left: 364,
      top: 99,
      version: '6.0.0-beta9',
      // custom field
      is_locked: false,
    },
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'red',
      width: 200,
      minWidth: 20,
      left: 164,
      top: 199,
      version: '6.0.0-beta9',
      // custom field
      is_locked: false,
    },
  ],
}

const temp = {
  version: '6.0.0-beta9',
  objects: [
    {
      fontSize: 40,
      fontWeight: 'normal',
      fontFamily: 'Times New Roman',
      fontStyle: 'normal',
      lineHeight: 1.16,
      text: 'fabric.js sandbox0',
      charSpacing: 0,
      textAlign: 'left',
      styles: [],
      path: null,
      pathStartOffset: 0,
      pathSide: 'left',
      pathAlign: 'baseline',
      underline: false,
      overline: false,
      linethrough: false,
      textBackgroundColor: '',
      direction: 'ltr',
      minWidth: 20,
      splitByGrapheme: false,
      type: 'Textbox',
      version: '6.0.0-beta9',
      originX: 'left',
      originY: 'top',
      left: 64,
      top: 99,
      width: 153.3203,
      height: 97.632,
      fill: 'red',
      stroke: null,
      strokeWidth: 1,
      strokeDashArray: null,
      strokeLineCap: 'butt',
      strokeDashOffset: 0,
      strokeLineJoin: 'miter',
      strokeUniform: false,
      strokeMiterLimit: 4,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
      shadow: null,
      visible: true,
      backgroundColor: '',
      fillRule: 'nonzero',
      paintFirst: 'fill',
      globalCompositeOperation: 'source-over',
      skewX: 0,
      skewY: 0,
    },
  ],
}

const addField = (canvas: Fabric.Canvas) => {
  console.log('addField')
  // console.log('mouse over', e?.absolutePointer)
  // add text
  const text = new Fabric.Textbox('new field', {
    // left: e?.absolutePointer?.x,
    // top: e?.absolutePointer?.y,
    top: 0,
    left: 0,
    fontSize: 40,
    fill: 'red',
    width: 200,
    minWidth: 20,
    is_locked: false,
  })
  canvas.add(text)
  canvas.renderAll()
}

const initCanvas = (
  id: string,
  json: any,
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void,
  setMousePosition: any
) => {
  console.log('initCanvas')
  const newCanvas = new Fabric.Canvas(id)
  // newCanvas?.on('object:modified', (e) => {
  //   console.log(JSON.stringify(e.target?.canvas))
  // })
  newCanvas?.on('mouse:over', (e) => {
    // check that mouse is holding
    if (e?.e?.type === 'mousedown') {
      console.log('mouse hold')
    }

    console.log('mouse over', e?.absolutePointer)
    // add text
    // const text = new Fabric.Textbox('test', {
    //   left: e?.absolutePointer?.x,
    //   top: e?.absolutePointer?.y,
    //   fontSize: 40,
    //   fill: 'red',
    //   width: 200,
    //   minWidth: 20,
    //   is_locked: false,
    // })
    // newCanvas.add(text)
  })
  // newCanvas?.on('mouse:move', (e) => {
  //   setMousePosition(e?.absolutePointer)
  //   console.log('mouse move', e?.absolutePointer ? e?.absolutePointer : 'null')
  // })
  newCanvas?.on('mouse:up', (e) => {
    console.log('mouse up')
  })
  newCanvas?.on('mouse:down', (e) => {
    console.log('mouse down')
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

const saveCanvas = (canvas: Fabric.Canvas) => {
  console.log('saveCanvas')
  console.log(JSON.stringify(canvas))
}

export { addField, initCanvas, mouseHandler, saveCanvas }
