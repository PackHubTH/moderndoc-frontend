import { Tag } from '@/modules/faq/types'
import Select from 'react-select'

type PropsType = {
  label: string
  onChange: (tags: string[]) => void
  value: string[]
  tagsList: Tag[]
}

const TagsSelect: React.FC<PropsType> = ({
  label,
  onChange,
  value,
  tagsList,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="mb-2 block text-sm font-medium text-gray-800"
      >
        {label}
      </label>
      <Select
        options={tagsList.map((tag) => ({ value: tag.id, label: tag.name }))}
        onChange={(selected) => {
          onChange(selected.map((item) => item.value))
        }}
        value={tagsList
          ?.filter((tag) => value?.includes(tag.id))
          .map((tag) => ({ value: tag.id, label: tag.name }))}
        name={label}
        isSearchable
        isMulti
      />
    </div>
  )
}

export default TagsSelect
