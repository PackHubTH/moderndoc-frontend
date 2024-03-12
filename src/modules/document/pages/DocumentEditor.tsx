import { useRef, useState } from 'react'
import { FaCheck, FaDownload, FaMousePointer, FaPenFancy } from 'react-icons/fa'
import { Document, Page } from 'react-pdf'

import exampleFile from '@/assets/example.pdf'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { PDFDocument } from 'pdf-lib'
import { useDrop } from 'react-dnd'
import { FaA } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'
import { MdOutlineDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import DocumentAccordion from '../components/DocumentAccordion'
import DocumentCanvas from '../components/DocumentCanvas'
import DocumentToolbar from '../components/DocumentToolbar'
import DraggableBox from '../components/DraggableBox'
import FinalizeModalContent from '../components/FinalizeModalContent'
import GuidelineModalContent from '../components/GuidelineModalContent'
import ProcessModalContent from '../components/ProcessModalContent'
import ProfileBox from '../components/ProfileBox'
import ToolbarButton from '../components/ToolbarButton'
import { useDocumentStore } from '../stores/documentStore'
import { DnDItem } from '../types/DocumentField'
import { ActiveToolbarButton as ButtonId } from '../types/ToolbarButton'
import { saveCanvas } from '../utils/documentEditorUtils'

const DocumentEditor = () => {
  const navigate = useNavigate()
  const {
    isOpen: isFinalizeModalOpen,
    open: openFinalizeModal,
    close: closeFinalizeModal,
  } = useDisclosure()
  const {
    isOpen: isGuidelineModalOpen,
    open: openGuidelineModal,
    close: closeGuidelineModal,
  } = useDisclosure()
  const {
    isOpen: isProcessModalOpen,
    open: openProcessModal,
    close: closeProcessModal,
  } = useDisclosure()
  const canvasRef = useRef<HTMLDivElement>(null)
  const pageTotal = useDocumentStore((state) => state.pageTotal)
  const canvasList = useDocumentStore((state) => state.canvasList)
  const setCanvasSize = useDocumentStore((state) => state.setCanvasSize)
  const setPageTotal = useDocumentStore((state) => state.setPageTotal)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageTotal(numPages)
  }

  const onPageLoadSuccess = (pageNumber: number) => {
    const pages = canvasRef.current?.children[0]
    if (pages)
      setCanvasSize(
        `${pageNumber - 1}`,
        pages.children[pageNumber - 1].clientHeight,
        pages.children[pageNumber - 1].clientWidth
      )
  }

  const user = {
    name: 'John Doe',
    email: 'a@a.com',
    timestamp: 1234567890,
  }

  const [dropBox, setDropBox] = useState<DnDItem[]>([])
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: 'box',

    drop: (item: DnDItem) => {
      console.log(item)
      setDropBox((dropBox) => [...dropBox, item])
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  //////////////////////////// modify pdf /////////////////////////////
  async function handlePDFUpload() {
    // Step 1: Retrieve the file from the input
    // const file = event.target.files[0];
    const file = exampleFile
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
    firstPage.drawText('This text was added with pdf-lib!', {
      x: 5,
      y: firstPage.getHeight() - 40,
      size: 12,
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

  // const pdfDoc = PDFDocument.load(existingPdfBytes)
  // console.log('pdfDoc', pdfDoc)

  return (
    <div>
      {/* Header */}
      <div className="flex h-[92px] items-center border-b-2 px-5 py-4">
        <img src="https://via.placeholder.com/150" alt="logo" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-600">
            ใบลงทะเบียนเพิ่ม-ลด-ถอน-เปลี่ยนกลุ่มเรียน
          </h1>
          <div className="flex h-7">
            <Button
              label="Guideline"
              leftIcon={<IoEyeOutline />}
              onClick={openGuidelineModal}
            />
          </div>
          <Modal
            actions={
              <Button
                label="ปิด"
                variant="gray"
                onClick={closeGuidelineModal}
              />
            }
            content={
              <GuidelineModalContent
                description="test"
                fileName="test.pdf"
                filePath="test"
              />
            }
            isOpen={isGuidelineModalOpen}
            title="รายละเอียดเอกสาร/ตัวอย่างเอกสาร"
            width="763px"
            onClose={closeGuidelineModal}
          />
        </div>
        <div className="space-x-3">
          <Button
            label="Download"
            leftIcon={<FaDownload />}
            onClick={() => saveCanvas(canvasList, exampleFile)}
          />
          <Button
            label="Finalize"
            variant="yellow"
            onClick={openFinalizeModal}
          />
          <Modal
            actions={
              <>
                <Button
                  label="ยกเลิก"
                  variant="gray"
                  onClick={closeFinalizeModal}
                />
                <Button label="ยืนยัน" variant="blue" />
              </>
            }
            content={<FinalizeModalContent />}
            isOpen={isFinalizeModalOpen}
            title="ยืนยันการเสร็จสิ้นดำเนินการเอกสาร"
            variant="confirm"
            width="515px"
            onClose={closeFinalizeModal}
          />
          <Button
            label="ดำเนินการ"
            variant="green"
            onClick={openProcessModal}
          />
          <Modal
            actions={
              <>
                <Button
                  label="ยกเลิก"
                  variant="gray"
                  onClick={closeProcessModal}
                />
                <Button label="ยืนยันการส่ง" variant="blue" />
              </>
            }
            content={<ProcessModalContent />}
            isOpen={isProcessModalOpen}
            title="ส่งเอกสาร"
            width="531px"
            onClose={closeProcessModal}
          />
          <Button label="ยกเลิก" variant="gray" onClick={() => navigate('/')} />
        </div>
      </div>
      {/*  */}
      {/* Main */}
      <div className="flex h-[calc(100vh-92px)]">
        <div className="w-3/4">
          <DocumentToolbar>
            <ToolbarButton icon={<FaMousePointer />} id={ButtonId.Default} />
            <ToolbarButton icon={<FaA />} id={ButtonId.Text} />
            <ToolbarButton icon={<FaPenFancy />} id={ButtonId.Pen} />
            <ToolbarButton
              icon={<MdOutlineDeleteForever />}
              id={ButtonId.Delete}
            />
            <ToolbarButton icon={<FaCheck />} id={ButtonId.Correct} />
          </DocumentToolbar>
          {/* canvas section */}
          <div
            className="flex h-[calc(100vh-122px)] justify-center overflow-auto bg-green-200"
            ref={canvasRef}
          >
            <Document
              file={exampleFile}
              // renderMode="svg"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.apply(null, Array(pageTotal))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <div key={page} className="relative">
                      <DocumentCanvas id={`${page - 1}`} />
                      <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={2}
                        width={400}
                        className="mt-2 border-black"
                        renderMode="svg"
                        onLoadSuccess={() => onPageLoadSuccess(page)}
                      />
                    </div>
                  )
                })}
            </Document>
          </div>
          {/*  */}
        </div>
        {/* sidebar */}
        <div
          className="hs-accordion-group w-1/4 overflow-y-auto"
          data-hs-accordion-always-open
        >
          <DocumentAccordion title={'ข้อมูลผู้สร้างเอกสาร'}>
            <ProfileBox {...user} />
            <div className="p-4">
              <p>TEST</p>
              <p>TEST</p>
              <p>TEST</p>
              <p>TEST</p>
              <p>TEST</p>
            </div>
          </DocumentAccordion>
          <DocumentAccordion title={'การแสดงความคิดเห็น'}>
            <ProfileBox {...user} />
            <p className="p-4">
              Lorem ipsum dolor sit amet consectetur. Enim vestibulum dolor
              libero purus habitant adipiscing tincidunt libero purus.
            </p>
          </DocumentAccordion>
          <DocumentAccordion title={'ลากข้อมูลลงหน้ากระดาษ'}>
            <div className="p-3">
              <p>ข้อมูลเบื้องต้น</p>
              <DraggableBox text="testtesttesttesttesttesttesttesttest testtesttesttesttest testtesttesttesttesttesttesttesttesttesttesttest" />
              <DraggableBox text=" testtesttesttesttest testtesttesttesttesttesttesttesttesttesttesttest" />
              <p>Date Stamp</p>
              <p>ลายเซ็นลงนาม</p>
            </div>
          </DocumentAccordion>
        </div>
      </div>
      {/*  */}
      {/* pdf lib test */}
      <button id="a" onClick={() => handlePDFUpload()}>
        TeSt
      </button>
    </div>
  )
}

export default DocumentEditor
