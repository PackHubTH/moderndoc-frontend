import {
  getJson,
  previewCanvas,
  setAutoFillType,
} from '@/modules/document/utils/documentEditorUtils'
import { useMemo, useRef, useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useNavigate, useParams } from 'react-router-dom'

import exampleFile from '@/assets/FO-TO-44.pdf'
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
import PreviewButton from '../components/PreviewButton'
import TemplateInfoModal from '../components/TemplateInfoModal'
import useGetTemplateById from '../hooks/api/useGetTemplateById'

// import file from './example.pdf'

const autoFillData = [
  { label: 'ชื่อ-นามสกุล', value: 'nameTh' },
  { label: 'ระดับการศึกษา', value: 'educationLevel' },
  { label: 'คณะ', value: 'faculty' },
  { label: 'ภาค/สาขาวิชา', value: 'major' },
  { label: 'หลักสูตร', value: 'university' },
  { label: 'รหัสนักศึกษา', value: 'academicYear' },
  { label: 'เบอร์โทรศัพท์', value: 'date' },
  { label: 'E-mail', value: 'time' },
  { label: 'อาจารย์ที่ปรึกษา', value: 'location' },
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
  const { data: templateFileEdit } = useGetTemplateById(templateId)
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const activeCanvasId = useDocumentToolbarStore(
    (state) => state.activeCanvasId
  )
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )
  const [isPreview, setIsPreview] = useState(false)
  const [pageTotal, setPageTotal] = useState(0)

  const templateFile = useMemo(
    () =>
      type === 'create'
        ? templateFileCreate
        : // : templateFileEdit?.data?.templateFile, // TODO: remove mock
          exampleFile, // TODO: remove mock
    [templateFileCreate, type]
  )

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

  console.log('editor active object', activeObject?.elName)
  console.log('templateFile', templateFile)
  return (
    <div>
      {/* Header */}
      <div className="flex h-20 items-center justify-between border-b-2 p-5">
        <TemplateInfoModal isOpen={isOpen} type={type} close={close} />
        <div className="flex items-center gap-8">
          <MainLogo />
          <h1 className="text-xl font-bold text-gray-600">
            การสร้างเอกสารต้นฉบับ (Template)
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
                            templateFileEdit?.data?.element?.data[page]
                              ? templateFileEdit?.data?.element?.data[page]
                              : undefined
                          }
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
                              elName: 'nameTh',
                              text: 'ชื่อ-นามสกุล',
                            })
                            setAutoFillType(
                              canvasList,
                              activeCanvasId,
                              'nameTh',
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
