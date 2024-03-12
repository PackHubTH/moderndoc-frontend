import * as Fabric from 'fabric'

import { PDFDocument } from 'pdf-lib'

import { CanvasProps } from '../types/DocumentField'
import { ActiveToolbarButton } from '../types/ToolbarButton'

const _json = {
  version: '6.0.0-beta9',
  objects: [
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'rgb(255, 0, 0)',
      width: 200,
      minWidth: 20,
      left: 164,
      top: 99,
      version: '6.0.0-beta9',
      // custom field
      is_locked: true,
    },
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'rgb(255, 0, 0)',
      width: 200,
      minWidth: 20,
      left: 364,
      top: 99,
      version: '6.0.0-beta9',
      // custom field
      is_locked: true,
    },
    {
      fontSize: 40,
      text: 'test text',
      type: 'Textbox',
      fill: 'rgb(255, 0, 0)',
      width: 200,
      minWidth: 20,
      left: 164,
      top: 199,
      version: '6.0.0-beta9',
      // custom field
      is_locked: true,
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
      fill: 'rgb(255, 0, 0)',
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

const addCheck = (canvas: Fabric.Canvas, x: number, y: number) => {
  console.log('addCheck')
  // add correct check
  canvas.add(
    new Fabric.Textbox('✓', {
      top: y,
      left: x,
      fontSize: 40,
      fill: 'green',
      minWidth: 20,
      is_locked: false,
    })
  )
  canvas.renderAll()
}

const addField = (
  canvas: Fabric.Canvas,
  text: string,
  x: number,
  y: number
) => {
  console.log('addField')
  canvas.add(
    new Fabric.Textbox(text, {
      top: y,
      left: x,
      fontSize: 40,
      fill: 'rgb(255, 0, 0)',
      width: 200,
      minWidth: 20,
      is_locked: false,
    })
  )
  canvas.renderAll()
}

const deleteField = (canvas: Fabric.Canvas) => {
  console.log('deleteField')
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    console.log('activeObject', activeObject)
    canvas.remove(activeObject)
    canvas.renderAll()
  }
}

const initCanvas = (
  id: string,
  activeButton: ActiveToolbarButton,
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void
) => {
  console.log('initCanvas')
  const newCanvas = new Fabric.Canvas(id)

  // newCanvas.loadFromJSON(json, newCanvas.renderAll.bind(newCanvas))
  newCanvas.loadFromJSON(_json).then(() => {
    newCanvas.forEachObject((obj: any) => {
      if (obj.is_locked) {
        obj.set({ selectable: false })
        obj.set({ evented: false })
      }
    })
    newCanvas.renderAll()
  })
  setCanvasList(id, newCanvas)
  //   newCanvas.renderAll()
}

// const mouseHandler = (canvas: any, activeButton: any) => {
//   if (canvas) {
//     console.log('canvas event' + 'active butt' + activeButton)
//     // updated cursor based on activeButton
//     if (activeButton === ActiveToolbarButton.Text) {
//       canvas.defaultCursor = 'crosshair'
//       canvas.hoverCursor = 'default'
//     } else {
//       canvas.defaultCursor = 'default'
//       canvas.hoverCursor = 'default'
//     }
//   }
//   console.log('mouseHandler')
//   return () => {
//     canvas?.removeListeners()
//   }
// }
const mouseHandler = (
  canvas: Fabric.Canvas,
  activeButton: ActiveToolbarButton,
  option?: any
) => {
  console.log('mouseHandler')
  switch (activeButton) {
    case ActiveToolbarButton.Text:
      console.log('text')
      addField(canvas, option.text, option.x, option.y)
      break
    case ActiveToolbarButton.Pen:
      console.log('pen')
      break
    case ActiveToolbarButton.Delete:
      console.log('delete')
      deleteField(canvas)
      break
    case ActiveToolbarButton.Correct:
      console.log('correct')
      addCheck(canvas, option.x, option.y)
      break
    default:
      console.log('default')
      break
  }
  if (activeButton !== ActiveToolbarButton.Default) {
    canvas.forEachObject((obj: any) => {
      console.log('obj', obj, obj.is_locked)
      obj.set({ selectable: false })
      obj.set({ evented: false })
    })
    canvas.discardActiveObject()
  } else {
    canvas.forEachObject((obj: any) => {
      console.log('obj', obj, obj.is_locked)
      if (!obj.is_locked) {
        obj.set({ selectable: true })
        obj.set({ evented: true })
      }
    })
  }
  canvas.renderAll()
}

const saveCanvas = async (canvasList: CanvasProps[], file: any) => {
  console.log('saveCanvas')
  let jsonList: any = []
  canvasList.forEach((item, index) => {
    console.log('canvas', item)
    // remove active object
    // item.canvas.remove(item.canvas.getActiveObject() as Fabric.Object)

    // change color of active object
    // const activeObject = item.canvas.getActiveObject()
    // if (activeObject) {
    //   activeObject.set('fill', 'yellow')
    //   item.canvas.renderAll()
    // }
    const json = JSON.stringify(item.canvas.toJSON())
    console.log('json', json)
    jsonList.push(json)
  })

  // Step 1: Retrieve the file from the input
  // const file = event.target.files[0];
  // const file = exampleFile
  if (!file) {
    return
  }

  // Step 2: Convert the file into an ArrayBuffer
  const arrayBuffer = await fetch(file).then((res) => {
    if (res.ok) return res.arrayBuffer()
    throw new Error('Failed to fetch PDF.')
  })

  // Step 3: Load into PDFDocument
  const pdfDoc = await PDFDocument.load(arrayBuffer)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]

  // Modify your PDF here
  // firstPage.drawText('This text was added with pdf-lib!', {
  //   x: 5,
  //   y: firstPage.getHeight() - 40,
  //   size: 12,
  // })
  // draw text based on json
  jsonList.forEach((json: any, i: number) => {
    // log object from json
    console.log('jsonnn', JSON.parse(json))
    JSON.parse(json).objects?.forEach((obj: any) => {
      console.log('obj', obj)
      pages[i].drawText(obj.text, {
        x: obj.left,
        y: pages[i].getHeight() - obj.top,
        size: obj.fontSize,
        // color: obj.fill as Color,
      })
    })
  })

  // Step 4: Serialize the PDFDocument to bytes
  const pdfBytes = await pdfDoc.save()
  console.log('pdfBytes', pdfBytes)

  // Step 5: Prompt the user to download the modified PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = 'modified_document.pdf'
  link.click()
}

export { addCheck, addField, initCanvas, mouseHandler, saveCanvas }
