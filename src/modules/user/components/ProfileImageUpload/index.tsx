import Button from '@/components/Button'
import { useRef } from 'react'
import { DEFAULT_PROFILE_IMG } from '../../constants'

type PropsType = {
  urlValue: string | undefined
  onChange: (url: string | undefined, file: File | undefined) => void
}

const ProfileImageUpload: React.FC<PropsType> = ({ urlValue, onChange }) => {
  const uploadButtonRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(URL.createObjectURL(file), file)
    }
  }

  const resetFile = () => {
    onChange(undefined, undefined)
  }

  const onClickUpload = () => {
    uploadButtonRef.current?.click()
  }

  return (
    <div className="flex gap-4 items-center">
      <img
        className="w-16 h-16 rounded-full mr-2 cursor-pointer"
        src={urlValue || DEFAULT_PROFILE_IMG}
      />
      <input
        className="hidden"
        type="file"
        id="file"
        ref={uploadButtonRef}
        onChange={handleFileChange}
      />
      <Button label="อัปโหลดรูปภาพ" variant="green" onClick={onClickUpload} />
      <Button label="ค่าเริ่มต้น" variant="outline-blue" onClick={resetFile} />
    </div>
  )
}

export default ProfileImageUpload
