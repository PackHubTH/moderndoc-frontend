import { useEffect } from 'react'
import tw from 'twin.macro'

type PropsType = {
  label: string
  options: {
    value: string | number
    label: string
  }[]
  value?: string | number
  onChange?: (value: string | number) => void
  className?: string
  isError?: boolean
}

const Select: React.FC<PropsType> = ({
  label,
  className,
  value,
  onChange,
  isError,
  options,
}) => {
  useEffect(() => {
    if (value === undefined && options[0]?.value) {
      onChange?.(options[0].value)
    }
  }, [options])

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <select
        id={label}
        css={[
          tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
          isError && tw`border-red-500 focus:border-red-500 focus:ring-red-500`,
        ]}
        placeholder="เลือก..."
        value={value}
        onChange={
          onChange
            ? (e) => {
                onChange(e.target.value)
              }
            : undefined
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
