import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

// import useGetDepartmentFaqs from '../../hooks/api/useGetDepartmentFaqs'
// import { Faq } from '../../types'

const TemplateListTable = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  //   const { data: faqs, refetch } = useGetDepartmentFaqs(
  //     paginationState.pageIndex + 1
  //   )
  const data = [
    {
      title: 'title',
      lastUpdatedAt: new Date(),
    },
    {
      title: 'title2',
      lastUpdatedAt: new Date(),
    },
  ]

  const columns: ColumnDef<any>[] = [
    {
      id: 'index',
      size: 20,
      header: 'ที่',
      cell: (info: any) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      id: 'templateTitle',
      size: 20,
      header: 'ทั้งหมด 2 ฉบับ',
      cell: (info: any) => (
        <span className="font-medium text-gray-500">{info.getValue()}</span>
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      // size: 400,
      header: '',
      cell: (info: any) => (
        <div className="flex flex-row items-center justify-between">
          <div>
            {/* <div className="flex items-center gap-2 ">
              <span className="font-semibold text-blue-500 ">
                {info.row.original.titleTh}
              </span>
              <img
                className="w-6 rounded-full"
                src={info.row.original.userUpdated.profileImg}
              />
              <span className="text-sm font-semibold text-gray-400">
                อัปเดตโดย {info.row.original.userUpdated.nameTh}
              </span>
            </div> */}
            <span className="text-gray-400">
              อัพเดตล่าสุดเมื่อ{' '}
              {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
                locale: th,
              })}
            </span>
          </div>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: -1,
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
        totalPage={1}
        currentPage={table.getState().pagination.pageIndex + 1}
        nextPage={table.nextPage}
        prevPage={table.previousPage}
      />
    </div>
  )
}

export default TemplateListTable
