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
import { FaRegEnvelope } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useGetAllTemplate from '../hooks/api/useGetAllTemplate'
import { Template } from '../types/types'
import TemplateCopyModal from './TemplateCopyModal'
import TemplateDeleteModal from './TemplateDeleteModal'

const StyledTableRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  padding-right: 20px;
`

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
      header: (info) => (
        <div className="flex items-center gap-2 font-semibold">
          <FaRegEnvelope />
          ทั้งหมด{' '}
          <span className="text-blue-500">{info.table.getRowCount()}</span> ฉบับ
        </div>
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
        <StyledTableRow>
          <p className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
              locale: th,
            })}
          </p>
          {hoveredRow && hoveredRow.id === info.row.id && (
            <div className="absolute right-0 space-x-2">
              <Button
                label="แก้ไข"
                onClick={() =>
                  navigate(`/edit-template/${info.row.original.id}`)
                }
              />
              <Button
                label="คัดลอก"
                variant="outline-blue"
                onClick={openCopyModal}
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
                onClick={openDeleteModal}
              />
              <TemplateDeleteModal
                isOpen={isDeleteModalOpen}
                templateId={info.row.original.id}
                close={closeDeleteModal}
              />
            </div>
          )}
        </StyledTableRow>
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

export default TemplateListTable
