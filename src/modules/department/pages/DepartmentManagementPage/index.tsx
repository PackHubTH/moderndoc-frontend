import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import useGetDepartmentById from '@/modules/user/hooks/api/useGetDepartmentById'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { useMemo } from 'react'
import { UserRole } from 'types/user'
import DepartmentMembersList from './DepartmentMembersListTable'

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
