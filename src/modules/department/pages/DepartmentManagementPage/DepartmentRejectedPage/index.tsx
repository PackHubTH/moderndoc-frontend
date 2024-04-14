import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import Swap from '@/modules/department/assets/swap.png'
import useChangeDepartment from '@/modules/department/hooks/api/useChangeDepartment'
import useGetAllFaculties from '@/modules/user/hooks/api/useGetAllFaculties'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { DepartmentType } from '@/modules/user/hooks/types'
import { useState } from 'react'
import { toast } from 'react-toastify'

type PropsType = {
  departmentName: string
}

const DepartmentRejectedPage: React.FC<PropsType> = ({ departmentName }) => {
  const [departmentType, setDepartmentType] = useState<DepartmentType>(
    DepartmentType.DEPARTMENT
  )

  const [facultyId, setFacultyId] = useState<string>('')
  const [departmentId, setDepartmentId] = useState<string>('')

  const { data: faculties } = useGetAllFaculties()
  const { data: departments } = useGetDepartments(
    departmentType === DepartmentType.AGENCY ? undefined : facultyId
  )
  const { mutate: changeDepartment } = useChangeDepartment()
  const { refetch: refetchUserData } = useGetUser()

  const handleSubmit = () => {
    changeDepartment(
      { departmentId },
      {
        onSuccess: () => {
          toast('ส่งคำขอเข้าร่วมสำเร็จ', { type: 'success' })
          refetchUserData()
        },
        onError: (error) => {
          toast(`เกิดข้อผิดพลาด ${error}`, { type: 'error' })
        },
      }
    )
  }

  return (
    <PageContainer className="flex h-[100vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <img className="mx-auto w-32" src={Swap} alt="Swap Department" />
        <h4 className="mt-6 text-xl font-semibold text-gray-600">
          ดูเหมือนคุณจะ<span className="text-red-600">ไม่ได้รับการตอบรับ</span>
          เข้าสู่หน่วยงาน {departmentName}
        </h4>
        <h5 className="mt-4 text-xl text-blue-500">
          กรุณาเลือกหน่วยงานใหม่อีกครั้ง
        </h5>
      </div>
      <div className="border-1 mt-10 w-full max-w-2xl space-y-4 rounded-2xl border p-8">
        <RadioGroup
          label="ทำงานสังกัด"
          options={[
            {
              label: 'คณะ/ภาควิชา',
              value: DepartmentType.DEPARTMENT,
            },
            {
              label: 'หน่วยงาน',
              value: DepartmentType.AGENCY,
            },
          ]}
          onChange={(value) => setDepartmentType(value as DepartmentType)}
          value={departmentType}
        />
        {departmentType === DepartmentType.DEPARTMENT ? (
          <div className="flex w-full justify-between">
            <Select
              className="w-1/2"
              label="คณะ"
              onChange={(value) => setFacultyId(value as string)}
              value={facultyId}
              options={
                faculties?.data.map((faculty) => ({
                  label: faculty.name,
                  value: faculty.id,
                })) ?? []
              }
            />
            <Select
              className="w-1/2"
              label="สาขาวิชา"
              onChange={(value) => setDepartmentId(value as string)}
              value={departmentId}
              options={
                departments?.data.map((department) => ({
                  label: department.name,
                  value: department.id,
                })) ?? []
              }
            />
          </div>
        ) : (
          <Select
            label="หน่วยงาน"
            onChange={(value) => setDepartmentId(value as string)}
            value={departmentId}
            options={
              departments?.data.map((department) => ({
                label: department.name,
                value: department.id,
              })) ?? []
            }
          />
        )}
        <div className="mx-auto pt-6 text-center">
          <Button
            label="ส่งคำขอเข้าร่วม"
            variant="blue"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </PageContainer>
  )
}

export default DepartmentRejectedPage
