import { useDocumentStore } from '@/modules/document/stores/documentStore'
import { Switch } from '@headlessui/react'

const previewData = [
  { label: 'อลัน สมิธ', value: 'name' },
  { label: 'ปริญญาตรี', value: 'educationLevel' },
  { label: 'วิศวกรรมศาสตร์', value: 'faculty' },
  { label: 'วิศวกรรมคอมพิวเตอร์', value: 'major' },
  { label: 'ภาคปกติ', value: 'course' },
  { label: '63456789012', value: 'studentNumber' },
  { label: '0987654321', value: 'phone' },
  { label: 'test@gmail.com', value: 'email' },
  { label: 'อ.ธงชัย ใจดี', value: 'teacher' },
]

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

const PreviewButton = () => {
  const canvasList = useDocumentStore((state) => state.canvasList)
  const isPreview = useDocumentStore((state) => state.isPreview)
  const setCanvasList = useDocumentStore((state) => state.setCanvasList)
  const setIsPreview = useDocumentStore((state) => state.setIsPreview)

  const onPreviewChange = () => {
    setIsPreview(!isPreview)
    canvasList.forEach((item) => {
      item.canvas.forEachObject((obj: any) => {
        item.canvas.discardActiveObject()
        if (isPreview) {
          obj.set({
            editable: false,
            selectable: false,
            evented: false,
            backgroundColor: '#DBEAFE',
          })
          autoFillData.forEach((data) => {
            if (obj.elName === data.value) {
              obj.set({ text: data.label })
            }
          })
        } else {
          previewData.forEach((data) => {
            if (obj.elName === data.value) {
              obj.set({ text: data.label, backgroundColor: '' })
            }
          })
        }
      })
      setCanvasList(item.id, item.canvas)
      item.canvas.renderAll()
    })
  }

  return (
    <Switch
      checked={isPreview}
      onChange={onPreviewChange}
      className={`${isPreview ? 'bg-blue-500' : 'bg-gray-200'}
            relative inline-flex h-[38px] w-[144px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${isPreview ? 'translate-x-[108px]' : 'translate-x-0'}
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
      <span
        className={`${
          isPreview ? 'left-3 text-white' : 'right-4'
        } absolute pt-1 `}
      >
        {isPreview ? 'โหมดตัวอย่าง' : 'โหมดแก้ไข'}
      </span>
    </Switch>
  )
}

export default PreviewButton
