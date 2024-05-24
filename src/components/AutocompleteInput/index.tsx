import ProfileOptionBox from '@/modules/template/components/ProfileOptionBox'
import { Combobox } from '@headlessui/react'
import { useState } from 'react'
import tw from 'twin.macro'

type PropsType = {
  label: string
  options: {
    value: string
    label: string
    defaultEmailIndex?: number
    emails?: string[]
    isTemplateOperator?: boolean
    profileImg?: string
  }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  isError?: boolean
  onSearch?: (query: string) => void
  placeholder?: string
  disabled?: boolean
}

const AutocompleteInput: React.FC<PropsType> = ({
  label,
  className,
  value,
  onChange,
  isError,
  options,
  onSearch,
  placeholder = 'กรุณาเลือก...',
  disabled,
}) => {
  const [query, setQuery] = useState('')

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(query.toLowerCase()) ||
      option.value.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <Combobox value={value} onChange={onChange} disabled={disabled}>
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
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setQuery(e.target.value)
            onSearch?.(e.target.value)
          }}
        />
        <Combobox.Options>
          {[
            {
              value: '',
              label: placeholder,
              defaultEmailIndex: 0,
              emails: [],
              profileImg: '',
            },
            ...filteredOptions,
          ].map((option) => (
            <Combobox.Option
              className="color-gray-800 mx-2 cursor-pointer border border-gray-200 px-4 py-2 text-sm hover:bg-gray-100"
              value={option.value}
            >
              {option?.profileImg ||
              (option?.emails && option.emails.length > 0) ? (
                <ProfileOptionBox
                  email={
                    option.emails
                      ? option.emails[option.defaultEmailIndex ?? 0]
                      : ''
                  }
                  isTemplateOperator={option.isTemplateOperator ?? false}
                  label={option.label}
                  profileImg={option.profileImg ?? ''}
                />
              ) : (
                option.label
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}

export default AutocompleteInput
