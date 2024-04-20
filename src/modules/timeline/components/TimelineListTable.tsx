import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import TableInfoBox from '@/components/TableInfoBox'
import TableStatusBox from '@/components/TableStatusBox'
import { FaRegEnvelope } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useGetAllTimeline from '../hooks/api/useGetAllTimeline'
import { Timeline } from '../types/response'
import TimelineDescriptionBox from './TimelineDescriptionBox'

// import useGetAllDocument from '../hooks/api/useGetAllDocument'
// import { Document } from '../types/types'

const StyledTableRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  padding-right: 20px;
  & > div {
    display: none;
  }
  &:hover > div {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
`

const TimelineListTable = () => {
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: timeline } = useGetAllTimeline(paginationState.pageIndex + 1)

  console.log('timeline', timeline?.data)
  const columns: ColumnDef<Timeline>[] = [
    {
      id: 'index',
      size: 20,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      id: 'status',
      size: 20,
      header: (info) => (
        // <div className="relative">
        <div className=" flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด{' '}
          <span className="text-blue-500">{info.table.getRowCount()}</span> ฉบับ
          รอดำเนินการ test ฉบับ
        </div>
        // </div>
      ),
      cell: (info) => (
        <span className="font-semibold text-blue-500">
          {info.row.original.status}
        </span>
      ),
    },
    {
      id: 'documentId',
      size: 20,
      header: '',
      cell: (info) => (
        <TableInfoBox
          title={info.row.original.document.title}
          createdAt={new Date(info.row.original.createdAt).toLocaleDateString()}
          createdBy={'test'}
          updatedBy={'test'}
        />
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <TableStatusBox
          status={info.row.original.status}
          updatedAt={new Date(info.row.original.createdAt).toLocaleDateString()}
        />
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: timeline?.data?.data ?? [],
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
    <div className="flex">
      <div className="flex-1 p-2">
        <TableDisplay table={table} />
        <Pagination
          totalPage={1}
          currentPage={table.getState().pagination.pageIndex + 1}
          nextPage={table.nextPage}
          prevPage={table.previousPage}
        />
      </div>
      <TimelineDescriptionBox />
    </div>
  )
}

export default TimelineListTable
