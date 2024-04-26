import { FaInfoCircle } from 'react-icons/fa'
import Select from 'react-select'

interface UserMultiSelectProps {
  label: string
  options: any[]
  value: any[]
  onChange: (value: any[]) => void
  placeholder?: string
}

const UserMultiSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: UserMultiSelectProps) => {
  return (
    <div>
      <h1 className="mb-2 text-sm font-medium text-gray-800">{label}</h1>
      <Select
        placeholder={placeholder}
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: '20px',
            height: '44px',
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0px 16px',
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: '14px',
          }),
        }}
        options={options?.map((user) => ({
          value: user.id,
          label: user.nameTh,
        }))}
        onChange={(selected) => {
          onChange(selected.map((item) => item.value))
        }}
        value={options
          ?.filter((user) => value?.includes(user.id))
          .map((user) => ({
            value: user.id,
            label: user.nameTh,
          }))}
        isSearchable
        isMulti
      />
      <p className="mt-2 flex items-center gap-1 text-xs">
        <FaInfoCircle color="#3888ff" size={14} />
        เป็นแนวทางให้ผู้สร้างเอกสารทราบว่าควรจะส่งเอกสารฉบับนี้ให้เจ้าหน้าที่คนใดรับผิดชอบ
        (กรณีมีผู้ดำเนินการที่ชัดเจน)
      </p>
    </div>
  )
}
export default UserMultiSelect
