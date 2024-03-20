import tw from 'twin.macro'

type PropsType = {
  label: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  isError?: boolean
}

const RichTextInput: React.FC<PropsType> = ({
  label,
  placeholder,
  className,
  value,
  onChange,
  isError,
}) => {
  console

  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <textarea
        id={label}
        css={[
          tw`block min-h-[96px] w-full rounded-xl border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
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
      />
    </div>
  )
}

export default RichTextInput
