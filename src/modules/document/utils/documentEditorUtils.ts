import * as Fabric from 'fabric'

import { useUserStore } from '@/stores/userStore'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { CanvasProps } from '../types/DocumentField'
import { ActiveToolbarButton } from '../types/ToolbarButton'

// add delete icon controls
export const deleteIcon = new Fabric.Control({
  x: 0.5,
  y: -0.5,
  offsetY: 16,
  offsetX: 16,
  cursorStyle: 'pointer',
  mouseUpHandler: (eventData, transform: any) => {
    const target = transform.target
    const canvas = target.canvas
    canvas.remove(target)
    canvas.renderAll()
  },
  render: (ctx, left, top, styleOverride, fabricObject) => {
    ctx.save()
    ctx.translate(left, top)
    ctx.rotate(fabricObject.angle)
    ctx.font = '20px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText('✖', 0, 0)
    ctx.restore()
  },
})

const addAutoFill = (
  canvasList: CanvasProps[],
  canvas: Fabric.Canvas,
  text: string,
  x: number,
  y: number,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  const fabricText = new Fabric.Textbox('', {
    top: y,
    left: x,
    fontSize: 12,
    fill: 'rgb(0, 0, 0)',
    width: 200,
    minWidth: 20,
    backgroundColor: '#DBEAFE',
    elName: 'text',
    textAlign: 'center',
    createdBy: useUserStore.getState().user?.id,
  })
  fabricText.setControlsVisibility({ mt: false, mb: false })

  // const rect = new Fabric.Rect({
  //   top: y,
  //   left: x,
  //   width: 200,
  //   height: 40,
  //   fill: 'rgb(0, 0, 0)',
  //   borderColor: 'red',
  //   strokeWidth: 1,
  //   createdBy: useUserStore.getState().user?.id,
  // })
  // const group = new Fabric.Group([rect, fabricText], {
  //   left: x,
  //   top: y,
  //   angle: 0,
  //   width: 200,
  //   height: 20,
  //   selectable: true,
  // })
  canvasList.forEach((item) => {
    item.canvas.discardActiveObject()
    item.canvas.renderAll()
  })
  fabricText.controls.deleteIcon = deleteIcon
  canvas.add(fabricText)
  canvas.setActiveObject(fabricText)
  // group.controls.deleteIcon = deleteIcon
  // canvas.add(group)
  // canvas.setActiveObject(group)
  canvas.renderAll()

  setActiveButton(ActiveToolbarButton.Default)
}

const addField = (
  canvas: Fabric.Canvas,
  text: string,
  x: number,
  y: number,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  const fabricText = new Fabric.Textbox(text, {
    top: y,
    left: x,
    fontSize: 12,
    fill: 'rgb(0, 0, 0)',
    width: 200,
    minWidth: 20,
    backgroundColor: text ? '' : '#DBEAFE',
    borderRadius: '16px',
    textAlign: 'center',
    createdBy: useUserStore.getState().user?.id,
  })
  fabricText.setControlsVisibility({ mt: false, mb: false })
  fabricText.controls.deleteIcon = deleteIcon

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

const addImg = (
  canvas: Fabric.Canvas,
  url: string,
  x: number,
  y: number,
  isCheck?: boolean
) => {
  if (canvas) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = function () {
      // const scaleFactor = Math.max(200 / img.width, 96 / img.height)
      const fabricImg = new Fabric.Image(img, {
        top: y,
        left: x,
        width: img.width,
        height: img.height,
        originX: 'center',
        originY: 'center',
        scaleX: isCheck ? 0.05 : 1,
        scaleY: isCheck ? 0.05 : 1,
        createdBy: useUserStore.getState().user?.id,
      })
      const scaleFactor = Math.max(200 / fabricImg.width, 96 / fabricImg.height)
      fabricImg.scaleX = scaleFactor
      fabricImg.scaleY = scaleFactor
      fabricImg.setControlsVisibility({ mt: false, mb: false })
      fabricImg.controls.deleteIcon = deleteIcon
      canvas.add(fabricImg)
    }
    img.src = url
    canvas.renderAll()
  }
}

