import { FaPlus } from 'react-icons/fa6'

interface UploadFileButtonProps {
  value: File | undefined
  onChange: (...event: any[]) => void
}

const UploadFileButton = ({ value, onChange }: UploadFileButtonProps) => {
  return (
    <div>
      <h1 className="mb-2 text-sm font-medium text-gray-800">
        อัปโหลดเอกสารตัวอย่างของฉบับนี้
      </h1>
      <input
        id="upload-btn"
        type="file"
        accept=".pdf"
        onChange={(e) => {
          onChange(e.target.files?.[0]) // Update the form state with the file object
        }}
        hidden
      />
      <label
        htmlFor="upload-btn"
        className="mr-2 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-green-500 p-2 px-6 text-sm text-white hover:bg-green-700"
      >
        <FaPlus />
        อัปโหลดเอกสาร
      </label>
      <span>{value?.name ?? ''}</span> {/* Display the filename */}
    </div>
  )
}

export default UploadFileButton
