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
      editable: false,
      // custom field
      // is_locked: true,
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
      editable: false,
      // custom field
      // is_locked: true,
    },
    {
      fontSize: 40,
      text: 'moveable text',
      type: 'Textbox',
      fill: 'rgb(255, 0, 0)',
      // width: 200,
      minWidth: 20,
      left: 364,
      top: 199,
      lockScalingY: true,
      version: '6.0.0-beta9',
      // editable: false,
      // custom field
      // is_locked: true,
      elName: 'nameTh',
    },
    {
      fontSize: 40,
      text: 'moveable text',
      type: 'Textbox',
      fill: 'rgb(255, 0, 0)',
      // width: 200,
      minWidth: 20,
      left: 164,
      top: 199,
      lockScalingY: true,
      version: '6.0.0-beta9',
      // editable: false,
      // custom field
      // is_locked: true,
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

const addAutoFill = (
  canvas: Fabric.Canvas,
  text: string,
  x: number,
  y: number,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  console.log('addAutoFill')

  const fabricText = new Fabric.Textbox('text', {
    top: y,
    left: x,
    fontSize: 14,
    fill: 'rgb(0, 0, 0)',
    width: 200,
    minWidth: 20,
    backgroundColor: '#DBEAFE',
    textAlign: 'center',
  })
  canvas.add(fabricText)
  canvas.setActiveObject(fabricText)
  canvas.renderAll()

  setActiveButton(ActiveToolbarButton.Default)
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
      // is_locked: false,
    })
  )
  canvas.renderAll()
}

const addField = (
  canvas: Fabric.Canvas,
  text: string,
  x: number,
  y: number,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  console.log('addField')

  const fabricText = new Fabric.Textbox(text, {
    top: y,
    left: x,
    fontSize: 20,
    fill: 'rgb(255, 0, 0)',
    width: 200,
    minWidth: 20,
  })

  canvas.add(fabricText)
  canvas.setActiveObject(fabricText)

  // Render the canvas before entering edit mode
  canvas.renderAll()

  // Enter editing mode
  const simulatedEvent = new MouseEvent('dblclick', {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: fabricText.left,
    clientY: fabricText.top,
  })
  fabricText.enterEditing(simulatedEvent)
  fabricText.hiddenTextarea?.focus()

  setActiveButton(ActiveToolbarButton.Default)
}

const deleteField = (
  canvas: Fabric.Canvas,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  const activeObject = canvas.getActiveObject()
  console.log('deleteField', activeObject)
  if (activeObject) {
    canvas.remove(activeObject)
    canvas.renderAll()
    setActiveButton(ActiveToolbarButton.Default)
  }
}

interface DataProps {
  [key: string]: any
}

const _data: DataProps = {
  nameTh: 'test name',
}

const _jsonStr =
  '{"version":"6.0.0-beta9","objects":[{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test text","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":164,"top":99,"width":200,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0},{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test text","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":364,"top":99,"width":200,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0},{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test name","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":164,"top":199,"width":155.4883,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0}]}'

const initCanvas = (
  id: string,
  json: any,
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void,
  data?: DataProps
) => {
  console.log('initCanvas')
  // check if canvas already exist then re-render
  // if (document.getElementById(id)) {
  //   console.log('canvas exist')
  //   return
  // }
  const newCanvas = new Fabric.Canvas(id)
  //extend textbox to add custom field
  // Extend the Textbox class to include elName as a custom attribute

  const originalToObject = newCanvas.toObject.bind(newCanvas)

  newCanvas.toObject = () => ({
    ...originalToObject(
      ['elName'] // Add the custom property to the list of properties to include
    ),
    // elName: 'test', // Adding custom property
  })

  // Fabric.Textbox.fromObject = (function (originalFn) {
  //   return function (object, callback) {
  //     return originalFn.call(Fabric.Textbox, object, (result, error) => {
  //       // Attach new properties or methods here
  //       if (object.elName) {
  //         result.elName = object.elName;
  //       }
  //       callback(result, error);
  //     });
  //   };
  // })(Fabric.Textbox.fromObject);
  // newCanvas.loadFromJSON(json, newCanvas.renderAll.bind(newCanvas))
  newCanvas.loadFromJSON({}).then(() => {
    newCanvas.forEachObject((obj: any) => {
      if (!obj.editable) {
        obj.set({ selectable: false })
        obj.set({ evented: false })
      }
      // if elName in json exist in data object then set text to data object
      if (obj?.elName && _data[obj?.elName]) {
        obj.set({ text: _data[obj?.elName] as string })
      }
      console.log('obj from json', obj)
    })
    newCanvas.renderAll()
  })
  setCanvasList(id, newCanvas)
}

