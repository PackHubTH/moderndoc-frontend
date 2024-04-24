import {
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCheck,
  FaDownload,
  FaItalic,
  FaMousePointer,
  FaPenFancy,
} from 'react-icons/fa'
import { Document, Page } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getJson,
  hexToRgb,
  rgbToHex,
  saveCanvas,
  setTextAlign,
  setTextBold,
  setTextItalic,
} from '../utils/documentEditorUtils'

import exampleFile from '@/assets/FO-TO-44.pdf'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import MainLogo from '@/components/MainLogo'
import { useDisclosure } from '@/hooks/useDisclosure'
import useGetTemplateById from '@/modules/template/hooks/api/useGetTemplateById'
import { useUserStore } from '@/stores/userStore'
import { PDFDocument } from 'pdf-lib'
import { useRef } from 'react'
import { FaA } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'
import tw from 'twin.macro'
import ActionDocumentModal from '../components/ActionDocumentModal'
import CreateDocumentModal from '../components/CreateDocumentModal'
import DocumentAccordion from '../components/DocumentAccordion'
import DocumentCanvas from '../components/DocumentCanvas'
import DocumentToolbar from '../components/DocumentToolbar'
import GuidelineModal from '../components/GuidelineModal'
import ProfileBox from '../components/ProfileBox'
import ToolbarButton from '../components/ToolbarButton'
import useGetDocumentById from '../hooks/api/useGetDocumentById'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { ActiveToolbarButton as ButtonId } from '../types/ToolbarButton'

type PropsType = {
  type: 'create' | 'edit'
}

