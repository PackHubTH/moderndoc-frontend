import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import Loading from '@/components/Loading'
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
import { getTimelineStatusBadge } from '../utils/timelineStatus'
import TimelineDescriptionBox from './TimelineDescriptionBox'
import TimelineStatusBox from './TimelineStatusBox'

const TimelineListTable = () => {
  const { isOpen, open } = useDisclosure()
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: timeline, isFetched } = useGetAllTimeline(
    paginationState.pageIndex + 1
  )
  const [documentId, setDocumentId] = useState('')
  const { data: documentData, refetch } = useGetDocumentById(documentId)

  const columns: ColumnDef<Timeline>[] = [
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
      id: 'status',
      size: 20,
      header: (info) => (
        <div className=" flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด{' '}
          <span className="text-blue-500">
            {timeline?.data?.total ?? 0}
          </span>{' '}
          ฉบับ
        </div>
      ),
      cell: (info) => (
        <TimelineStatusBox
          status={
            getTimelineStatusBadge(
              info.row.original.documentStatus,
              info.row.original.status,
              info.row.original.updatedBy,
              info.row.original.userId
            ).label
          }
          icon={
            <img
              className="w-5"
              src={
                getTimelineStatusBadge(
                  info.row.original.documentStatus,
                  info.row.original.status,
                  info.row.original.updatedBy,
                  info.row.original.userId
                ).icon
              }
              alt="icon"
            />
          }
        />
      ),
    },
    {
      id: 'documentId',
      size: 20,
      header: '',
      cell: (info) => (
        <TableInfoBox
          title={info.row.original.document.title}
          createdAt={info.row.original.document.createdAt}
          userCreatedBy={info.row.original.document?.userCreated}
          userUpdatedBy={info.row.original.userUpdatedBy}
        />
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <TableStatusBox
          {...getTimelineStatusBadge(
            info.row.original.documentStatus,
            info.row.original.status,
            info.row.original.updatedBy,
            info.row.original.userId
          )}
          updatedAt={info.row.original.createdAt}
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

  if (!isFetched) return <Loading />

  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <TableDisplay table={table} onClick={onRowClick} />
        <Pagination
          totalPage={timeline?.data.totalPages ?? 1}
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
