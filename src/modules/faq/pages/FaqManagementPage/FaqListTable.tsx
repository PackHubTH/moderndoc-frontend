import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import Tag from '@/components/Tag'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline, MdRemoveRedEye } from 'react-icons/md'
import useGetDepartmentFaqs from '../../hooks/api/useGetFaqList'
import { Faq } from '../../types'

const columns: ColumnDef<Faq>[] = [
  {
    id: 'index',
    size: 30,
    header: 'ที่',
    cell: (info) => (
      <span className="font-medium text-gray-500">{info.row.index + 1}</span>
    ),
  },
  {
    id: 'tags',
    size: 60,
    header: 'ทั้งหมด 53 ข้อมูล',
    cell: (info) => (
      <div className="space-y-1">
        {info.row.original.faqTags.map((tag) => (
          <Tag name={tag.tag.name} />
        ))}
      </div>
    ),
  },
  {
    id: 'faqInfo',
    size: 400,
    header: '',
    cell: (info) => (
      <div className="flex flex-row items-center justify-between">
        <div>
          <div className="space-x-2">
            <span className="font-semibold text-blue-500 ">
              {info.row.original.titleTh}
            </span>
            <span className="text-sm font-semibold text-gray-400">
              สร้างโดย {info.row.original.createdBy}
            </span>
          </div>
          <span className="text-gray-400">
            อัพเดตล่าสุดเมื่อ{' '}
            {format(info.row.original.lastUpdatedAt, 'dd MMM yy', {
              locale: th,
            })}
          </span>
        </div>
        <div className="flex gap-3">
          <MdModeEditOutline
            size={18}
            className="cursor-pointer rounded-full text-blue-500"
          />
          <MdRemoveRedEye
            size={18}
            className="cursor-pointer rounded-full text-blue-500"
          />
          <HiTrash
            size={18}
            className="cursor-pointer rounded-full text-red-500"
          />
        </div>
      </div>
    ),
  },
]

const FaqListTable = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: faqs } = useGetDepartmentFaqs(paginationState.pageIndex + 1)

  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getCoreRowModel(),
    onPaginationChange: (paginationState) =>
      setPaginationState(paginationState),
    state: {
      pagination: paginationState,
    },
    data: faqs?.data ?? [],
  })

  return (
    <div className="p-2">
      <TableDisplay table={table} />
      <Pagination
        paginationState={paginationState}
        setPaginationState={setPaginationState}
        totalPage={10}
      />
    </div>
  )
}

export default FaqListTable
