import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { GetDepartmentMemberResponse } from '@/modules/department/hooks/api/types'
import useGetDepartmentMembers from '@/modules/department/hooks/api/useGetDepartmentMembers'
import { RoleMapper } from '@/modules/department/mappers'
import { formatPhoneNumbers } from '@/utils/formatUtils'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

const DepartmentMembersList = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: members, refetch } = useGetDepartmentMembers(true)

  const columns: ColumnDef<GetDepartmentMemberResponse>[] = [
    {
      size: 30,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      size: 60,
      header: `ชื่อ-นามสกุล`,
      cell: (info) => (
        <div className="flex items-center gap-2">
          <img
            src={info.row.original.profileImg}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="space-y-2">
            <h4>{info.row.original.nameTh}</h4>
            <span className="text-sm text-gray-500">
              {info.row.original.emails[info.row.original.defaultEmailIndex]}
            </span>
          </div>
        </div>
      ),
    },
    {
      size: 60,
      header: `เบอร์โทรศัพท์`,
      cell: (info) => (
        <div className="space-y-1">
          {formatPhoneNumbers(
            info.row.original.phones[info.row.original.defaultPhoneIndex]
          )}
        </div>
      ),
    },
    {
      size: 60,
      header: `บทบาท`,
      cell: (info) => (
        <div className="space-y-1">{RoleMapper[info.row.original.role]}</div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: members?.data.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: members?.data.totalPages ?? -1,
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])

  return (
    <div className="p-2">
      <TableDisplay table={table} />
      <Pagination
        totalPage={members?.data.totalPages ?? 0}
        currentPage={table.getState().pagination.pageIndex + 1}
        nextPage={table.nextPage}
        prevPage={table.previousPage}
      />
    </div>
  )
}

export default DepartmentMembersList
