import {
  ColumnDef,
  PaginationState,
  Row,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { Document, DocumentSentStatus, DocumentStatus } from '../types/types'
import { getStatusBadgeProps, shouldShowAction } from '../utils/statusUtils'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useUserStore } from '@/stores/userStore'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FaRegEnvelope } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import useGetAllDocument from '../hooks/api/useGetAllDocument'

interface PropsType {
  type: 'ALL' | 'SENT' | 'RECEIVED'
}

const DocumentListTable = ({ type }: PropsType) => {
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [hoveredRow, setHoveredRow] = useState<Row<Document> | null>(null)
  const user = useUserStore((state) => state.user)
  const { data: document, refetch } = useGetAllDocument(
    paginationState.pageIndex + 1,
    type
  )

  const columns: ColumnDef<Document>[] = [
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
          <div className="flex gap-2">
            <p className="flex items-center gap-2 text-sm">
              สร้างโดย
              <img
                src={info.row.original.userCreated?.profileImg}
                alt="create-by-img"
                className="h-5 w-5 rounded-full"
              />
              {info.row.original.userCreated?.nameTh}
            </p>
            {info.row.original.operator && (
              <p className="flex items-center gap-2 text-sm">
                ดำเนินการโดย
                <img
                  src={info.row.original.operator?.profileImg}
                  alt="create-by-img"
                  className="h-5 w-5 rounded-full"
                />
                {info.row.original.operator?.nameTh}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <div className="flex flex-col items-end justify-end">
          <Badge
            {...getStatusBadgeProps(
              info.row.original.status as DocumentStatus,
              (info.row.original.documentSents?.find(
                (sent) => sent.receiverId === user.id
              )?.status as DocumentSentStatus) ?? '',
              (info.row.original.documentSents?.find(
                (sent) => sent.senderId === user.id
              )?.status as DocumentSentStatus) ?? '',
              info.row.original.createdBy === user.id,
              user.role
            )}
          />
          <p className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy, p', {
              locale: th,
            })}
          </p>
          {hoveredRow && hoveredRow.id === info.row.id && (
            <div className="absolute right-2 top-4 space-x-2">
              {shouldShowAction(
                info.row.original.status,
                info.row.original.documentSents?.find(
                  (sent) => sent.receiverId === user.id
                )?.status ?? ''
              ) && (
                <Button
                  label="ดำเนินการ"
                  variant="outline-blue"
                  onClick={() =>
                    navigate(`/edit-document/${info.row.original.id}`)
                  }
                />
              )}
              <Dropdown
                label="เพิ่มเติม"
                dropdownSection={[
                  {
                    lists: [
                      {
                        displayText: 'ดูรายละเอียด',
                        onClick: () =>
                          navigate(`/edit-document/${info.row.original.id}`),
                      },
                      {
                        displayText: 'คัดลอก',
                        onClick: () =>
                          navigate(`/edit-document/${info.row.original.id}`),
                      },
                      {
                        displayText: 'ลบเอกสาร',
                        onClick: () =>
                          navigate(`/edit-document/${info.row.original.id}`),
                      },
                    ],
                  },
                ]}
              />
            </div>
          )}
        </div>
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
      <TableDisplay table={table} onHoverRow={setHoveredRow} />
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
