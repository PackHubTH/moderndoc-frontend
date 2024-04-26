import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useDisclosure } from '@/hooks/useDisclosure'
import DeleteDepartmentModal from '@/modules/faq/components/DeleteDepartmentModal'
import { Department, DepartmentType } from '@/modules/user/hooks/types'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { FaEye, FaPlus } from 'react-icons/fa6'
import { HiTrash } from 'react-icons/hi'
import { IoIosSend } from 'react-icons/io'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { blue, gray, red } from 'tailwindcss/colors'
import CreateDepartmentModal from '../../components/CreateDepartmentModal'
import UserInviteModal from '../../components/UserInviteModal'
import { GetAllDepartmentsResponse } from '../../hooks/api/types'
import useGetAllDepartments from '../../hooks/api/useGetAllDepartments'

const AllDepartmentsList = () => {
  const navigate = useNavigate()

  const [deleteDepartment, setDeleteDepartment] = useState<Department | null>(
    null
  )
  const [editDepartment, setEditDepartment] = useState<Department | null>(null)

  const [isEdit, setIsEdit] = useState(false)

  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const {
    open: openInviteModal,
    close: closeInviteModal,
    isOpen: isOpenInviteModal,
  } = useDisclosure()

  const {
    open: openCreateDepartmentModal,
    close: closeCreateDepartmentModal,
    isOpen: isOpenCreateDepartmentModal,
  } = useDisclosure()

  const {
    open: openDeleteDepartmentModal,
    close: closeDeleteDepartmentModal,
    isOpen: isOpenDeleteDepartmentModal,
  } = useDisclosure()

  const { data: departments, refetch } = useGetAllDepartments(
    paginationState.pageIndex + 1
  )

  const columns: ColumnDef<GetAllDepartmentsResponse>[] = [
    {
      id: 'index',
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
      header: 'หน่วยงาน/คณะ',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.faculty?.name ?? info.row.original.name}
        </span>
      ),
    },
    {
      header: 'สาขาวิชา',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.type === DepartmentType.AGENCY
            ? '-'
            : info.row.original.name}
        </span>
      ),
    },
    {
      header: 'จำนวนบุคลากร (คน)',
      cell: (info) => (
        <span className="font-medium text-gray-500">
          {info.row.original.staffCount}
        </span>
      ),
    },
    {
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
          className="cursor-pointer"
          onClick={() => {
            navigate(`/department-management/${info.row.original.id}`)
          }}
        >
          <FaEye className="text-blue-500" />
        </div>
      ),
    },
    {
      header: `เพิ่มเติม`,
      cell: (info) => (
        <div className="flex gap-3">
          <MdModeEditOutline
            size={24}
            className="cursor-pointer rounded-full"
            style={{
              color:
                info.row.original.type === DepartmentType.AGENCY
                  ? blue[500]
                  : gray[300],
              cursor:
                info.row.original.type === DepartmentType.AGENCY
                  ? 'pointer'
                  : 'not-allowed',
            }}
            onClick={() => {
              setEditDepartment(info.row.original as Department)
              setIsEdit(true)
              openCreateDepartmentModal()
            }}
          />
          <HiTrash
            size={24}
            className="cursor-pointer rounded-full text-red-500"
            style={{
              color:
                info.row.original.type === DepartmentType.AGENCY
                  ? red[500]
                  : gray[300],
              cursor:
                info.row.original.type === DepartmentType.AGENCY
                  ? 'pointer'
                  : 'not-allowed',
            }}
            onClick={() => {
              setDeleteDepartment(info.row.original as Department)
              openDeleteDepartmentModal()
            }}
          />
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
            onClick={openInviteModal}
          />
          <Button
            label="เพิ่มหน่วยงาน"
            leftIcon={<FaPlus color="white" />}
            variant="yellow"
            onClick={openCreateDepartmentModal}
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
      <UserInviteModal isOpen={isOpenInviteModal} onClose={closeInviteModal} />
      <CreateDepartmentModal
        isOpen={isOpenCreateDepartmentModal}
        onClose={closeCreateDepartmentModal}
        mode={isEdit ? 'edit' : 'create'}
        department={isEdit ? editDepartment : null}
        callback={refetch}
      />
      <DeleteDepartmentModal
        department={deleteDepartment}
        isOpen={isOpenDeleteDepartmentModal}
        onClose={closeDeleteDepartmentModal}
        callback={refetch}
      />
    </>
  )
}

export default AllDepartmentsList
