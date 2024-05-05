import tw from 'twin.macro'
import { getContactInfoIcon } from './mappers'

type PropsType = {
  label: string
  value: any
  onChange: (value: any) => void
  fields: string[]
}

const JsonTextInput: React.FC<PropsType> = ({
  label,
  value,
  onChange,
  fields,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>

      <div className="space-y-2">
        {fields.map((field, index) => {
          return (
            <div className="relative">
              <input
                type="text"
                id={field}
                key={index}
                css={[
                  tw`block w-full rounded-full border-gray-200 px-4 py-3 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50`,
                  getContactInfoIcon(field) && tw`pl-12`,
                ]}
                placeholder={field}
                value={value?.[field] ?? ''}
                onChange={
                  onChange
                    ? (e) => {
                        onChange({ ...value, [field]: e.target.value })
                      }
                    : undefined
                }
              />
              {getContactInfoIcon(field) && (
                <img
                  src={getContactInfoIcon(field)}
                  alt={field}
                  css={[
                    tw`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform`,
                  ]}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JsonTextInput
