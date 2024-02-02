import Button from '@/components/Button'
import { useState } from 'react'
import { DEFAULT_PROFILE_IMG } from '../../constants'

type PropsType = {
  value: string | null
  onChange: (value: string) => void
}

const ProfileImageUpload: React.FC<PropsType> = ({ value, onChange }) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      onChange(URL.createObjectURL(file))
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <img
        className="w-16 h-16 rounded-full mr-2 cursor-pointer"
        src={value || DEFAULT_PROFILE_IMG}
      />
      <Button label="อัปโหลดรูปภาพ" variant="green" />
      <Button label="ค่าเริ่มต้น" variant="outline-blue" />
    </div>
  )
}

export default ProfileImageUpload
