import {
  getJson,
  hexToRgb,
  rgbToHex,
  setAutoFillType,
  setFontFamily,
  setFontSize,
  setTextAlign,
  setTextBold,
  setTextItalic,
  setTextSpacing,
} from '@/modules/document/utils/documentEditorUtils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaMousePointer, FaRegCalendarAlt } from 'react-icons/fa'
import {
  FaA,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCheck,
  FaFileSignature,
  FaItalic,
  FaPenFancy,
  FaPlus,
} from 'react-icons/fa6'
import { Document, Page } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'

import mock_signature_1 from '@/assets/mock_signature_1.png'
import mock_signature_2 from '@/assets/mock_signature_2.png'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import MainLogo from '@/components/MainLogo'
import { useDisclosure } from '@/hooks/useDisclosure'
import DocumentAccordion from '@/modules/document/components/DocumentAccordion'
import DocumentCanvas from '@/modules/document/components/DocumentCanvas'
import DocumentToolbar from '@/modules/document/components/DocumentToolbar'
import ToolbarButton from '@/modules/document/components/ToolbarButton'
import ToolbarTextButton from '@/modules/document/components/ToolbarTextButton'
import { useDocumentStore } from '@/modules/document/stores/documentStore'
import { useDocumentToolbarStore } from '@/modules/document/stores/documentToolbarStore'
import { ActiveToolbarButton as ButtonId } from '@/modules/document/types/ToolbarButton'
import { useTemplateStore } from '@/stores/templateStore'
import { BsDistributeHorizontal } from 'react-icons/bs'
import tw from 'twin.macro'
import useGetFile from '../../../hooks/useGetFile'
import PreviewButton from '../components/PreviewButton'
import TemplateInfoModal from '../components/TemplateInfoModal'
import useGetTemplateById from '../hooks/api/useGetTemplateById'

const autoFillData = [
  { label: 'ชื่อ-นามสกุล', value: 'name' },
  { label: 'ระดับการศึกษา', value: 'educationLevel' },
  { label: 'คณะ', value: 'faculty' },
  { label: 'ภาค/สาขาวิชา', value: 'major' },
  { label: 'หลักสูตร', value: 'course' },
  { label: 'รหัสนักศึกษา', value: 'studentNumber' },
  { label: 'เบอร์โทรศัพท์', value: 'phone' },
  { label: 'E-mail', value: 'email' },
  { label: 'อาจารย์ที่ปรึกษา', value: 'teacher' },
]

interface TemplateEditorProps {
  type: 'create' | 'edit'
}

const TemplateEditor = ({ type }: TemplateEditorProps) => {
  const { isOpen, open, close } = useDisclosure()
  const navigate = useNavigate()
  const { templateId = '' } = useParams()
  const canvasRef = useRef<HTMLDivElement>(null)
  const canvasList = useDocumentStore((state) => state.canvasList)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const setCanvasSize = useDocumentStore((state) => state.setCanvasSize)
  const templateFileCreate = useTemplateStore((state) => state.templateFile)
  const { data: templateEdit } = useGetTemplateById(templateId)
  const { data: templateFileEdit, refetch: refetchTemplateEditFile } =
    useGetFile(templateEdit?.data?.templateFile ?? '')
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const activeCanvasId = useDocumentToolbarStore(
    (state) => state.activeCanvasId
  )
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )
  const [pageTotal, setPageTotal] = useState(0)

  useEffect(() => {
    if (templateEdit && type === 'edit') {
      refetchTemplateEditFile()
    }
  }, [templateEdit, type, refetchTemplateEditFile])

  const templateFile = useMemo(
    () =>
      type === 'create' ? templateFileCreate : templateFileEdit?.data ?? '',
    [templateFileCreate, type, templateFileEdit]
  )

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

  console.log('editor active object', activeObject?.elName)
  console.log('templateFile', templateFile)
  console.log('templateedit data', templateEdit?.data)
  console.log('ratio', window.devicePixelRatio)
  return (
    <div>
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b-2 p-5">
        <TemplateInfoModal
          templateData={templateEdit?.data}
          isOpen={isOpen}
          type={type}
          close={close}
        />
        <div className="flex items-center gap-8">
          <MainLogo />
          <h1 className="text-xl font-bold text-gray-600">
            {type === 'create'
              ? 'การสร้างเอกสารต้นฉบับ (Template)'
              : templateEdit?.data?.title}
          </h1>
        </div>
        <div className="flex gap-4">
          <PreviewButton />
          <Button
            disabled={templateFile ? false : true}
            label={
              type === 'create'
                ? 'ตั้งค่า Template'
                : 'ตั้งค่ารายละเอียดเอกสารต้นฉบับ'
            }
            variant="green"
            onClick={open}
          />
          <Button
            label="ยกเลิก"
            variant="gray"
            onClick={() => navigate('/template-management')}
          />
        </div>
      </div>
      {/* Toolbar */}
      {/* <ToolBarButtonGroup /> */}
      <div className="flex h-[calc(100vh-92px)]">
        <div css={[activeObject ? tw`w-3/4` : tw`w-full`]}>
          <DocumentToolbar>
            <ToolbarButton
              icon={<FaFileSignature />}
              id={ButtonId.AutoFill}
              label="Create Autofill"
            />
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
                <div className="m-2 flex justify-center rounded-md border-2">
                  <img
                    src={mock_signature_1}
                    alt="sig-1"
                    className="max-h-[96px]"
                  />
                </div>
                <div className="m-2 flex justify-center rounded-md border-2">
                  <img
                    src={mock_signature_2}
                    alt="sig-2"
                    className="max-h-[96px]"
                  />
                </div>
                <div className="m-2 flex justify-center rounded-md border-4 border-dashed p-2 text-blue-500">
                  <FaPlus size={32} />
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
                  onClick={() =>
                    setTextAlign(canvasList, activeCanvasId, 'left')
                  }
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
          {/* </div> */}
          {/* Content */}
          <div
            className="flex h-[calc(100vh-128px)] justify-center overflow-auto bg-gray-100"
            ref={canvasRef}
          >
            {templateFile && (
              <Document
                // file={templateFile}
                file={templateFile}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array?.apply(null, Array(pageTotal))
                  ?.map((x, i) => i + 1)
                  ?.map((page) => {
                    return (
                      <div key={page} className="relative">
                        <DocumentCanvas
                          id={`${page - 1}`}
                          element={
                            type === 'edit' &&
                            templateEdit?.data?.element?.data[page - 1]
                              ? templateEdit?.data?.element?.data[page - 1]
                              : undefined
                          }
                          type="template"
                        />
                        <Page
                          pageNumber={page}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          // scale={window.devicePixelRatio}
                          scale={1}
                          className="my-2 border-black"
                          onLoadSuccess={() => onPageLoadSuccess(page)}
                        />
                      </div>
                    )
                  })}
              </Document>
            )}
          </div>
        </div>
        {/* sidebar */}
        {activeObject && (
          <div
            className="hs-accordion-group w-1/4 overflow-y-auto"
            data-hs-accordion-always-open
          >
            <DocumentAccordion title="ตั้งค่า Form Field">
              <div className="p-4">
                <h1 className="font-semibold">ประเภท (Type)</h1>
                <Dropdown
                  label={
                    autoFillData.find(
                      (data) => data.value === activeObject?.elName
                    )?.label
                      ? 'Auto fill จากข้อมูลที่มีอยู่ในระบบ'
                      : 'Text (พิมพ์อิสระ)'
                  }
                  dropdownSection={[
                    {
                      lists: [
                        {
                          displayText: 'Auto fill จากข้อมูลที่มีอยู่ในระบบ',
                          onClick: () => {
                            setActiveObject({
                              ...activeObject,
                              elName: 'name',
                              text: 'ชื่อ-นามสกุล',
                            })
                            setAutoFillType(
                              canvasList,
                              activeCanvasId,
                              'name',
                              'ชื่อ-นามสกุล'
                            )
                          },
                        },
                        {
                          displayText: 'Text (พิมพ์อิสระ)',
                          onClick: () => {
                            setActiveObject({
                              ...activeObject,
                              elName: 'text',
                              text: 'text',
                            }),
                              setAutoFillType(
                                canvasList,
                                activeCanvasId,
                                'text',
                                'text'
                              )
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="p-4">
                {autoFillData.find(
                  (data) => data.value === activeObject?.elName
                )?.label && (
                  <>
                    <h1 className="font-semibold">หัวข้อ Auto fill</h1>
                    <Dropdown
                      label={
                        autoFillData.find(
                          (data) => data.value === activeObject?.elName
                        )?.label ?? 'เลือกประเภท'
                      }
                      dropdownSection={autoFillData.map((data) => ({
                        lists: [
                          {
                            displayText: data.label,
                            onClick: () => {
                              setActiveObject({
                                ...activeObject,
                                elName: data.value,
                                text: data.label,
                              })
                              setAutoFillType(
                                canvasList,
                                activeCanvasId,
                                data.value,
                                data.label
                              )
                            },
                          },
                        ],
                      }))}
                    />
                  </>
                )}
              </div>
            </DocumentAccordion>
          </div>
        )}
      </div>
    </div>
  )
}

export default TemplateEditor
