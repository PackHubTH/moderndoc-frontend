type PropsType = {
  label: string
  options: {
    value: string
    label: string
  }[]
  value?: string
  onChange?: (value: string) => void
  className?: string
}

const RadioGroup: React.FC<PropsType> = ({
  label,
  className,
  value,
  onChange,
  options,
}) => {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block text-sm font-medium mb-2 text-gray-800"
      >
        {label}
      </label>
      <div>
        {options.map((option, index) => (
          <div className="flex py-2">
            <input
              type="radio"
              name={`${option.label}-${index}`}
              className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              id={`${option.label}-${index}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
            />
            <label
              htmlFor={`${option.label}-${index}`}
              className="text-sm text-gray-500 ms-2"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadioGroup
