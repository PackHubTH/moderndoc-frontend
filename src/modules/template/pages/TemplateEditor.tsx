import {
  getJson,
  previewCanvas,
  setAutoFillType,
} from '@/modules/document/utils/documentEditorUtils'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'

import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import MainLogo from '@/components/MainLogo'
import { useDisclosure } from '@/hooks/useDisclosure'
import DocumentAccordion from '@/modules/document/components/DocumentAccordion'
import DocumentCanvas from '@/modules/document/components/DocumentCanvas'
import DocumentToolbar from '@/modules/document/components/DocumentToolbar'
import ToolbarButton from '@/modules/document/components/ToolbarButton'
import { useDocumentStore } from '@/modules/document/stores/documentStore'
import { useDocumentToolbarStore } from '@/modules/document/stores/documentToolbarStore'
import { ActiveToolbarButton as ButtonId } from '@/modules/document/types/ToolbarButton'
import { useTemplateStore } from '@/stores/templateStore'
import { FaFileSignature } from 'react-icons/fa6'
import tw from 'twin.macro'
import useGetFile from '../../../hooks/useGetFile'
import PreviewButton from '../components/PreviewButton'
import TemplateInfoModal from '../components/TemplateInfoModal'
import useGetTemplateById from '../hooks/api/useGetTemplateById'

// import file from './example.pdf'

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
  const [isPreview, setIsPreview] = useState(false)
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
          <PreviewButton
            isPreview={isPreview}
            setIsPreview={() => {
              setIsPreview(!isPreview)
              previewCanvas(canvasList, setCanvasList, isPreview)
            }}
          />
          <Button
            disabled={templateFile ? false : true}
            label={
              type === 'create' ? 'ตั้งค่า Template' : 'บันทึกการเปลี่ยนแปลง'
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
          {/* <div className="flex h-12 items-center justify-center bg-gray-200 px-4"> */}
          <DocumentToolbar>
            <ToolbarButton
              icon={<FaFileSignature size={20} />}
              id={ButtonId.AutoFill}
              label="Create Autofill"
            />
            <ToolbarButton
              icon={<FaFileSignature />}
              id={ButtonId.Correct}
              label="<dev> Get json"
              onClick={() => {
                console.log('dada', canvasList)
                console.log(getJson(canvasList))
              }}
            />
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
                          scale={1}
                          width={800}
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
              <div>
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
                              elName: '',
                              text: 'text',
                            }),
                              setAutoFillType(
                                canvasList,
                                activeCanvasId,
                                '',
                                'text'
                              )
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <div>
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
