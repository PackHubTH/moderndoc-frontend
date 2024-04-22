import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useDisclosure } from '@/hooks/useDisclosure'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import UserInviteModal from '../../components/UserInviteModal'
import { GetAllDepartmentsResponse } from '../../hooks/api/types'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'

const AllDepartmentsList = () => {
  const navigate = useNavigate()

  const { open, close, isOpen } = useDisclosure()

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const { data: departments, refetch } = useGetAllDepartments(
    paginationState.pageIndex + 1
  )
  const columns: ColumnDef<GetAllDepartmentsResponse>[] = [
    {
      id: 'index',
      size: 30,
      header: 'ที่',
      cell: (info) => (
        <span className="font-medium text-gray-500">{info.row.index + 1}</span>
      ),
    },
    {
      size: 30,
      header: 'หน่วยงาน/คณะ',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.faculty?.name ?? info.row.original.name}
        </span>
      ),
    },
    {
      size: 30,
      header: 'สาขาวิชา',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.name}
        </span>
      ),
    },
    {
      size: 30,
      header: 'จำนวนบุคลากร (คน)',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.staffCount}
        </span>
      ),
    },
    {
      size: 30,
      header: 'รอการตอบรับ (คน)',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.awaitingApprovalCount}
        </span>
      ),
    },
    {
      header: `ดูข้อมูล`,
      cell: (info) => (
        <div
          className="cursor-pointer "
          onClick={() => {
            navigate(`/department-management/${info.row.original.id}`)
          }}
        >
          <FaEye />
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: departments?.data.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: departments?.data.totalPages ?? -1,
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])
  return (
    <>
      <PageContainer className="p-8">
        <h1 className="mb-6 flex items-center gap-4 text-2xl font-bold">
          จัดการหน่วยงาน{' '}
          <Button
            label="ส่งคำเชิญสร้างบัญชี"
            variant="green"
            leftIcon={<IoIosSend />}
            onClick={open}
          />
        </h1>

        <div className="p-2">
          <TableDisplay table={table} />
          <Pagination
            totalPage={departments?.data.totalPages ?? 0}
            currentPage={table.getState().pagination.pageIndex + 1}
            nextPage={table.nextPage}
            prevPage={table.previousPage}
          />
        </div>
      </PageContainer>
      <UserInviteModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default AllDepartmentsList
