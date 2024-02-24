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
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <div className="flex flex-col gap-2.5">
        {value?.map((email, index) => (
          <div key={index} className="relative flex gap-2.5">
            <input
              type="email"
              id={label}
              css={[
                tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
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
                    className="cursor-pointer text-sm text-blue-500"
                    onClick={() => setDefaultEmail(index)}
                  >
                    ตั้งเป็นค่าเริ่มต้น
                  </div>
                )}
                {index !== defaultEmailIndex && index !== 0 && (
                  <div
                    className="cursor-pointer text-sm text-red-500"
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
                <div className="cursor-default rounded-full border-[1px] border-blue-500 px-3 py-1 text-sm text-blue-500">
                  ค่าเริ่มต้น
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="mt-2.5 flex cursor-pointer items-center gap-2 text-blue-600"
        onClick={() => onAddEmail()}
      >
        <GoPlusCircle className="-mt-[2px]" color="rgb(59 130 246)" />
        <span className="font-normal">เพิ่มอีเมล</span>
      </div>
    </div>
  )
}

export default EmailInput
