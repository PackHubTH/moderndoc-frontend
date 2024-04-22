import AutocompleteInput from '@/components/AutocompleteInput'
import EmailInput from '@/components/EmailInput'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import NotificationConfig from '@/modules/user/components/NotificationConfig'
import SignatureInput from '@/modules/user/components/SignatureInput'
import useGetAllFaculties from '@/modules/user/hooks/api/useGetAllFaculties'
import useGetCourseById from '@/modules/user/hooks/api/useGetCourseById'
import useGetCourses from '@/modules/user/hooks/api/useGetCourses'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import useGetTeachersByName from '@/modules/user/hooks/api/useGetTeachersByName'
import useGetUser from '@/modules/user/hooks/api/useGetUser'
import { EditProfileForm } from '@/modules/user/hooks/useEditUserProfile/validation'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Level } from 'types/user'

const StudentSection = () => {
  const methods = useFormContext<EditProfileForm>()

  const [searchAdvisor, setSearchAdvisor] = useState<string>('')

  const [facultyId, setFacultyId] = useState<string>('')

  const { data: userData } = useGetUser()
  const { data: courseData } = useGetCourseById(
    methods.watch('student.courseId')
  )
  const { data: faculties } = useGetAllFaculties()
  const { data: departments } = useGetDepartments(facultyId)
  const { data: courses } = useGetCourses(
    methods.watch('departmentId'),
    methods.watch('level')
  )
  const { data: advisors, refetch } = useGetTeachersByName(searchAdvisor)

  useEffect(() => {
    if (courseData) {
      methods.setValue('facultyId', courseData.data.department.facultyId, {
        shouldDirty: true,
      })
      setFacultyId(courseData.data.department.facultyId)
      methods.setValue('departmentId', courseData.data.department.id, {
        shouldDirty: true,
      })
      methods.setValue('level', courseData.data.level, { shouldDirty: true })
    }
  }, [courseData, departments])

  useEffect(() => {
    setSearchAdvisor(userData?.data.student.advisor?.user?.nameTh ?? '')
  }, [userData])

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Controller
        control={methods.control}
        name="student.studentNumber"
        render={({ field: { onChange, value } }) => (
          <TextInput label="รหัสนักศึกษา" onChange={onChange} value={value} />
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
      <Controller
        control={methods.control}
        name="level"
        render={({ field: { onChange, value } }) => (
          <Select
            className="w-full"
            label="ระดับการศึกษา"
            onChange={onChange}
            value={value}
            options={[
              { label: 'ปริญญาตรี', value: Level.BACHELOR },
              { label: 'ปริญญาโท', value: Level.MASTER },
              { label: 'ปริญญาเอก', value: Level.DOCTOR },
            ]}
          />
        )}
      />
      <div className="flex w-full justify-between">
        <Controller
          control={methods.control}
          name="facultyId"
          render={({ field: { onChange, value } }) => (
            <Select
              className="w-1/3"
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
              className="w-1/3"
              label="ภาควิชา"
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
        <Controller
          control={methods.control}
          name="student.courseId"
          render={({ field: { onChange, value } }) => (
            <Select
              className="w-1/3"
              label="หลักสูตร"
              onChange={onChange}
              value={value}
              options={
                courses?.data.map((course) => ({
                  label: course.name,
                  value: course.id,
                })) ?? []
              }
            />
          )}
        />
      </div>
      <Controller
        control={methods.control}
        name="student.advisorId"
        render={({ field: { onChange, value } }) => (
          <AutocompleteInput
            label="อาจารย์ที่ปรึกษา"
            onChange={(data) => {
              const fullName = advisors?.data.find(
                (advisor) => advisor.teacher?.id === data
              )?.nameTh
              setSearchAdvisor(fullName ?? '')
              onChange(data)
            }}
            onSearch={(query) => {
              setSearchAdvisor(query)
              refetch()
            }}
            value={searchAdvisor}
            options={
              advisors?.data.map((advisor) => ({
                label: advisor.nameTh,
                value: advisor.teacher?.id ?? '',
              })) ?? []
            }
          />
        )}
      />
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

export default StudentSection