const mouseHandler = (
  canvas: Fabric.Canvas,
  activeButton: ActiveToolbarButton,
  setActiveButton: (button: ActiveToolbarButton) => void,
  option?: any
) => {
  console.log('mouseHandler')
  if (activeButton !== ActiveToolbarButton.Default) {
    canvas.forEachObject((obj: any) => {
      // console.log('obj', obj, obj.is_locked)
      obj.set({ selectable: false })
      obj.set({ evented: false })
    })
    canvas.discardActiveObject()
  } else {
    canvas.forEachObject((obj: any) => {
      // console.log('obj', obj, obj.is_locked)
      if (obj.editable) {
        obj.set({ selectable: true })
        obj.set({ evented: true })
      }
    })
  }
  switch (activeButton) {
    case ActiveToolbarButton.AutoFill:
      console.log('autofill')
      addAutoFill(canvas, option.text, option.x, option.y, setActiveButton)
      break
    case ActiveToolbarButton.Text:
      console.log('text')
      addField(canvas, option.text, option.x, option.y, setActiveButton)
      break
    case ActiveToolbarButton.Pen:
      console.log('pen')
      break
    case ActiveToolbarButton.Delete:
      console.log('delete')
      deleteField(canvas, setActiveButton)
      break
    case ActiveToolbarButton.Correct:
      console.log('correct')
      addCheck(canvas, option.x, option.y)
      break
    default:
      console.log('default')
      break
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
        maxWidth: obj.width,
        lineHeight: 16,
        // font: 'Times New Roman',
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

const setTextAlign = (
  canvasList: CanvasProps[],
  id: string,
  align: string,
  setActiveObject: (obj: Fabric.Object) => void
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const updatedObject = activeObject.set({ textAlign: align })
    console.log('Updated Object', updatedObject)
    setActiveObject(updatedObject) // Updating state with the new object
    canvas.renderAll()
  }
}

const setTextBold = (
  canvasList: CanvasProps[],
  id: string,
  setActiveObject: (obj: Fabric.Object) => void
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const updatedObject = activeObject.set({
      fontWeight: activeObject.get('fontWeight') === 'bold' ? 'normal' : 'bold',
    })
    console.log('Updated Object', updatedObject)
    setActiveObject(updatedObject) // Updating state with the new object
    canvas.renderAll()
  }
}

const setTextItalic = (
  canvasList: CanvasProps[],
  id: string,
  setActiveObject: (obj: Fabric.Object) => void
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const updatedObject = activeObject.set({
      fontStyle:
        activeObject.get('fontStyle') === 'italic' ? 'normal' : 'italic',
    })
    console.log('Updated Object', updatedObject)
    canvas.renderAll()
    setActiveObject(updatedObject) // Updating state with the new object
  }
}

const setAutoFillType = (
  canvasList: CanvasProps[],
  id: string,
  elName: string,
  text: string
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const updatedObject = activeObject.set({ elName, text })
    console.log('Updated Object', updatedObject)
    canvas.renderAll()
  }
}

const getJson = (canvasList: CanvasProps[]) => {
  const jsonList: any = []
  canvasList.forEach((item, index) => {
    const json = JSON.stringify(item.canvas.toJSON())
    console.log('json', json)
    jsonList.push(json)
  })
  return jsonList
}

const rgbToHex = (rgb: string): string => {
  // Extract the numbers using regex
  let nums = rgb.match(/\d+/g)?.map(Number)
  if (!nums || nums.length !== 3) {
    throw new Error('Invalid RGB format')
  }

  // Convert the numbers to a hexadecimal string
  let hex = nums
    .map((num) => {
      let hexString = num.toString(16)
      return hexString.length === 1 ? '0' + hexString : hexString
    })
    .join('')

  // Add the '#' at the start of the string and return
  return '#' + hex
}

const hexToRgb = (hex: string): string => {
  // Ensure the hex string comes in the format #RRGGBB
  if (hex.charAt(0) === '#') {
    hex = hex.substring(1)
  }

  // Check for valid hex color length
  if (hex.length !== 6) {
    throw new Error('Invalid hex color format, expected #RRGGBB')
  }

  // Parse the hex string into its RGB components
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  // Return the RGB string
  return `rgb(${r},${g},${b})`
}

export {
  addAutoFill,
  addCheck,
  addField,
  getJson,
  hexToRgb,
  initCanvas,
  mouseHandler,
  rgbToHex,
  saveCanvas,
  setAutoFillType,
  setTextAlign,
  setTextBold,
  setTextItalic,
}
