import useUploadFile from '@/hooks/useUploadFile'
import {
  getPrivateImageUrl,
  onErrorImage,
} from '@/modules/document/utils/imageUtils'
import { useEffect, useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

type propsType = {
  maxSignatures: number
  value: string[]
  onChange: (value: string[]) => void
}

const SignatureInput: React.FC<propsType> = ({
  maxSignatures,
  value,
  onChange,
}) => {
  const [signedImageUrls, setSignedImageUrls] = useState<string[]>([])

  const uploadButtonRef = useRef<HTMLInputElement>(null)

  const { mutateAsync: uploadFile } = useUploadFile()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const result = await uploadFile({
        file: file,
        folder: 'signature',
      })

      const tempValue = value
      if (result.data) {
        tempValue.push(result.data?.fileUrl)
      }

      onChange(tempValue)
    }
  }

  useEffect(() => {
    const getAllSignedImages = async () => {
      const images = await Promise.all(
        value.map(async (signature) => await getPrivateImageUrl(signature))
      )
      setSignedImageUrls(images)
    }

    getAllSignedImages()
  }, [value])

  const onClickUpload = () => {
    uploadButtonRef.current?.click()
  }

  const addSignature = async (signature: string) => {
    if (value.length < maxSignatures) {
      const result = await uploadFile({
        file: signature,
        folder: 'signature',
      })

      if (result.data) {
        onChange([...value, result.data.fileUrl])
      }
    }
  }

  const deleteSignature = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }

  return (
    <div>
      <h1 className="font-semibold">ลายเซ็นต์ (ลงนามเอกสาร)</h1>
      <h2 className="text-sm">
        สามารถจดจำลายเซ็นต์ได้สูงสุด {maxSignatures} ลายเซ็นต์
      </h2>
      <div className="mt-4 flex gap-2.5">
        {value.map((signature, index) => (
          <div
            className="relative h-32 w-32 rounded-lg border-[2px] border-gray-200"
            key={index}
          >
            <IoClose
              className="absolute right-2 top-2 cursor-pointer rounded-full bg-red-600 p-[1px] text-white"
              size={18}
              onClick={() => deleteSignature(index)}
            />
            <img
              src={signedImageUrls?.[index]}
              onError={onErrorImage}
              alt="signature"
              className="h-full w-full rounded-lg object-cover "
            />
          </div>
        ))}
        <input
          className="hidden"
          type="file"
          id="file"
          ref={uploadButtonRef}
          onChange={handleFileChange}
        />
        {value.length < maxSignatures && (
          <div
            className="flex h-32 w-32 cursor-pointer items-center justify-center rounded-lg border-[2px] border-dashed border-[#3888FF]"
            onClick={onClickUpload}
          >
            <FaPlus
              className="rounded-full border-[2px] border-[#3888FF] p-1"
              color="#3888FF"
              size={30}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default SignatureInput
