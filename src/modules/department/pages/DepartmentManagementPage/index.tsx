import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import { useDisclosure } from '@/hooks/useDisclosure'
import useGetDepartmentById from '@/modules/user/hooks/api/useGetDepartmentById'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { ApprovalStatus } from '@/modules/user/hooks/types'
import { useMemo } from 'react'
import { IoIosSend } from 'react-icons/io'
import { MdArrowBackIos } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { UserRole } from 'types/user'
import UserInviteModal from '../../components/UserInviteModal'
import AllDepartmentsList from '../AllDepartmentsList'
import DepartmentMembersList from './DepartmentMembersListTable'
import DepartmentRejectedPage from './DepartmentRejectedPage'
import WaitForApprovalPage from './WaitForApprovalPage'

const DepartmentManagementPage = () => {
  const departmentId = useParams<{ departmentId?: string }>().departmentId ?? ''
  const navigate = useNavigate()

  const { data: userData } = useGetUser()

  const { isOpen, close, open } = useDisclosure()

  const defaultDepartmentId = useMemo(() => {
    if (userData?.data.role === UserRole.ADMIN) {
      return departmentId ?? ''
    }
    if (userData?.data.role === UserRole.STAFF) {
      return userData?.data.staff?.staffDepartments[0].departmentId
    } else if (userData?.data.role === UserRole.TEACHER) {
      return userData?.data?.teacher?.teacherDepartments[0].departmentId
    }
  }, [userData, departmentId])

  const { data: departmentData } = useGetDepartmentById(defaultDepartmentId!)

  if (userData?.data.role === UserRole.ADMIN && departmentId === '') {
    return <AllDepartmentsList />
  }

  if (
    userData?.data.role !== UserRole.STAFF &&
    userData?.data.role !== UserRole.ADMIN
  ) {
    return <PageContainer>คุณไม่มีสิทธิ์เข้าถึงหน้านี้</PageContainer>
  }

  if (
    userData?.data.staff?.staffDepartments.find(
      (department) => department.departmentId === defaultDepartmentId
    )?.isApproved === ApprovalStatus.PENDING
  ) {
    return (
      <WaitForApprovalPage departmentName={departmentData?.data.name || ''} />
    )
  }
  if (
    userData?.data.staff?.staffDepartments.find(
      (department) => department.departmentId === defaultDepartmentId
    )?.isApproved === ApprovalStatus.REJECTED
  ) {
    return (
      <DepartmentRejectedPage
        departmentName={departmentData?.data.name || ''}
      />
    )
  }

  if (!departmentData) return <PageContainer>Loading...</PageContainer>

  return (
    <>
      <PageContainer className="p-8">
        <h1 className="mb-6 flex items-center gap-4 text-2xl font-bold">
          {departmentId && (
            <span
              className="cursor-pointer"
              onClick={() => {
                navigate(-1)
              }}
            >
              <MdArrowBackIos />
            </span>
          )}
          สังกัด: {departmentData.data.name}
          <Button
            label="ส่งคำเชิญสร้างบัญชี"
            variant="green"
            leftIcon={<IoIosSend />}
            onClick={open}
          />
        </h1>
        <Tabs
          tabs={[
            {
              content: (
                <DepartmentMembersList
                  isApproved
                  facultyName={
                    departmentData.data.faculty?.name ??
                    departmentData.data.name
                  }
                  departmentName={departmentData.data.name}
                  departmentId={departmentId}
                />
              ),
              title: 'สังกัด/หน่วยงานของฉัน',
            },
            {
              content: (
                <DepartmentMembersList
                  facultyName={
                    departmentData.data.faculty?.name ??
                    departmentData.data.name
                  }
                  departmentName={departmentData.data.name}
                  departmentId={defaultDepartmentId}
                />
              ),
              title: 'รอการตอบรับ',
            },
          ]}
        />
      </PageContainer>
      <UserInviteModal isOpen={isOpen} onClose={close} />
    </>
  )
}

export default DepartmentManagementPage
