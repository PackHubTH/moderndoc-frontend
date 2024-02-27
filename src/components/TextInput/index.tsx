import { HTMLInputTypeAttribute } from 'react'
import { PatternFormat } from 'react-number-format'
import tw from 'twin.macro'

type PropsType = {
  label: string
  value?: string
  onChange?: (value: string) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  isError?: boolean
  patternFormat?: string
}

const TextInput: React.FC<PropsType> = ({
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
  isError,
  patternFormat,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      {patternFormat ? (
        <PatternFormat
          id={label}
          css={[
            tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
            isError &&
              tw`border-red-500 focus:border-red-500 focus:ring-red-500`,
          ]}
          placeholder={placeholder}
          format={patternFormat}
          value={value}
          onValueChange={(values) => {
            onChange && onChange(values.value)
          }}
        />
      ) : (
        <input
          type={type}
          id={label}
          css={[
            tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
            isError &&
              tw`border-red-500 focus:border-red-500 focus:ring-red-500`,
          ]}
          placeholder={placeholder}
          value={value}
          onChange={
            onChange
              ? (e) => {
                  onChange(e.target.value)
                }
              : undefined
          }
        />
      )}
    </div>
  )
}

export default TextInput
