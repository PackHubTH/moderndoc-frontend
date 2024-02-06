import { useState } from 'react'
import { GoPlusCircle } from 'react-icons/go'
import tw from 'twin.macro'

type PropsType = {
  label: string
  value: string[]
  defaultEmailIndex: number
  onChange?: (value: string[], defaultEmailIndex: number) => void
  className?: string
}

const EmailInput: React.FC<PropsType> = ({
  label,
  defaultEmailIndex,
  value,
  onChange,
  className,
}) => {
  const [indexHover, setIndexHover] = useState<number | null>(null)

  const onAddEmail = () => {
    const newValues = [...value, '']
    onChange && onChange(newValues, defaultEmailIndex)
  }

  const onChangeEmail = (email: string, index: number) => {
    const newValues = [...value]
    newValues[index] = email
    onChange && onChange(newValues, defaultEmailIndex)
  }

  const deleteEmail = (index: number) => {
    const newValues = value.filter((_, i) => i !== index)
    onChange && onChange(newValues, defaultEmailIndex)
  }

  const setDefaultEmail = (index: number) => {
    onChange && onChange(value, index)
  }

  return (
    <div className={className}>
      <label htmlFor={label} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <div className="flex flex-col gap-2.5">
        {value?.map((email, index) => (
          <div key={index} className="flex gap-2.5 relative">
            <input
              type="email"
              id={label}
              css={[
                tw`py-3 px-4 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none text-gray-500`,
                index === 0 && tw`cursor-not-allowed`,
              ]}
              value={email}
              onChange={(e) => onChangeEmail(e.target.value, index)}
              onMouseEnter={() => setIndexHover(index)}
              onMouseLeave={() => setIndexHover(null)}
              readOnly={index === 0}
            />
            {indexHover === index && (
              <div
                className="absolute right-6 top-[13px] flex gap-4"
                onMouseEnter={() => setIndexHover(index)}
              >
                {index !== defaultEmailIndex && (
                  <div
                    className="text-blue-500 cursor-pointer text-sm"
                    onClick={() => setDefaultEmail(index)}
                  >
                    ตั้งเป็นค่าเริ่มต้น
                  </div>
                )}
                {index !== defaultEmailIndex && index !== 0 && (
                  <div
                    className="text-red-500 cursor-pointer text-sm"
                    onClick={() => deleteEmail(index)}
                  >
                    ลบ
                  </div>
                )}
              </div>
            )}
            {index === defaultEmailIndex && (
              <div
                className="absolute right-3 top-[8px]"
                onMouseEnter={() => setDefaultEmail(index)}
              >
                <div className="text-blue-500 cursor-default border-blue-500 border-[1px] px-3 py-1 rounded-full text-sm">
                  ค่าเริ่มต้น
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="flex gap-2 text-blue-600 items-center cursor-pointer mt-2.5"
        onClick={onAddEmail}
      >
        <GoPlusCircle className="-mt-[2px]" color="rgb(59 130 246)" />
        <span className="font-normal">เพิ่มอีเมล</span>
      </div>
    </div>
  )
}

export default EmailInput
