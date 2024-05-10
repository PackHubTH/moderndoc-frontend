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
    const dataUrl = canvas.toDataURL()

    const img = await pdfDoc.embedPng(dataUrl)
    const imgDims = img.scale(0.8)
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