const deleteField = (
  canvas: Fabric.Canvas,
  setActiveButton: (button: ActiveToolbarButton) => void
) => {
  const activeObject = canvas.getActiveObject()
  if (activeObject) {
    canvas.remove(activeObject)
    canvas.renderAll()
    setActiveButton(ActiveToolbarButton.Default)
  }
}

const drawingCanvas = (canvasList: CanvasProps[]) => {
  canvasList.forEach((item) => {
    item.canvas.isDrawingMode = true
    item.canvas.freeDrawingBrush = new Fabric.PencilBrush(item.canvas)
  })
}

interface DataProps {
  [key: string]: any
}

const _data: DataProps = {
  nameTh: 'test name',
  major: 'test major',
}

const _jsonStr =
  '{"version":"6.0.0-beta9","objects":[{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test text","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":164,"top":99,"width":200,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0},{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test text","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":364,"top":99,"width":200,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0},{"fontSize":40,"fontWeight":"normal","fontFamily":"Times New Roman","fontStyle":"normal","lineHeight":1.16,"text":"test name","charSpacing":0,"textAlign":"left","styles":[],"path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline","underline":false,"overline":false,"linethrough":false,"textBackgroundColor":"","direction":"ltr","minWidth":20,"splitByGrapheme":false,"type":"Textbox","version":"6.0.0-beta9","originX":"left","originY":"top","left":164,"top":199,"width":155.4883,"height":45.2,"fill":"rgb(255, 0, 0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0}]}'

const initCanvas = (
  id: string,
  json: any,
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void,
  type: string,
  isEditable: boolean,
  user?: DataProps
) => {
  const newCanvas = new Fabric.Canvas(id)

  const originalToObject = newCanvas.toObject.bind(newCanvas)

  newCanvas.toObject = () => ({
    ...originalToObject(
      ['createdBy', 'elName'] // Add the custom property to the list of properties to include
    ),
  })

  // newCanvas.loadFromJSON(json, newCanvas.renderAll.bind(newCanvas))
  newCanvas.loadFromJSON(json).then(() => {
    newCanvas.forEachObject((obj: any) => {
      if (type === 'document-create') {
        if (obj?.elName && user && user[obj?.elName]) {
          obj.set({ text: user[obj?.elName] as string })
          // set background color to none
          obj.set({ backgroundColor: '' })
        }
      } else if (type === 'document-edit') {
        obj.set({ backgroundColor: '' })
      }

      // hide controls visible on y axis
      obj.setControlsVisibility({ mt: false, mb: false })
      // set delete icon
      obj.controls.deleteIcon = deleteIcon

      // set editable
      obj.set({
        editable: isEditable,
        selectable: isEditable,
        evented: isEditable,
      })
    })
    newCanvas.renderAll()
  })
  setCanvasList(id, newCanvas)
}

