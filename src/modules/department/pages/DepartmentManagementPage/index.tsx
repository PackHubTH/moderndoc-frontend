import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import useGetDepartmentById from '@/modules/user/hooks/api/useGetDepartmentById'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { ApprovalStatus } from '@/modules/user/hooks/types'
import { useMemo } from 'react'
import { UserRole } from 'types/user'
import DepartmentMembersList from './DepartmentMembersListTable'
import DepartmentRejectedPage from './DepartmentRejectedPage'
import WaitForApprovalPage from './WaitForApprovalPage'

const DepartmentManagementPage = () => {
  const { data: userData } = useGetUser()

  const defaultDepartmentId = useMemo(() => {
    if (userData?.data.role === UserRole.STAFF) {
      return userData?.data.staff?.staffDepartments[0].departmentId
    } else if (userData?.data.role === UserRole.TEACHER) {
      return userData?.data?.teacher?.teacherDepartments[0].departmentId
    }
  }, [userData])

  const { data: departmentData } = useGetDepartmentById(defaultDepartmentId!)

  if (userData?.data.role !== UserRole.STAFF) {
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
    <PageContainer className="p-8">
      <h1 className="mb-6 text-2xl font-bold">
        สังกัด: {departmentData.data.name}
      </h1>
      <Tabs
        tabs={[
          {
            content: (
              <DepartmentMembersList
                isApproved
                facultyName={departmentData.data.faculty.name}
                departmentName={departmentData.data.name}
              />
            ),
            title: 'สังกัด/หน่วยงานของฉัน',
          },
          {
            content: (
              <DepartmentMembersList
                facultyName={departmentData.data.faculty.name}
                departmentName={departmentData.data.name}
              />
            ),
            title: 'รอการตอบรับ',
          },
        ]}
      />
    </PageContainer>
  )
}

export default DepartmentManagementPage
