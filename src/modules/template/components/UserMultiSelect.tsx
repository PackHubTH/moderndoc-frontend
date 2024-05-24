import Select, { components } from 'react-select'

import { FaInfoCircle } from 'react-icons/fa'
import ProfileOptionBox from './ProfileOptionBox'

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
  const customOption = (props: any) => {
    return (
      <components.Option {...props}>
        <ProfileOptionBox
          email={props.data.email}
          label={props.data.label}
          profileImg={props.data.profileImg}
          isTemplateOperator={props.data.isTemplateOperator}
        />
      </components.Option>
    )
  }
  return (
    <div>
      <h1 className="mb-2 text-sm font-medium text-gray-800">{label}</h1>
      <Select
        components={{
          Option: customOption,
        }}
        placeholder={placeholder}
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: '20px',
            borderColor: 'rgb(229,231,235)',
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
          email: user.email,
          profileImg: user.profileImg,
          isTemplateOperator: user.isTemplateOperator ?? false,
        }))}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
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