const mouseHandler = (
  canvasList: CanvasProps[],
  canvas: Fabric.Canvas,
  activeButton: ActiveToolbarButton,
  setActiveButton: (button: ActiveToolbarButton) => void,
  option?: any
) => {
  if (activeButton !== ActiveToolbarButton.Default || option?.isPreview) {
    canvas.forEachObject((obj: any) => {
      obj.set({ selectable: false })
      obj.set({ evented: false })
      obj.setControlsVisibility({ mt: false, mb: false })
    })
    canvas.discardActiveObject()
  } else {
    canvas.forEachObject((obj: any) => {
      if (
        obj.get('createdBy') === useUserStore.getState().user?.id ||
        option.isEditable
      ) {
        obj.set({ selectable: true })
        obj.set({ evented: true })
      }
      obj.setControlsVisibility({ mt: false, mb: false })
      obj.controls.deleteIcon = deleteIcon
    })
    canvas.isDrawingMode = false
  }

  // set fill color of all object to none if not have text inside
  canvas.forEachObject((obj: any) => {
    if (obj.text && !obj.elName) {
      obj.set({ backgroundColor: '' })
    }
  })

  switch (activeButton) {
    case ActiveToolbarButton.AutoFill:
      addAutoFill(
        canvasList,
        canvas,
        option.text,
        option.x,
        option.y,
        setActiveButton
      )
      break
    case ActiveToolbarButton.Text:
      addField(canvas, option.text, option.x, option.y, setActiveButton)
      break
    case ActiveToolbarButton.Pen:
      drawingCanvas(canvasList)
      break
    case ActiveToolbarButton.Date:
      addField(
        canvas,
        format(new Date(), 'dd MMM yyyy', {
          locale: th,
        }),
        option.x,
        option.y,
        setActiveButton
      )
      break
    case ActiveToolbarButton.Delete:
      deleteField(canvas, setActiveButton)
      break
    case ActiveToolbarButton.Correct:
      addImg(
        canvas,
        'https://www.pngall.com/wp-content/uploads/8/Check-Mark-PNG-File.png',
        option.x,
        option.y,
        true
      )
      break
    default:
      break
  }

  canvas.renderAll()
}

const setTextAlign = (canvasList: CanvasProps[], id: string, align: string) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()
  if (activeObject && canvas) {
    const updatedObject = activeObject.set({
      textAlign: align,
    })
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
    activeObject.set({
      fontWeight: activeObject.get('fontWeight') === 'bold' ? 'normal' : 'bold',
    })
    // setActiveObject(updatedObject) // Updating state with the new object
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
    const newObject = new Fabric.Textbox(activeObject.get('text') as string, {
      ...activeObject,
      fontStyle:
        activeObject.get('fontStyle') === 'italic' ? 'normal' : 'italic',
    })
    canvas.remove(activeObject)
    canvas.add(newObject)
    newObject.exitEditing()
    canvas.setActiveObject(newObject)
    canvas.renderAll()
  }
}

const setTextSpacing = (
  canvasList: CanvasProps[],
  id: string,
  spacing: number
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()
  if (activeObject && canvas) {
    const newObject = new Fabric.Textbox(activeObject.get('text') as string, {
      ...activeObject,
      charSpacing: spacing,
    })
    canvas.remove(activeObject)
    canvas.add(newObject)
    newObject.exitEditing()
    canvas.setActiveObject(newObject)
    canvas.renderAll()
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
    activeObject.set({ elName, text })
    canvas.renderAll()
  }
}

const setFontSize = (
  canvasList: CanvasProps[],
  id: string,
  fontSize: number
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const newObject = new Fabric.Textbox(activeObject.get('text') as string, {
      ...activeObject,
      fontSize,
    })
    canvas.remove(activeObject)
    canvas.add(newObject)
    newObject.exitEditing()
    canvas.setActiveObject(newObject)
    canvas.renderAll()
  }
}

const setFontFamily = (
  canvasList: CanvasProps[],
  id: string,
  fontFamily: string
) => {
  const canvas = canvasList.find((page) => page.id === id)?.canvas
  const activeObject = canvas?.getActiveObject()

  if (activeObject && canvas) {
    const newObject = new Fabric.Textbox(activeObject.get('text') as string, {
      ...activeObject,
      fontFamily,
    })
    canvas.remove(activeObject)
    canvas.add(newObject)
    newObject.exitEditing()
    canvas.setActiveObject(newObject)
    canvas.renderAll()
  }
}

const getJson = (canvasList: CanvasProps[]) => {
  const jsonList: any = []
  canvasList.forEach((item, index) => {
    const json = JSON.stringify(item.canvas.toJSON())
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
  addField,
  addImg,
  getJson,
  hexToRgb,
  initCanvas,
  mouseHandler,
  rgbToHex,
  setAutoFillType,
  setFontFamily,
  setFontSize,
  setTextAlign,
  setTextBold,
  setTextItalic,
  setTextSpacing,
}
