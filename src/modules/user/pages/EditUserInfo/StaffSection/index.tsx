import EmailInput from '@/components/EmailInput'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import NotificationConfig from '@/modules/user/components/NotificationConfig'
import SignatureInput from '@/modules/user/components/SignatureInput'
import useGetAllFaculties from '@/modules/user/hooks/api/useGetAllFaculties'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import useGetDepartmentById from '@/modules/user/hooks/api/useGetDepartmentById'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { DepartmentType } from '@/modules/user/hooks/types'
import { EditProfileForm } from '@/modules/user/hooks/useEditUserProfile/validation'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { UserRole } from 'types/user'

const StaffSection = () => {
  const methods = useFormContext<EditProfileForm>()

  const [facultyId, setFacultyId] = useState<string | undefined>()
  const [departmentType, setDepartmentType] = useState<DepartmentType | string>(
    DepartmentType.DEPARTMENT
  )

  const { data: userData } = useGetUser()

  const isAgency = departmentType === DepartmentType.AGENCY
  console.log('🚀 ~ StaffSection ~ isAgency:', isAgency)

  const { data: faculties } = useGetAllFaculties()
  const { data: departments, refetch } = useGetDepartments(
    isAgency ? undefined : facultyId
  )

  const defaultDepartmentId =
    userData?.data.role === UserRole.STAFF
      ? userData?.data.staff?.staffDepartments[0].departmentId
      : userData?.data?.teacher?.teacherDepartments[0].departmentId

  const { data: departmentData } = useGetDepartmentById(defaultDepartmentId!)

  const objectPrefix =
    userData?.data.role === UserRole.STAFF ? 'staff' : 'teacher'

  useEffect(() => {
    if (departmentData) {
      if (departmentData.data.type === DepartmentType.AGENCY) {
        setDepartmentType(DepartmentType.AGENCY)
        methods.setValue('departmentId', defaultDepartmentId)
        refetch()
      } else {
        setDepartmentType(DepartmentType.DEPARTMENT)
        setFacultyId(departmentData.data.facultyId)
        methods.setValue('facultyId', departmentData.data.facultyId)
        methods.setValue('departmentId', defaultDepartmentId)
        refetch()
      }
    }
  }, [departmentData, defaultDepartmentId, departments])

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Controller
        control={methods.control}
        name={`${objectPrefix}.staffNumber`}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="รหัสประจำตัวบุคลากร"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="emails"
        render={({ field: { value, onChange } }) => (
          <EmailInput
            label="E-mail"
            onChange={(value, defaultEmailIndex) => {
              onChange(value)
              methods.setValue('defaultEmailIndex', defaultEmailIndex, {
                shouldDirty: true,
              })
              methods.trigger()
            }}
            value={value}
            defaultEmailIndex={methods.watch('defaultEmailIndex')}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Phone"
            onChange={onChange}
            value={value}
            patternFormat="###-###-####"
          />
        )}
      />
      {userData?.data.role !== UserRole.ADMIN && (
        <>
          <RadioGroup
            label="ประเภท"
            value={departmentType}
            onChange={(val) => setDepartmentType(val)}
            options={[
              { label: 'คณะ/ภาควิชา', value: DepartmentType.DEPARTMENT },
              { label: 'หน่วยงาน', value: DepartmentType.AGENCY },
            ]}
          />
          {!isAgency ? (
            <div className="flex w-full justify-between">
              <Controller
                control={methods.control}
                name="facultyId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    className="w-1/2"
                    label="คณะ"
                    onChange={onChange}
                    value={value}
                    options={
                      faculties?.data.map((faculty) => ({
                        label: faculty.name,
                        value: faculty.id,
                      })) ?? []
                    }
                  />
                )}
              />
              <Controller
                control={methods.control}
                name="departmentId"
                render={({ field: { onChange, value } }) => (
                  <Select
                    className="w-1/2"
                    label="สาขาวิชา"
                    onChange={onChange}
                    value={value}
                    options={
                      departments?.data.map((department) => ({
                        label: department.name,
                        value: department.id,
                      })) ?? []
                    }
                  />
                )}
              />
            </div>
          ) : (
            <Controller
              control={methods.control}
              name="departmentId"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="หน่วยงาน"
                  onChange={onChange}
                  value={value}
                  options={
                    departments?.data.map((department) => ({
                      label: department.name,
                      value: department.id,
                    })) ?? []
                  }
                />
              )}
            />
          )}
        </>
      )}
      <Controller
        control={methods.control}
        name="signatures"
        render={({ field: { onChange, value } }) => (
          <SignatureInput
            value={value ?? []}
            onChange={onChange}
            maxSignatures={3}
          />
        )}
      />
      <Controller
        control={methods.control}
        name="notificationConfig"
        render={({ field: { onChange, value } }) => (
          <NotificationConfig value={value ?? []} onChange={onChange} />
        )}
      />
    </div>
  )
}

export default StaffSection
