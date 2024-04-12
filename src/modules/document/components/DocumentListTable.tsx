import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FaRegEnvelope } from 'react-icons/fa6'
import styled from 'styled-components'
import useGetAllDocument from '../hooks/api/useGetAllDocument'
import { Document } from '../types/types'

const StyledTableRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
  & > div {
    display: none;
  }
  & > div:hover {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
`

const DocumentListTable = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: document, refetch } = useGetAllDocument(
    paginationState.pageIndex + 1,
    'ALL'
  )
  const columns: ColumnDef<Document>[] = [
    {
      id: 'index',
      size: 20,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      id: 'documentTitle',
      size: 20,
      header: (info) => (
        <div className="flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด{' '}
          <span className="text-blue-500">{info.table.getRowCount()}</span> ฉบับ
        </div>
      ),
      cell: (info) => (
        <div>
          <p>
            <span className="mr-2 font-semibold text-blue-500">
              {info.row.original.title}
            </span>
            วันที่สร้างเอกสาร TEST
          </p>
          <p>
            สร้างโดย {info.row.original.userCreated.nameTh} ดำเนินการโดย{' '}
            {info.row.original.operator?.nameTh}
          </p>
        </div>
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        // <div className="relative flex flex-col items-end justify-end pr-5">
        <StyledTableRow>
          <Badge label={info.row.original.status} variant="waiting" />
          <p className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
              locale: th,
            })}
          </p>
          <div className="absolute top-0">
            <Button
              label="ดำเนินการ"
              variant="outline-blue"
              onClick={() => console.log('view')}
            />
          </div>
        </StyledTableRow>
        // </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: document?.data ?? [],
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

export default DocumentListTable