const DocumentEditor = ({ type }: PropsType) => {
  const navigate = useNavigate()
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
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const activeCanvasId = useDocumentToolbarStore(
    (state) => state.activeCanvasId
  )
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )

  const { documentId = '', templateId = '' } = useParams()
  // TODO: useGetTemplateById
  const { data: documentData } = useGetDocumentById(documentId)
  const { data: templateData } = useGetTemplateById(templateId)
  const user = useUserStore((state) => state.user)
  console.log('data', templateId, documentId, documentData)

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    console.log('numPages', numPages)
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
  console.log(
    'file',
    documentData?.data?.templateFile || templateData?.data?.templateFile
  )
  return (
    <div>
      {/* Header */}
      <div className="flex h-[92px] items-center gap-8 border-b-2 px-5 py-4">
        <MainLogo />
        <div className="flex-1 space-y-2">
          <h1 className="text-xl font-semibold text-gray-600">
            {documentData?.data?.title || templateData?.data?.title || ''}
          </h1>
          <div className="flex h-7 gap-4">
            <Button
              label="Guideline"
              leftIcon={<IoEyeOutline />}
              onClick={openGuidelineModal}
            />
            {documentData?.data?.documentSents.find(
              (sent: any) => sent.receiverId === user.id && sent.editable
            ) && <Badge label="ได้รับสิทธิ์แก้ไขได้" variant="success" />}
          </div>
          <GuidelineModal
            description={
              documentData?.data?.description ||
              templateData?.data?.description ||
              '-'
            }
            fileName={
              documentData?.data?.title || templateData?.data?.title || '-'
            }
            filePath={
              documentData?.data?.exampleFile ||
              templateData?.data?.exampleFile ||
              ''
            }
            isOpen={isGuidelineModalOpen}
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
            label="ดำเนินการ"
            variant="green"
            onClick={openProcessModal}
          />
          {type === 'create' ? (
            <CreateDocumentModal
              departmentId={templateData?.data?.departmentId ?? ''}
              isOpen={isProcessModalOpen}
              suggestOperators={templateData?.data?.operators ?? []}
              templateId={templateId}
              close={closeProcessModal}
            />
          ) : (
            <ActionDocumentModal
              isOpen={isProcessModalOpen}
              createdById={documentData?.data?.createdBy ?? ''}
              createdByName={documentData?.data?.userCreated.nameTh ?? ''}
              documentId={documentId}
              // departmentId={documentData?.data?.departmentId ?? ''}
              close={closeProcessModal}
            />
          )}
          <Button
            label="ยกเลิก"
            variant="gray"
            onClick={() => navigate('/document-management')}
          />
        </div>
      </div>
      {/*  */}
      {/* Main */}
      <div className="flex h-[calc(100vh-92px)]">
        <div css={[type === 'edit' ? tw`w-3/4` : tw`w-full`]}>
          <DocumentToolbar>
            <ToolbarButton icon={<FaA />} id={ButtonId.Text} label="Text" />
            <ToolbarButton
              icon={<FaPenFancy />}
              id={ButtonId.Pen}
              label="Sign"
            />
            <ToolbarButton
              icon={<FaCheck />}
              id={ButtonId.Correct}
              label="Check"
            />
            <ToolbarButton
              onClick={() => console.log(getJson(canvasList))}
              icon={<FaMousePointer />}
              id={ButtonId.Default}
              label="Select"
            />
            {activeObject ? (
              <>
                <Dropdown
                  label={activeObject?.fontSize.toString() ?? '16'}
                  dropdownSection={[
                    {
                      lists: [
                        {
                          displayText: '14',
                          onClick: () => {
                            activeObject?.set('fontSize', 14)
                            canvasList
                              .find((page) => page.id === activeCanvasId)
                              ?.canvas?.renderAll()
                          },
                        },
                        {
                          displayText: '16',
                          onClick: () => {
                            activeObject?.set('fontSize', 16)
                            canvasList
                              .find((page) => page.id === activeCanvasId)
                              ?.canvas?.renderAll()
                          },
                        },
                      ],
                    },
                  ]}
                />
                <Dropdown
                  label={activeObject?.fontFamily ?? 'Arial'}
                  dropdownSection={[
                    {
                      lists: [
                        { displayText: '14' },
                        {
                          displayText: '16',
                        },
                      ],
                    },
                  ]}
                />
                <ToolbarButton
                  icon={<FaAlignLeft />}
                  id={ButtonId.TextAlignLeft}
                  selected={activeObject?.textAlign === 'left'}
                  onClick={() =>
                    setTextAlign(
                      canvasList,
                      activeCanvasId,
                      'left',
                      setActiveObject
                    )
                  }
                />
                <ToolbarButton
                  icon={<FaAlignJustify />}
                  id={ButtonId.TextAlignCenter}
                  selected={activeObject?.textAlign === 'center'}
                  onClick={() => {
                    setTextAlign(
                      canvasList,
                      activeCanvasId,
                      'center',
                      setActiveObject
                    )
                  }}
                />
                <ToolbarButton
                  icon={<FaAlignRight />}
                  id={ButtonId.TextAlignRight}
                  selected={activeObject?.textAlign === 'right'}
                  onClick={() =>
                    setTextAlign(
                      canvasList,
                      activeCanvasId,
                      'right',
                      setActiveObject
                    )
                  }
                />
                <ToolbarButton
                  icon={<FaBold />}
                  id={ButtonId.Bold}
                  selected={activeObject?.fontWeight === 'bold'}
                  onClick={() =>
                    setTextBold(canvasList, activeCanvasId, setActiveObject)
                  }
                />
                <ToolbarButton
                  icon={<FaItalic />}
                  id={ButtonId.Italic}
                  selected={activeObject?.fontStyle === 'italic'}
                  onClick={() =>
                    setTextItalic(canvasList, activeCanvasId, setActiveObject)
                  }
                />
                <input
                  type="color"
                  value={rgbToHex(activeObject?.fill)}
                  onChange={(e) => {
                    console.log('color', e.target.value)
                    activeObject?.set('fill', hexToRgb(e.target.value))
                    canvasList
                      .find((page) => page.id === activeCanvasId)
                      ?.canvas?.renderAll()
                  }}
                />
              </>
            ) : null}
          </DocumentToolbar>
          {/* canvas section */}
          <div
            className="flex h-[calc(100vh-122px)] justify-center overflow-auto bg-[#f1f2f5]"
            ref={canvasRef}
          >
            <Document
              file={
                exampleFile
                // documentData?.data?.templateFile ||
                // templateData?.data?.templateFile
              }
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.apply(null, Array(pageTotal))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <div key={page} className="relative">
                      <DocumentCanvas
                        id={`${page - 1}`}
                        element={documentData?.data?.element}
                      />
                      <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={2}
                        width={400}
                        className="mt-2 border-black"
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
        {type === 'edit' && (
          <div
            className="hs-accordion-group w-1/4 overflow-y-auto"
            data-hs-accordion-always-open
          >
            <DocumentAccordion title={'ข้อมูลผู้สร้างเอกสาร'}>
              <ProfileBox
                name={documentData?.data?.userCreated.nameTh ?? ''}
                email={
                  documentData?.data?.userCreated.emails[
                    documentData?.data?.userCreated.defaultEmailIndex
                  ] ?? ''
                }
                profileImg={documentData?.data?.userCreated.profileImg ?? ''}
              />
              <div className="p-4">
                <p>{documentData?.data?.userCreated.phones[0]}</p>
                <p>TEST</p>
                <p>TEST</p>
                <p>TEST</p>
                <p>TEST</p>
              </div>
            </DocumentAccordion>
            <DocumentAccordion title={'การแสดงความคิดเห็น'}>
              {documentData &&
                documentData?.data?.documentTimelines.map(
                  (timeline: any, index) => (
                    <div>
                      <ProfileBox
                        name={timeline.userUpdatedBy.nameTh}
                        email={
                          timeline.userUpdatedBy.emails[
                            timeline.userUpdatedBy.defaultEmailIndex
                          ]
                        }
                        profileImg={timeline.userUpdatedBy.profileImg}
                        timestamp={timeline.createdAt}
                      />
                      <p className="mb-2 p-2 px-4">{timeline.message}</p>
                    </div>
                  )
                )}
            </DocumentAccordion>
          </div>
        )}
      </div>
      {/*  */}
      {/* pdf lib test */}
      {/* <button id="a" onClick={() => handlePDFUpload()}>
        TeSt
      </button> */}
    </div>
  )
}
export default DocumentEditor
