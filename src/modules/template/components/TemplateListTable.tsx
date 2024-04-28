import {
  ColumnDef,
  PaginationState,
  Row,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'

import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useDisclosure } from '@/hooks/useDisclosure'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import useGetAllTemplate from '../hooks/api/useGetAllTemplate'
import { Template } from '../types/types'
import TemplateCopyModal from './TemplateCopyModal'
import TemplateDeleteModal from './TemplateDeleteModal'
import TemplateInfoBox from './TemplateInfoBox'

const TemplateListTable = () => {
  const {
    isOpen: isCopyModalOpen,
    close: closeCopyModal,
    open: openCopyModal,
  } = useDisclosure()
  const {
    isOpen: isDeleteModalOpen,
    close: closeDeleteModal,
    open: openDeleteModal,
  } = useDisclosure()
  const { isOpen: isInfoBoxOpen, open: openInfoBox } = useDisclosure()
  const navigate = useNavigate()
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [hoveredRow, setHoveredRow] = useState<Row<Document> | null>(null)

  const { data: template, refetch } = useGetAllTemplate(
    paginationState.pageIndex + 1
  )
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
      header: () => (
        <span>
          ทั้งหมด <span className="text-blue-500">{template?.data.count}</span>{' '}
          ฉบับ
        </span>
      ),
      cell: (info) => (
        <div>
          <h1 className="font-semibold text-blue-500">
            {info.row.original.title}
          </h1>
          <p className="flex items-center gap-2 text-sm">
            สร้างโดย
            <img
              src={info.row.original.userCreated.profileImg}
              alt="create-by-img"
              className="h-5 w-5 rounded-full"
            />
            {info.row.original.userCreated.nameTh}
          </p>
        </div>
      ),
    },
    {
      id: 'templateLastUpdatedAt',
      header: '',
      cell: (info) => (
        <div className="flex justify-end">
          <p className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
              locale: th,
            })}
          </p>
          {hoveredRow && hoveredRow.id === info.row.id && (
            <div className="absolute right-4 top-3 space-x-2">
              <Button
                label="แก้ไข"
                onClick={() =>
                  navigate(`/edit-template/${info.row.original.id}`)
                }
              />
              <Button
                label="คัดลอก"
                variant="outline-blue"
                onClick={(e) => {
                  e.stopPropagation()
                  openCopyModal()
                }}
              />
              <TemplateCopyModal
                isOpen={isCopyModalOpen}
                templateId={info.row.original.id}
                templateTitle={info.row.original.title}
                close={closeCopyModal}
              />
              <Button
                label="ลบ"
                variant="outline-blue"
                onClick={(e) => {
                  e.stopPropagation()
                  openDeleteModal()
                }}
              />
              <TemplateDeleteModal
                isOpen={isDeleteModalOpen}
                templateId={info.row.original.id}
                close={closeDeleteModal}
              />
            </div>
          )}
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

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  )
  const onRowClick = (row: any) => {
    openInfoBox()
    setSelectedTemplate(row.original)
  }

  return (
    <div className="flex">
      <div className="flex-1 p-2">
        <TableDisplay
          table={table}
          onHoverRow={setHoveredRow}
          onClick={onRowClick}
        />
        <Pagination
          totalPage={template?.data.totalPages ?? 1}
          currentPage={table.getState().pagination.pageIndex + 1}
          nextPage={table.nextPage}
          prevPage={table.previousPage}
        />
      </div>
      {isInfoBoxOpen && selectedTemplate && (
        <TemplateInfoBox data={selectedTemplate} />
      )}
    </div>
  )
}

export default TemplateListTable
