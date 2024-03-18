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
import { useEffect, useState } from 'react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline, MdRemoveRedEye } from 'react-icons/md'
import useGetDepartmentFaqs from '../../hooks/api/useGetDepartmentFaqs'
import { Faq } from '../../types'

const FaqListTable = () => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data: faqs, refetch } = useGetDepartmentFaqs(
    paginationState.pageIndex + 1
  )

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
      header: `ทั้งหมด ${faqs?.data.totalFaqsCount} ข้อมูล`,
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
            <div className="flex items-center gap-2 ">
              <span className="font-semibold text-blue-500 ">
                {info.row.original.titleTh}
              </span>
              <img
                className="w-6 rounded-full"
                src={info.row.original.userUpdated.profileImg}
              />
              <span className="text-sm font-semibold text-gray-400">
                อัปเดตโดย {info.row.original.userUpdated.nameTh}
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

  const table = useReactTable({
    columns,
    data: faqs?.data.faqs ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: faqs?.data.totalPages ?? -1,
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])

  return (
    <div className="p-2">
      <TableDisplay table={table} />
      <Pagination
        totalPage={faqs?.data.totalPages ?? 0}
        currentPage={table.getState().pagination.pageIndex + 1}
        nextPage={table.nextPage}
        prevPage={table.previousPage}
      />
    </div>
  )
}

export default FaqListTable