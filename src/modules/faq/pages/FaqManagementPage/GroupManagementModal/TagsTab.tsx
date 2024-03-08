import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import TextInput from '@/components/TextInput'
import useCreateTag from '@/modules/faq/hooks/api/useCreateTag'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import { Tag } from '@/modules/faq/types'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const columns: ColumnDef<Tag>[] = [
  {
    id: 'index',
    size: 40,
    header: 'ที่',
    cell: (info) => (
      <span className="font-medium text-gray-500">{info.row.index + 1}</span>
    ),
  },
  {
    accessorKey: 'name',
    size: 500,
    header: 'รายการหมวดหมู่',
    cell: (info) => (
      <div className="flex items-center justify-between">
        <span className="font-semibold text-blue-500">
          {info.row.original.name}
        </span>
        <div className="flex gap-3">
          <MdModeEditOutline
            size={25}
            className="cursor-pointer rounded-full bg-sky-500 p-1 text-white"
          />
          <HiTrash
            size={25}
            className="cursor-pointer rounded-full bg-red-500 p-1 text-white"
          />
        </div>
      </div>
    ),
  },
]

const TagsTab = () => {
  const { data: Tags, refetch: refetchTag } = useGetAllTags()
  const { mutate: createTag } = useCreateTag()

  const table = useReactTable({
    columns,
    data: Tags?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  const [addTagInputValue, setAddTagInputValue] = useState('')

  const onCreateTag = () => {
    createTag(addTagInputValue, {
      onSuccess: () => {
        toast('เพิ่มหมวดหมู่สำเร็จ', { type: 'success' })
        refetchTag()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการเพิ่มหมวดหมู่ ${error}`, {
          type: 'error',
        })
      },
    })
    setAddTagInputValue('')
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="space-y-2">
        <span>เพิ่มหมวดหมู่ใหม่</span>
        <div className="flex w-full gap-1">
          <TextInput
            className="w-full"
            placeholder="กรอกชื่อหมวดหมู่"
            value={addTagInputValue}
            onChange={(val) => setAddTagInputValue(val)}
          />
          <Button label="เพิ่ม" variant="green" onClick={onCreateTag} />
        </div>
      </div>
      <TableDisplay table={table} />
    </div>
  )
}

export default TagsTab
