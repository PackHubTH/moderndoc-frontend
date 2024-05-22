import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import useGetAllTags from '../../hooks/api/useGetAllTags'

type PropsType = {
  departmentIds: string[]
  tagIds: string[]
  setDepartmentIds: (departmentIds: string[]) => void
  setTagIds: (tagIds: string[]) => void
}

const FaqFilter: React.FC<PropsType> = ({
  departmentIds,
  tagIds,
  setDepartmentIds,
  setTagIds,
}) => {
  const { data: tags } = useGetAllTags()
  const { data: departments } = useGetDepartments()

  return (
    <div className="flex gap-8 px-4 py-5">
      <div className="w-1/2">
        <h3 className="text-sm text-blue-600">ค้นหาตามหมวดหมู่</h3>
        <div className="mt-5 space-y-4">
          {tags?.data.map((tag) => (
            <div className="flex w-52  items-center justify-between">
              <label htmlFor={tag.id} className="cursor-pointer text-sm ">
                {tag.name}
              </label>
              <input
                id={tag.id}
                className="cursor-pointer rounded-sm  accent-blue-500"
                type="checkbox"
                checked={tagIds.includes(tag.id)}
                onChange={() => {
                  if (tagIds.includes(tag.id)) {
                    setTagIds(tagIds.filter((id) => id !== tag.id))
                  } else {
                    setTagIds([...tagIds, tag.id])
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <h3 className="text-sm text-blue-600">ค้นหาตามหน่วยงาน</h3>
        <div className="mt-5 space-y-4">
          {departments?.data.map((department) => (
            <div className="flex w-52 items-center justify-between">
              <label
                htmlFor={department.id}
                className="cursor-pointer text-sm "
              >
                {department.name}
              </label>
              <input
                id={department.id}
                className="cursor-pointer rounded-sm  accent-blue-500"
                type="checkbox"
                checked={departmentIds.includes(department.id)}
                onChange={() => {
                  if (departmentIds.includes(department.id)) {
                    setDepartmentIds(
                      departmentIds.filter((id) => id !== department.id)
                    )
                  } else {
                    setDepartmentIds([...departmentIds, department.id])
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FaqFilter
