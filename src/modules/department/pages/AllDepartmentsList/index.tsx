import PageContainer from '@/components/PageContainer'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { GetAllDepartmentsResponse } from '../../hooks/api/types'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'

const AllDepartmentsList = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { data: departments, refetch } = useGetAllDepartments(
    paginationState.pageIndex + 1
  )
  const columns: ColumnDef<GetAllDepartmentsResponse>[] = [
    {
      id: 'index',
      size: 30,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      size: 30,
      header: 'หน่วยงาน/คณะ',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.faculty?.name ?? info.row.original.name}
        </span>
      ),
    },
    {
      size: 30,
      header: 'สาขาวิชา',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.name}
        </span>
      ),
    },
    {
      size: 30,
      header: 'จำนวนบุคลากร (คน)',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.staffCount}
        </span>
      ),
    },
    {
      size: 30,
      header: 'รอการตอบรับ (คน)',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.awaitingApprovalCount}
        </span>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: departments?.data.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: departments?.data.totalPages ?? -1,
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])
  return (
    <>
      <PageContainer className="p-8">
        <h1 className="mb-6 text-2xl font-bold">จัดการหน่วยงาน</h1>
        <div className="p-2">
          <TableDisplay table={table} />
          <Pagination
            totalPage={departments?.data.totalPages ?? 0}
            currentPage={table.getState().pagination.pageIndex + 1}
            nextPage={table.nextPage}
            prevPage={table.previousPage}
          />
        </div>
      </PageContainer>
    </>
  )
}

export default AllDepartmentsList
