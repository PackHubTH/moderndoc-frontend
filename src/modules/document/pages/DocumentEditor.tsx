import { useEffect, useRef, useState } from 'react'
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
  FaRegCalendarAlt,
} from 'react-icons/fa'
import { Document, Page } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getJson,
  hexToRgb,
  rgbToHex,
  setFontFamily,
  setFontSize,
  setTextAlign,
  setTextBold,
  setTextItalic,
  setTextSpacing,
} from '../utils/documentEditorUtils'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import MainLogo from '@/components/MainLogo'
import RichTextInputDisplay from '@/components/RichTextInputDisplay'
import { useDisclosure } from '@/hooks/useDisclosure'
import useGetFile from '@/hooks/useGetFile'
import useGetTemplateById from '@/modules/template/hooks/api/useGetTemplateById'
import { useUserStore } from '@/stores/userStore'
import { BsDistributeHorizontal } from 'react-icons/bs'
import { FaA } from 'react-icons/fa6'
import { IoEyeOutline } from 'react-icons/io5'
import tw from 'twin.macro'
import ActionDocumentModal from '../components/ActionDocumentModal'
import ActionDraftDocumentModal from '../components/ActionDraftDocumentModal'
import CreateDocumentModal from '../components/CreateDocumentModal'
import DocumentAccordion from '../components/DocumentAccordion'
import DocumentCanvas from '../components/DocumentCanvas'
import DocumentToolbar from '../components/DocumentToolbar'
import GuidelineModal from '../components/GuidelineModal'
import ProfileBox from '../components/ProfileBox'
import ToolbarButton from '../components/ToolbarButton'
import ToolbarTextButton from '../components/ToolbarTextButton'
import useGetDocumentById from '../hooks/api/useGetDocumentById'
import { useDocumentStore } from '../stores/documentStore'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'
import { ActiveToolbarButton as ButtonId } from '../types/ToolbarButton'
import { DocumentStatus } from '../types/types'
import { convertCanvasToPdf } from '../utils/downloadUtils'

type PropsType = {
  type: 'create' | 'edit' | 'document-view'
}

const DocumentEditor = ({ type }: PropsType) => {
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
  const navigate = useNavigate()
  const user = useUserStore((state) => state.user)
  const canvasRef = useRef<HTMLDivElement>(null)

  const { documentId = '', templateId = '' } = useParams()
  const { data: documentData } = useGetDocumentById(documentId)
  const { data: templateData } = useGetTemplateById(templateId)
  const { data: file, refetch: refetchFile } = useGetFile(
    (documentData?.data?.templateFile || templateData?.data?.templateFile) ?? ''
  )

  const [documentScale, setDocumentScale] = useState(1)

  useEffect(() => {
    if (!file) refetchFile()
  }, [documentData, templateData])

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
          {type !== 'document-view' && (
            <>
              <Button
                label="Download"
                leftIcon={<FaDownload />}
                onClick={() =>
                  convertCanvasToPdf(
                    file?.data ?? '',
                    Array.from({ length: pageTotal }, (v, k) => k.toString())
                  )
                }
              />
              <Button
                label="ดำเนินการ"
                variant="green"
                onClick={openProcessModal}
              />
            </>
          )}
          {type === 'create' ? (
            <CreateDocumentModal
              departmentId={templateData?.data?.departmentId ?? ''}
              isOpen={isProcessModalOpen}
              suggestOperators={templateData?.data?.operators ?? []}
              templateId={templateId}
              close={closeProcessModal}
            />
          ) : documentData?.data?.status === DocumentStatus.DRAFT ? (
            <ActionDraftDocumentModal
              isOpen={isProcessModalOpen}
              documentId={documentId}
              suggestOperators={[]}
              close={closeProcessModal}
            />
          ) : (
            <ActionDocumentModal
              isOpen={isProcessModalOpen}
              createdById={documentData?.data?.createdBy ?? ''}
              createdByName={documentData?.data?.userCreated.nameTh ?? ''}
              documentId={documentId}
              operatorId={documentData?.data?.operatorId ?? ''}
              operatorName={documentData?.data?.operator?.nameTh ?? ''}
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
      {type !== 'document-view' && (
        <DocumentToolbar isEdit={type === 'edit'}>
          <ToolbarButton icon={<FaA />} id={ButtonId.Text} label="Text" />
          <div className="hs-dropdown relative inline-flex">
            <div id="hs-dropdown-custom-icon-trigger">
              <ToolbarButton
                icon={<FaPenFancy />}
                id={ButtonId.Pen}
                label="Sign"
                onClick={() => console.log('test')}
              />
            </div>
            <div
              className="hs-dropdown-menu duration min-w-60 z-20 mt-2 hidden rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:border dark:border-neutral-700 dark:bg-neutral-800"
              aria-labelledby="hs-dropdown-custom-icon-trigger"
            >
              <div className="rounded-md border-b p-2">
                <img src="https://via.placeholder.com/200x50" alt="test" />
              </div>
              <div className="rounded-md border-b p-2">
                <img src="https://via.placeholder.com/200x50" alt="test" />
              </div>
              <div className="rounded-md border-b p-2">
                <img src="https://via.placeholder.com/200x50" alt="test" />
              </div>
            </div>
          </div>
          <ToolbarButton
            icon={<FaRegCalendarAlt />}
            id={ButtonId.Date}
            label="Date"
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
          {activeObject && activeObject.fontSize ? (
            <div className="ms-8 space-x-2">
              <Dropdown
                label={activeObject?.fontSize?.toString() ?? '16'}
                dropdownSection={[
                  {
                    lists: [8, 12, 16, 20, 24, 48, 72].map((size) => ({
                      displayText: size,
                      onClick: () =>
                        setFontSize(canvasList, activeCanvasId, size),
                    })),
                  },
                ]}
              />
              <Dropdown
                label={activeObject?.fontFamily ?? 'Arial'}
                dropdownSection={[
                  {
                    lists: [
                      'Arial',
                      'Courier New',
                      'Tahoma',
                      'Times New Roman',
                    ].map((font) => ({
                      displayText: font,
                      onClick: () =>
                        setFontFamily(canvasList, activeCanvasId, font),
                    })),
                  },
                ]}
              />
              <input
                type="color"
                value={rgbToHex(activeObject?.fill)}
                onChange={(e) => {
                  activeObject?.set('fill', hexToRgb(e.target.value))
                  canvasList
                    .find((page) => page.id === activeCanvasId)
                    ?.canvas?.renderAll()
                }}
              />
              <ToolbarTextButton
                icon={<FaBold />}
                name="fontWeight"
                value="bold"
                onClick={() =>
                  setTextBold(canvasList, activeCanvasId, setActiveObject)
                }
              />
              <ToolbarTextButton
                icon={<FaItalic />}
                name="fontStyle"
                value="italic"
                onClick={() =>
                  setTextItalic(canvasList, activeCanvasId, setActiveObject)
                }
              />
              <ToolbarTextButton
                icon={<FaAlignLeft />}
                name="textAlign"
                value="left"
                onClick={() => setTextAlign(canvasList, activeCanvasId, 'left')}
              />
              <ToolbarTextButton
                icon={<FaAlignJustify />}
                name="textAlign"
                value="center"
                onClick={() =>
                  setTextAlign(canvasList, activeCanvasId, 'center')
                }
              />
              <ToolbarTextButton
                icon={<FaAlignRight />}
                name="textAlign"
                value="right"
                onClick={() =>
                  setTextAlign(canvasList, activeCanvasId, 'right')
                }
              />
              <div className="inline-flex items-center gap-2">
                <BsDistributeHorizontal />
                <span>{activeObject?.charSpacing / 100} px</span>
                <input
                  type="range"
                  defaultValue={activeObject?.charSpacing ?? 0}
                  onChange={(e) => {
                    setTextSpacing(
                      canvasList,
                      activeCanvasId,
                      Number(e.target.value) * 10
                    )
                    setActiveObject({
                      ...activeObject,
                      charSpacing: Number(e.target.value) * 10,
                    })
                  }}
                />
              </div>
            </div>
          ) : null}
        </DocumentToolbar>
      )}
      <div className="flex h-[calc(100vh-140px)]">
        {/* <div className="p-4">
          <Document file={file?.data}>
            {Array.apply(null, Array(pageTotal))
              .map((x, i) => i + 1)
              .map((page) => {
                return (
                  <div className="relative">
                    <span className="absolute z-10 bg-blue-500 px-4 py-2 text-white">
                      {page}
                    </span>
                    <Page
                      pageNumber={page}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      scale={1}
                      width={200}
                      onLoadSuccess={() => onPageLoadSuccess(page)}
                    />
                  </div>
                )
              })}
          </Document>
        </div> */}
        <div css={[type === 'edit' ? tw`w-3/4` : tw`w-full`, tw`relative`]}>
          {/* canvas section */}
          {/* <div className="absolute bottom-16 right-8 z-20">
            <Button
              label="+"
              onClick={() => setDocumentScale((prev) => prev + 0.5)}
            />
          </div>
          <div className="absolute bottom-4 right-8 z-20">
            <Button
              label="--"
              onClick={() => setDocumentScale((prev) => prev - 0.5)}
            />
          </div> */}
          <div
            className="flex h-[calc(100vh-140px)] justify-center overflow-auto bg-[#f1f2f5]"
            ref={canvasRef}
          >
            <Document file={file?.data} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.apply(null, Array(pageTotal))
                .map((x, i) => i + 1)
                .map((page) => {
                  return (
                    <div key={page} className="relative">
                      <DocumentCanvas
                        id={`${page - 1}`}
                        element={
                          documentData?.data?.element?.data[page - 1] ||
                          templateData?.data?.element?.data[page - 1]
                        }
                        type={
                          type === 'edit' ? 'document-edit' : 'document-create'
                        }
                        isEditable={
                          (user.id === documentData?.data?.createdBy ||
                            (documentData?.data?.documentSents.find(
                              (sent: any) =>
                                sent.receiverId === user.id && sent.editable
                            )
                              ? true
                              : false)) &&
                          type !== 'document-view'
                        }
                      />
                      <Page
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        scale={documentScale}
                        className="my-2 border-black"
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
              <div className="px-4">
                <ProfileBox
                  name={documentData?.data?.userCreated.nameTh ?? ''}
                  email={
                    documentData?.data?.userCreated.emails[
                      documentData?.data?.userCreated.defaultEmailIndex
                    ] ?? ''
                  }
                  profileImg={documentData?.data?.userCreated.profileImg ?? ''}
                />
                <p>
                  รหัสนักศึกษา :{' '}
                  {documentData?.data?.userCreated?.student?.studentNumber}
                </p>
                <p>คณะ : -</p>
                <p>ภาควิชา : -</p>
                <p>อาจารย์ที่ปรึกษา : -</p>
                <p>โทรศัพท์ : {documentData?.data?.userCreated.phones[0]}</p>
              </div>
            </DocumentAccordion>
            <DocumentAccordion title={'การแสดงความคิดเห็น'}>
              {documentData &&
                documentData?.data?.documentTimelines.map(
                  (timeline: any, index) => (
                    <div className="px-4">
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
                      <div className="mb-2 p-2">
                        <RichTextInputDisplay value={timeline.message} />
                      </div>
                    </div>
                  )
                )}
            </DocumentAccordion>
          </div>
        )}
      </div>
    </div>
  )
}
export default DocumentEditor
