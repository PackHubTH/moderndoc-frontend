import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FaRegEnvelope } from 'react-icons/fa6'
import useGetAllTemplate from '../hooks/api/useGetAllTemplate'
import { Template } from '../types/types'

const TemplateListTable = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: template, refetch } = useGetAllTemplate(
    paginationState.pageIndex + 1
  )
  console.log('data', template?.data?.data)
  const columns: ColumnDef<Template>[] = [
    {
      id: 'index',
      size: 20,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.index +
            1 +
            paginationState.pageIndex * paginationState.pageSize}
        </span>
      ),
    },
    {
      id: 'templateTitle',
      size: 20,
      // header: 'ทั้งหมด 2 ฉบับ',
      header: (info) => (
        <div className="flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด{' '}
          <span className="text-blue-500">{info.table.getRowCount()}</span> ฉบับ
        </div>
      ),
      cell: (info) => (
        <span className="font-semibold text-blue-500">
          {info.row.original.title}
        </span>
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <div className="relative flex flex-row items-center justify-end pr-5">
          <span className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
              locale: th,
            })}
          </span>
          <div className="absolute top-0">
            <Button
              label="ดู"
              variant="outline-blue"
              onClick={() => console.log('view')}
            />
          </div>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: template?.data.data ?? [],
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
    <div className="flex-1 p-2">
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
