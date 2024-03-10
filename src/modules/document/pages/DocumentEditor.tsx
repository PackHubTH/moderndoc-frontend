import { useRef, useState } from 'react'
import { FaDownload, FaMousePointer } from 'react-icons/fa'
import { Document, Page } from 'react-pdf'

import exampleFile from '@/assets/example.pdf'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { useDrop } from 'react-dnd'
import { FaA } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'
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
            // onClick={() => saveCanvas(canvasList)}
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
      {/* DnD test */}

      {/* <div className="h-72 w-full bg-yellow-300" ref={dropRef}>
        {dropBox.map((item, index) => {
          return (
            <div key={index} className="p-4">
              <p>{item.text}</p>
            </div>
          )
        })}
        {isOver && <p>Drop Here</p>}
      </div> */}
    </div>
  )
}

export default DocumentEditor
