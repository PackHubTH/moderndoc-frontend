import { HTMLInputTypeAttribute } from 'react'
import tw from 'twin.macro'

type PropsType = {
  label: string
  value?: string
  onChange?: (value: string) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  className?: string
  isError?: boolean
}

const TextInput: React.FC<PropsType> = ({
  label,
  type,
  placeholder,
  className,
  value,
  onChange,
  isError,
}) => {
  return (
    <div className={className}>
      <label htmlFor={label} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={label}
        css={[
          tw`py-3 px-4 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none`,
          isError && tw`border-red-500 focus:border-red-500 focus:ring-red-500`,
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
      ></input>
    </div>
  )
}

export default TextInput
