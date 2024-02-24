import { Combobox } from '@headlessui/react'
import { useState } from 'react'
import tw from 'twin.macro'

type PropsType = {
  label: string
  options: {
    value: string
    label: string
  }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  isError?: boolean
}

const AutocompleteInput: React.FC<PropsType> = ({
  label,
  className,
  value,
  onChange,
  isError,
  options,
}) => {
  const [query, setQuery] = useState('')

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.value.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Combobox value={value} onChange={onChange}>
      <div className={className}>
        <label
          htmlFor={label}
          className="mb-2 block text-sm font-medium text-gray-800"
        >
          {label}
        </label>
        <Combobox.Input
          id={label}
          css={[
            tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
            isError &&
              tw`border-red-500 focus:border-red-500 focus:ring-red-500`,
          ]}
          placeholder="เลือก..."
          value={value}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <Combobox.Options>
          {filteredOptions.map((option) => (
            <Combobox.Option value={option.value}>
              {option.label}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

export default AutocompleteInput
