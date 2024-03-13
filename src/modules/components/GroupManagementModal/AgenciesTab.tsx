import Button from '@/components/Button'
import Modal from '@/components/Modal'
import TableDisplay from '@/components/TableDisplay'
import TextInput from '@/components/TextInput'
import { useDisclosure } from '@/hooks/useDisclosure'
import useCreateAgencyDepartment from '@/modules/faq/hooks/api/useCreateAgency'
import useDeleteTag from '@/modules/faq/hooks/api/useDeleteTag'
import useUpdateDepartment from '@/modules/faq/hooks/api/useUpdateDepartment'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import { Department } from '@/modules/user/hooks/types'
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const AgenciesTab = () => {
  const columns: ColumnDef<Department>[] = [
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
      header: 'รายการหน่วยงาน',
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
                    className="cursor-not-allowed rounded-full bg-red-500 p-1 text-white"
                    onClick={() => {
                      // setSelectedDeleteDepartment(info.row.original)
                      // open()
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
                      editDepartment(
                        {
                          departmentId: info.row.original.id,
                          name: editValue,
                        },
                        {
                          onSuccess: () => {
                            toast('แก้ไขหน่วยงานสำเร็จ', { type: 'success' })
                            refetchAgencies()
                          },
                          onError: (error) => {
                            toast(`เกิดข้อผิดพลาดในการแก้ไขหน่วยงาน ${error}`, {
                              type: 'error',
                            })
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
  ]

  const { data: agencies, refetch: refetchAgencies } = useGetDepartments()
  const { mutate: createAgency } = useCreateAgencyDepartment()
  const { mutate: deleteTag } = useDeleteTag()
  const { mutate: editDepartment } = useUpdateDepartment()

  const { isOpen, open, close } = useDisclosure()

  const table = useReactTable({
    columns,
    data: agencies?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
  })

  const [addDepartmentInputValue, setAddDepartmentInputValue] = useState('')
  const [selectedDeleteDepartment, setSelectedDeleteDepartment] =
    useState<Department | null>(null)

  const onCreateAgency = () => {
    createAgency(addDepartmentInputValue, {
      onSuccess: () => {
        toast('เพิ่มหน่วยงานสำเร็จ', { type: 'success' })
        refetchAgencies()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการเพิ่มหน่วยงาน ${error}`, {
          type: 'error',
        })
      },
    })
    setAddDepartmentInputValue('')
  }

  const onDeleteTag = (tagId: string) => {
    deleteTag(tagId, {
      onSuccess: () => {
        toast('ลบหน่วยงานสำเร็จ', { type: 'success' })
        refetchAgencies()
      },
      onError: (error) => {
        toast(`เกิดข้อผิดพลาดในการลบหน่วยงาน ${error}`, {
          type: 'error',
        })
      },
    })
    close()
  }

  return (
    <>
      <div className="mt-4 space-y-3">
        <div className="space-y-2">
          <span>เพิ่มหน่วยงานใหม่</span>
          <div className="flex w-full gap-1">
            <TextInput
              className="w-full"
              placeholder="กรอกชื่อหน่วยงาน"
              value={addDepartmentInputValue}
              onChange={(val) => setAddDepartmentInputValue(val)}
            />
            <Button label="เพิ่ม" variant="green" onClick={onCreateAgency} />
          </div>
        </div>
        <TableDisplay table={table} />
      </div>
      <Modal
        leftIcon={
          <HiTrash
            size={25}
            className="rounded-full bg-red-200 p-0.5 text-red-500"
          />
        }
        title={`ลบหน่วยงาน '${selectedDeleteDepartment?.name}' หรือไม่?`}
        isOpen={isOpen}
        onClose={close}
        content={
          <p className="text-gray-600">
            มีรายการ FAQ ที่กำลังใช้งานอยู่ภายใต้หน่วยงานดังกล่าว
            หากลบออกจะทำให้หน่วยงานในรายการ FAQ ที่เชื่อมถึงหายไป
          </p>
        }
        actions={
          <div className="flex gap-3">
            <Button label="ยกเลิก" variant="white" onClick={close} />
            <Button
              label="ลบ"
              variant="red"
              onClick={() => onDeleteTag(selectedDeleteDepartment!.id)}
            />
          </div>
        }
      />
    </>
  )
}

export default AgenciesTab
