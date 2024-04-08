import Button from '@/components/Button'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useDisclosure } from '@/hooks/useDisclosure'
import ApproveMemberModal from '@/modules/department/components/ApproveMemberModal'
import UserInfoModal from '@/modules/department/components/UserInfoModal'
import { GetDepartmentMemberResponse } from '@/modules/department/hooks/api/types'
import useGetDepartmentMembers from '@/modules/department/hooks/api/useGetDepartmentMembers'
import { RoleMapper } from '@/modules/department/mappers'
import { formatPhoneNumber } from '@/utils/formatUtils'
import {
  ColumnDef,
  PaginationState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import { BiTransfer } from 'react-icons/bi'
import { FaEye } from 'react-icons/fa6'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { green, red, white } from 'tailwindcss/colors'
import { UserRole } from 'types/user'

type PropsType = {
  facultyName: string
  departmentName?: string
  isApproved?: boolean
}

const DepartmentMembersList: React.FC<PropsType> = ({
  facultyName,
  departmentName,
  isApproved = false,
}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [approveMemberModalData, setApproveMemberModalData] = useState<{
    userId: string
    isApproved: boolean
  } | null>(null)

  const { data: members } = useGetDepartmentMembers(isApproved)
  const {
    isOpen: isOpenUserInfo,
    close: closeUserInfo,
    open: openUserInfo,
  } = useDisclosure()
  const {
    isOpen: isOpenApproveMember,
    close: closeApproveMember,
    open: openApproveMember,
  } = useDisclosure()

  const [userData, setUserData] = useState<GetDepartmentMemberResponse | null>(
    null
  )

  const columns: ColumnDef<GetDepartmentMemberResponse>[] = [
    {
      header: 'ที่',
      cell: (info) => (
        <div className="w-8 font-medium text-gray-500">
          {info.row.index + 1}
        </div>
      ),
    },
    {
      header: `ชื่อ-นามสกุล`,
      cell: (info) => (
        <div className="flex w-56 items-center gap-2">
          <img
            src={info.row.original.profileImg}
            alt="profile"
            className="h-8 w-8 rounded-full"
          />
          <div className="space-y-2">
            <h4>{info.row.original.nameTh}</h4>
            <span className="text-sm text-gray-500">
              {info.row.original.emails[info.row.original.defaultEmailIndex]}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: `รหัสประจำตัว`,
      cell: (info) => (
        <div className="w-28 space-y-1">
          {info.row.original.role === UserRole.STUDENT
            ? info.row.original.student!.studentNumber
            : info.row.original.role === UserRole.TEACHER
            ? info.row.original.teacher!.staffNumber
            : info.row.original.staff!.staffNumber}
        </div>
      ),
    },
    {
      header: `เบอร์โทรศัพท์`,
      cell: (info) => (
        <div className="w-28 space-y-1">
          {formatPhoneNumber(
            info.row.original.phones[info.row.original.defaultPhoneIndex]
          )}
        </div>
      ),
    },
    {
      header: `บทบาท`,
      cell: (info) => (
        <div className="w-24 space-y-1">
          {RoleMapper[info.row.original.role]}
        </div>
      ),
    },
    {
      header: `หน่วยงาน`,
      cell: (info) => (
        <div className="w-28 space-y-1">
          {departmentName ? facultyName : departmentName}
        </div>
      ),
    },
    {
      id: 'department',
      size: 1,
      header: `ภาควิชา`,
      cell: (info) => <div className="w-28 space-y-1">{departmentName}</div>,
    },
    {
      header: `ลงทะเบียน`,
      cell: (info) => (
        <div className="w-28 space-y-1">
          {format(info.row.original.createdAt, 'dd MMM yy, HH:mm:ss', {
            locale: th,
          })}
        </div>
      ),
    },
    {
      header: `ดูข้อมูล`,
      cell: (info) => (
        <div
          className="w-14 cursor-pointer "
          onClick={() => {
            setUserData(info.row.original)
            openUserInfo()
          }}
        >
          <FaEye />
        </div>
      ),
    },
    {
      id: 'approve',
      header: 'การตอบรับ',
      size: 1,
      cell: (info) => (
        <div className="flex w-20 gap-2">
          <MdCheckCircle
            className="cursor-pointer"
            size={24}
            color={green[500]}
            onClick={() => {
              setApproveMemberModalData({
                userId: info.row.original.id,
                isApproved: true,
              })
              openApproveMember()
            }}
          />
          <MdCancel
            className="cursor-pointer "
            size={24}
            color={red[500]}
            onClick={() => {
              setApproveMemberModalData({
                userId: info.row.original.id,
                isApproved: false,
              })
              openApproveMember()
            }}
          />
        </div>
      ),
    },
    {
      id: 'transfer',
      header: 'การตอบรับ',
      size: 1,
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            leftIcon={<BiTransfer size={24} color={white} />}
            label="ย้าย"
            variant="yellow"
          />
        </div>
      ),
    },
  ]

  const table = useReactTable({
    columns,
    data: members?.data.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: members?.data.totalPages ?? -1,
    state: {
      columnVisibility: {
        department: !!departmentName,
        approve: !isApproved,
        transfer: isApproved,
      },
    },
  })

  useEffect(() => {
    setPaginationState({
      pageIndex: table.getState().pagination.pageIndex,
      pageSize: table.getState().pagination.pageSize,
    })
  }, [table.getState().pagination.pageIndex])

  return (
    <>
      <div className="p-2">
        <TableDisplay table={table} />
        <Pagination
          totalPage={members?.data.totalPages ?? 0}
          currentPage={table.getState().pagination.pageIndex + 1}
          nextPage={table.nextPage}
          prevPage={table.previousPage}
        />
      </div>
      <UserInfoModal
        isOpen={isOpenUserInfo}
        onClose={closeUserInfo}
        userData={userData}
        departmentName={facultyName}
      />
      <ApproveMemberModal
        isOpen={isOpenApproveMember}
        onClose={closeApproveMember}
        userId={approveMemberModalData?.userId}
        isApproved={approveMemberModalData?.isApproved}
      />
    </>
  )
}

export default DepartmentMembersList
