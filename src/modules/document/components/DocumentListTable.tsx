import {
  ColumnDef,
  PaginationState,
  Row,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { FaCopy, FaEye } from 'react-icons/fa'
import { Document, DocumentStatus } from '../types/types'
import { getStatusBadgeProps, shouldShowAction } from '../utils/statusUtils'

import Badge from '@/components/Badge'
import Button from '@/components/Button'
import DropdownItem from '@/components/Dropdown/DropdownItem'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useUserStore } from '@/stores/userStore'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { FaRegEnvelope } from 'react-icons/fa6'
import { HiTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import useGetAllDocument from '../hooks/api/useGetAllDocument'

interface PropsType {
  type:
    | 'ASSIGNED_TO_ME'
    | 'PROCESSING'
    | 'COMPLETED'
    | 'CANCELED'
    | 'DRAFT'
    | 'ALL'
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
          ทั้งหมด <span className="text-blue-500">
            {document?.data?.total}
          </span>{' '}
          ฉบับ
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
              info.row.original.documentSents ?? [],
              info.row.original.status as DocumentStatus,
              user.id,
              info.row.original.createdBy,
              info.row.original.operatorId
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
                  onClick={() =>
                    navigate(`/edit-document/${info.row.original.id}`)
                  }
                />
              )}
              <div className="hs-dropdown relative z-20 inline-flex">
                <Button
                  id="hs-dropdown-with-title"
                  label="เพิ่มเติม"
                  variant="outline-blue"
                  // onClick={() =>
                  //   navigate(`/edit-document/${info.row.original.id}`)
                  // }
                />
                <div
                  className="hs-dropdown-menu duration mt-2 hidden min-w-[15rem] divide-y divide-gray-200 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100"
                  aria-labelledby="hs-dropdown-with-title"
                >
                  <div className="py-2 first:pt-0 last:pb-0">
                    <DropdownItem
                      displayText="ดูรายละเอียด"
                      icon={<FaEye className="text-blue-500" />}
                      onClick={() =>
                        navigate(`/view-document/${info.row.original.id}`)
                      }
                    />
                    <DropdownItem
                      displayText="คัดลอก"
                      icon={<FaCopy className="text-blue-500" />}
                    />
                    <DropdownItem
                      displayText="ลบเอกสาร"
                      icon={<HiTrash className="text-red-500" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: document?.data?.data ?? [],
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
        totalPage={document?.data?.totalPages ?? 1}
        currentPage={table.getState().pagination.pageIndex + 1}
        nextPage={table.nextPage}
        prevPage={table.previousPage}
      />
    </div>
  )
}

export default DocumentListTable
