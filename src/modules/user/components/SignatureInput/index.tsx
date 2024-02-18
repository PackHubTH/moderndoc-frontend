import { FaPlus } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

type propsType = {
  label: string
  maxSignatures: number
  value: string[]
  onChange: (value: string[]) => void
}

const SignatureInput: React.FC<propsType> = ({
  label,
  maxSignatures,
  value,
  onChange,
}) => {
  const addSignature = (signature: string) => {
    if (value.length < maxSignatures) {
      onChange([...value, signature])
    }
  }

  const deleteSignature = (index: number) => {
    const newValue = value.filter((_, i) => i !== index)
    onChange(newValue)
  }

  return (
    <div>
      <h1 className="font-semibold">{label}</h1>
      <h2 className="text-sm">
        สามารถจดจำลายเซ็นต์ได้สูงสุด {maxSignatures} ลายเซ็นต์
      </h2>
      <div className="flex mt-4 gap-2.5">
        {value.map((signature, index) => (
          <div
            className="w-32 h-32 border-gray-200 border-[2px] rounded-lg relative"
            key={index}
          >
            <IoClose
              className="p-[1px] rounded-full bg-red-600 text-white absolute top-2 right-2 cursor-pointer"
              size={18}
              onClick={() => deleteSignature(index)}
            />
            <img
              src={signature}
              alt="signature"
              className="w-full h-full object-cover rounded-lg "
            />
          </div>
        ))}
        {value.length < maxSignatures && (
          <div className="w-32 h-32 border-[#3888FF] border-[2px] border-dashed rounded-lg flex items-center justify-center cursor-pointer">
            <FaPlus
              className="p-1 border-[#3888FF] border-[2px] rounded-full"
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
