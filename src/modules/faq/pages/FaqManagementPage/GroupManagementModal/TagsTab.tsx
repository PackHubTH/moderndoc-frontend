import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import TextInput from '@/components/TextInput'
import { useDisclosure } from '@/hooks/useDisclosure'
import DeleteTagModal from '@/modules/faq/components/DeleteTagModal'
import useCreateTag from '@/modules/faq/hooks/api/useCreateTag'
import useEditTag from '@/modules/faq/hooks/api/useEditTag'
import useGetAllTags from '@/modules/faq/hooks/api/useGetAllTags'
import { Tag } from '@/modules/faq/types'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const TagsTab = () => {
  const columns: ColumnDef<Tag>[] = useMemo(
    () => [
      {
        id: 'index',
        size: 40,
        header: 'ที่',
        cell: (info) => (
          <span className="font-medium text-gray-500">
            {info.row.index + 1}
          </span>
        ),
      },
      {
        accessorKey: 'name',
        size: 500,
        header: 'รายการหมวดหมู่',
        cell: (info) => {
          const [isEdit, setIsEdit] = useState(false)
          const [editValue, setEditValue] = useState(info.row.original.name)

          return (
            <div className="flex items-center justify-between">
              {!isEdit ? (
                <>
                  <span className="font-semibold text-blue-500">
                    {info.row.original.name}
                  </span>
                  <div className="flex gap-3">
                    <MdModeEditOutline
                      size={25}
                      className="cursor-pointer rounded-full bg-sky-500 p-1 text-white"
                      onClick={() => setIsEdit(true)}
                    />
                    <HiTrash
                      size={25}
                      className="cursor-pointer rounded-full bg-red-500 p-1 text-white"
                      onClick={() => {
                        setSelectedDeleteTag(info.row.original)
                        open()
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <TextInput
                    value={editValue}
                    onChange={(val) => setEditValue(val)}
                    className="w-full "
                  />
                  <div className="ml-2 flex gap-3">
                    <Button
                      label="ยืนยัน"
                      variant="blue"
                      onClick={() => {
                        setIsEdit(false)
                        editTag(
                          {
                            tagId: info.row.original.id,
                            name: editValue,
                          },
                          {
                            onSuccess: () => {
                              toast('แก้ไขหมวดหมู่สำเร็จ', { type: 'success' })
                              refetchTag()
                            },
                            onError: (error) => {
                              toast(
                                `เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่ ${error}`,
                                {
                                  type: 'error',
                                }
                              )
                            },
                          }
                        )
                      }}
                    />
                    <Button
                      label="ยกเลิก"
                      variant="white"
                      onClick={() => {
                        setIsEdit(false)
                        setEditValue(info.row.original.name)
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          )
        },
      },
    ],
    []
  )

  const [selectedDeleteTag, setSelectedDeleteTag] = useState<Tag | null>(null)

  const { data: Tags, refetch: refetchTag } = useGetAllTags()
  const { mutate: createTag } = useCreateTag()
  const { mutate: editTag } = useEditTag()

  const { isOpen, open, close } = useDisclosure()

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
    <>
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
      <DeleteTagModal isOpen={isOpen} onClose={close} tag={selectedDeleteTag} />
    </>
  )
}

export default TagsTab
