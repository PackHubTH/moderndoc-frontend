type PropsType = {
  label: string
  options: {
    value: any
    label: string
  }[]
  value?: any
  onChange?: (value: any) => void
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
      <label htmlFor={label} className="block font-semibold text-gray-800">
        {label}
      </label>
      <div>
        {options.map((option, index) => (
          <div className="flex py-2">
            <input
              type="radio"
              name={`${option.label}-${index}`}
              className="mt-0.5 shrink-0 rounded-full border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
              id={`${option.label}-${index}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
            />
            <label
              htmlFor={`${option.label}-${index}`}
              className="text-gray-6000 ms-2"
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
