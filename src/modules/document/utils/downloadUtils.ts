import { getFilename } from '@/utils/fileUtils'
import { PDFDocument } from 'pdf-lib'

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
    const ctx = canvas.getContext('2d')

    if (ctx) {
      // Get the image data from the canvas
      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let data = imgData.data

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

    const dataUrl = canvas.toDataURL()

    const img = await pdfDoc.embedPng(dataUrl)
    const imgDims = img.scale(1)
    page.drawImage(img, {
      x: 0,
      y: 0,
      width: imgDims.width,
      height: imgDims.height,
    })
  }

  // Download the PDF
  const pdfBytes = await pdfDoc.save()
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = getFilename(file)
  link.click()
}

export { convertCanvasToPdf }
