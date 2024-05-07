import Button from '@/components/Button'
import Loading from '@/components/Loading'
import TableDisplay from '@/components/TableDisplay'
import Pagination from '@/components/TableDisplay/Pagination'
import { useDisclosure } from '@/hooks/useDisclosure'
import ApproveMemberModal from '@/modules/department/components/ApproveMemberModal'
import SwapMemberModal from '@/modules/department/components/SwapMemberDepartment'
import UserInfoModal from '@/modules/department/components/UserInfoModal'
import { GetDepartmentMemberResponse } from '@/modules/department/hooks/api/types'
import useGetDepartmentMembers from '@/modules/department/hooks/api/useGetDepartmentMembers'
import { RoleMapper } from '@/modules/department/mappers'
import { DepartmentType } from '@/modules/user/hooks/types'
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
  isApproved?: boolean
  departmentId?: string
}

const DepartmentMembersList: React.FC<PropsType> = ({
  isApproved = false,
  departmentId,
}) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [approveMemberModalData, setApproveMemberModalData] = useState<{
    userId: string
    isApproved: boolean
    departmentId: string
    page: number
  } | null>(null)

  const [swapMemberModalData, setSwapMemberModalData] = useState<{
    userId: string
    departmentId: string
    departmentName?: string
  } | null>(null)

  const {
    data: members,
    refetch,
    isFetched: membersIsFetched,
  } = useGetDepartmentMembers(
    paginationState.pageIndex + 1,
    isApproved,
    departmentId
  )

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
  const {
    isOpen: isOpenSwapMember,
    close: closeSwapMember,
    open: openSwapMember,
  } = useDisclosure()

  const [userData, setUserData] = useState<{
    data: GetDepartmentMemberResponse
    departmentName: string
  }>()

  const getUserDepartment = (
    user: GetDepartmentMemberResponse,
    agencyDash?: boolean
  ) => {
    if (user.role === UserRole.STAFF) {
      if (
        agencyDash &&
        user.staff?.staffDepartments?.[0]?.department?.type ===
          DepartmentType.AGENCY
      ) {
        return undefined
      }
      return user.staff?.staffDepartments?.[0]?.department ?? undefined
    }
    if (user.role === UserRole.TEACHER) {
      if (
        agencyDash &&
        user.staff?.staffDepartments?.[0]?.department?.type ===
          DepartmentType.AGENCY
      ) {
        return undefined
      }
      return user.teacher?.TeacherDepartment?.[0]?.department ?? undefined
    }
  }

  const getUserFaculty = (user: GetDepartmentMemberResponse) => {
    if (user.role === UserRole.STAFF) {
      return (
        user.staff?.staffDepartments?.[0]?.department?.faculty ??
        getUserDepartment(user)
      )
    }
    if (user.role === UserRole.TEACHER) {
      return (
        user.teacher?.TeacherDepartment?.[0]?.department?.faculty ??
        getUserDepartment(user)
      )
    }
  }

  const columns: ColumnDef<GetDepartmentMemberResponse>[] = [
    {
      header: 'ที่',
      cell: (info) => (
        <div className="w-8 font-medium text-gray-500">
          {info.row.index +
            1 +
            paginationState.pageIndex * paginationState.pageSize}
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
      cell: (info) => {
        return (
          <div className="w-28 space-y-1">
            {getUserFaculty(info.row.original)?.name ?? '-'}
          </div>
        )
      },
    },
    {
      id: 'department',
      size: 1,
      header: `ภาควิชา`,
      cell: (info) => (
        <div className="w-28 space-y-1">
          {getUserDepartment(info.row.original, true)?.name ?? '-'}
        </div>
      ),
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
            setUserData({
              data: info.row.original,
              departmentName: getUserDepartment(info.row.original)!.name,
            })
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
                departmentId: getUserDepartment(info.row.original)!.id,
                page: paginationState.pageIndex + 1,
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
                departmentId: getUserDepartment(info.row.original)!.id,
                page: paginationState.pageIndex + 1,
              })
              openApproveMember()
            }}
          />
        </div>
      ),
    },
    {
      id: 'transfer',
      header: 'ย้าย',
      size: 1,
      cell: (info) => (
        <div className="flex gap-2">
          <Button
            leftIcon={<BiTransfer size={24} color={white} />}
            label="ย้าย"
            variant="yellow"
            onClick={() => {
              setSwapMemberModalData({
                userId: info.row.original.id,
                departmentId: departmentId!,
                departmentName: getUserDepartment(info.row.original)!.name,
              })
              openSwapMember()
            }}
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

  useEffect(() => {
    refetch()
  }, [departmentId])

  useEffect(() => {
    setPaginationState({
      pageIndex: 0,
      pageSize: 10,
    })
    table.setPagination({
      pageIndex: 0,
      pageSize: 10,
    })
  }, [isApproved])

  return (
    <>
      <div className="p-2">
        {membersIsFetched ? (
          <>
            <TableDisplay table={table} />
            <Pagination
              totalPage={members?.data.totalPages ?? 0}
              currentPage={table.getState().pagination.pageIndex + 1}
              nextPage={table.nextPage}
              prevPage={table.previousPage}
            />
          </>
        ) : (
          <Loading />
        )}
      </div>
      <UserInfoModal
        isOpen={isOpenUserInfo}
        onClose={closeUserInfo}
        userData={userData?.data}
        departmentName={userData?.departmentName ?? ''}
      />
      <ApproveMemberModal
        isOpen={isOpenApproveMember}
        onClose={closeApproveMember}
        userId={approveMemberModalData?.userId}
        isApproved={approveMemberModalData?.isApproved}
        page={approveMemberModalData?.page}
        departmentId={approveMemberModalData?.departmentId}
        callback={refetch}
      />
      <SwapMemberModal
        isOpen={isOpenSwapMember}
        onClose={closeSwapMember}
        oldDepartmentName={swapMemberModalData?.departmentName}
        memberUserId={swapMemberModalData?.userId}
      />
    </>
  )
}

export default DepartmentMembersList
