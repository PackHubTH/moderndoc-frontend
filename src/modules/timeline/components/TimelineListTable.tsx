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
import { useDisclosure } from '@/hooks/useDisclosure'
import useGetDocumentById from '@/modules/document/hooks/api/useGetDocumentById'
import { FaRegEnvelope } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import useGetAllTimeline from '../hooks/api/useGetAllTimeline'
import { Timeline } from '../types/response'
import TimelineDescriptionBox from './TimelineDescriptionBox'
import TimelineStatusBox from './TimelineStatusBox'

const TimelineListTable = () => {
  const { isOpen, open } = useDisclosure()
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: timeline } = useGetAllTimeline(paginationState.pageIndex + 1)
  const [documentId, setDocumentId] = useState('')
  const { data: documentData, refetch } = useGetDocumentById(documentId)

  console.log('timeline', timeline?.data)
  console.log('documentData', documentData?.data?.documentTimelines)
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
      cell: (info) => <TimelineStatusBox status={info.row.original.status} />,
    },
    {
      id: 'documentId',
      size: 20,
      header: '',
      cell: (info) => (
        <TableInfoBox
          title={info.row.original.document.title}
          createdAt={new Date(info.row.original.createdAt).toLocaleDateString()}
          createdBy={info.row.original.document.userCreated.nameTh}
          createdByImg={info.row.original.document.userCreated.profileImg}
          updatedBy={info.row.original.document.operator.nameTh}
          updatedByImg={info.row.original.document.operator.profileImg}
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

  const onRowClick = (row: any) => {
    setDocumentId(row.original.documentId)
    if (documentId) refetch()
    open()
  }

  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <TableDisplay table={table} onClick={onRowClick} />
        <Pagination
          totalPage={1}
          currentPage={table.getState().pagination.pageIndex + 1}
          nextPage={table.nextPage}
          prevPage={table.previousPage}
        />
      </div>
      {isOpen && documentData && (
        <TimelineDescriptionBox data={documentData?.data} />
      )}
    </div>
  )
}

export default TimelineListTable
