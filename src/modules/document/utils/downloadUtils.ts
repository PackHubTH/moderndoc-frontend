import { getFilename } from '@/utils/fileUtils'
import fontkit from '@pdf-lib/fontkit'
import { PDFDocument } from 'pdf-lib'

const embedElementToPdf = async (file: string, element: any) => {
  const arrayBuffer = await fetch(file).then((res) => {
    if (res.ok) return res.arrayBuffer()
    throw new Error('Failed to fetch PDF.')
  })
  const pdfDoc = await PDFDocument.load(arrayBuffer)
  // const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)
  const thaiFontBytes = await fetch(
    'https://script-app.github.io/font/THSarabunNew.ttf'
  ).then((res) => res.arrayBuffer())
  const customFont = await pdfDoc.embedFont(thaiFontBytes)

  // const page = pdfDoc.addPage()
  // const page = pdfDoc.getPages()[0]
  // const { width, height } = page.getSize()
  // const fontSize = 30
  // page.drawText('สวัสดีงับเตง', {
  //   x: 50,
  //   y: height - 4 * fontSize,
  //   size: fontSize,
  //   font: customFont,
  //   color: rgb(0, 0.53, 0.71),
  // })
  element.forEach((el: any, index: number) => {
    const obj = JSON.parse(el)
    const page = pdfDoc.getPages()[index]

    console.log('page size', page.getSize())
    if (page) {
      obj.objects.forEach(async (o: any) => {
        console.log('drawtext on page', o.text, o.left, o.top, o.fontSize)
        page.drawText(o.text, {
          x: page.getSize().width - o.left,
          y: page.getSize().height - o.top,
          size: o.fontSize * o.scaleX,
          font: customFont,
        })
      })
    }
  })

  // element?.forEach((el: any, index: number) => {
  //   const obj = JSON.parse(el)

  //   console.log('start index', index)
  //   obj.objects.forEach(async (o: any) => {
  //     const page = pdfDoc.getPages()[index]
  //     // const font = await pdfDoc.embedFont('THSarabunNew', {
  //     //   subset: true,
  //     //   features: { liga: false },
  //     // })

  //     const fontSize = o.fontSize
  //     // const textWidth = font.widthOfTextAtSize(o.text, fontSize)

  //     console.log(
  //       'drawtext on page',
  //       o.text,
  //       o.left,
  //       o.top,
  //       fontSize
  //       // textWidth
  //     )

  //     if (page) {
  //       // page.drawText(o.text, {
  //       //   x: o.left,
  //       //   y: o.top,
  //       //   size: fontSize,
  //       //   font: font,
  //       // })
  //       const { width, height } = page.getSize()

  //       page.drawText('This text was added with JavaScript!', {
  //         x: 5,
  //         y: height / 2,
  //         size: 50,
  //         font: customFont,
  //         color: rgb(0.95, 0.1, 0.1),
  //       })
  //     }
  //   })
  // })

  // convert json to object
  // element?.forEach((el: any, index: number) => {
  //   // convert el to object
  //   const obj = JSON.parse(el)
  //   console.log('objparse', obj, index)

  //   obj.objects.forEach((o: any) => {})
  // })

  // for (const page of pdfDoc.getPages()) {
  //   const { width, height } = page.getSize()

  //   const fontSize = 12
  //   const text = JSON.stringify(json, null, 2)
  //   const font = await pdfDoc.embedFont('Helvetica')
  //   const textWidth = font.widthOfTextAtSize(text, fontSize)

  //   page.drawText(text, {
  //     x: width / 2 - textWidth / 2,
  //     y: height / 2,
  //     size: fontSize,
  //   })
  // }

  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = getFilename(file)
  link.click()
}

const convertCanvasToPdf = async (file: string, ids: string[]) => {
  // Use file as the base pdf
  const arrayBuffer = await fetch(file).then((res) => {
    if (res.ok) return res.arrayBuffer()
    throw new Error('Failed to fetch PDF.')
  })
  const pdfDoc = await PDFDocument.load(arrayBuffer)

  for (const id of ids) {
    const page = pdfDoc.getPages()[Number(id)]
    const canvas = document.getElementById(id) as HTMLCanvasElement

    if (!canvas) {
      console.error(`Canvas with id ${id} not found`)
      continue
    }

    // Log page size and canvas size
    console.log('page', page.getSize())
    console.log('canvas', canvas.width, canvas.height)

    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Get the image data from the canvas
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imgData.data

      // Modify the contrast of the image
      const contrast = 1.5 // Adjust this value to set contrast level
      const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))

      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128 // Red
        data[i + 1] = factor * (data[i + 1] - 128) + 128 // Green
        data[i + 2] = factor * (data[i + 2] - 128) + 128 // Blue
      }

      // Put the modified image data back to the canvas
      ctx.putImageData(imgData, 0, 0)
    }

    // Create a temporary high-resolution canvas
    const { width: pageWidth, height: pageHeight } = page.getSize()
    const scaleFactor = 2 // Adjust this scale factor as needed
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = pageWidth * scaleFactor
    tempCanvas.height = pageHeight * scaleFactor
    const tempCtx = tempCanvas.getContext('2d')

    if (tempCtx) {
      // Draw the existing canvas content onto the high-resolution canvas
      tempCtx.drawImage(canvas, 0, 0, tempCanvas.width, tempCanvas.height)

      // Get the data URL of the high-resolution canvas
      const dataUrl = tempCanvas.toDataURL()

      const img = await pdfDoc.embedPng(dataUrl)

      page.drawImage(img, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      })
    }
  }

  // Download the PDF
  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = getFilename(file)
  link.click()
}

export { convertCanvasToPdf, embedElementToPdf }
