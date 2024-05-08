import { PDFDocument } from 'pdf-lib'

//////////////////////////// modify pdf /////////////////////////////
const downloadFile = async (file: string, element: any) => {
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

  element.forEach((el: any, index: number) => {
    const jsonObject = JSON.parse(el)
    const objects = jsonObject.objects
    console.log('page', pages[index].getHeight(), pages[index].getWidth())

    objects.forEach((obj: any) => {
      if (obj.text) {
        console.log(
          obj.text,
          obj.left,
          obj.top,
          pages[index].getWidth(),
          pages[index].getHeight()
        )
        pages[index].drawText('This text was added with pdf-lib!', {
          x: obj.left,
          //   y: pages[index].getHeight() - 40,
          size: obj.fontSize,
        })
      }
    })
  })
  // Modify your PDF here
  //   firstPage.drawText('This text was added with pdf-lib!', {
  //     x: 5,
  //     y: firstPage.getHeight() - 40,
  //     size: 12,
  //   })

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

export { downloadFile }
