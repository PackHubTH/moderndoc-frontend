import EmailInput from '@/components/EmailInput'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import NotificationConfig from '@/modules/user/components/NotificationConfig'
import SignatureInput from '@/modules/user/components/SignatureInput'
import { EditProfileForm } from '@/modules/user/hooks/useEditUserProfile/validation'
import useGetAllFaculties from '@/modules/user/hooks/useGetAllFaculties'
import useGetCourseById from '@/modules/user/hooks/useGetCourseById'
import useGetCourses from '@/modules/user/hooks/useGetCourses'
import useGetDepartments from '@/modules/user/hooks/useGetDepartment'
import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Level } from 'types/user'

const StudentSection = () => {
  const methods = useFormContext<EditProfileForm>()

  const [facultyId, setFacultyId] = useState<string>('')
  const [departmentId, setDepartmentId] = useState<string>('')

  const { data: courseData } = useGetCourseById(
    methods.watch('student.courseId')
  )

  const { data: faculties } = useGetAllFaculties()
  const { data: departments } = useGetDepartments(facultyId)
  const { data: courses } = useGetCourses(departmentId, methods.watch('level'))

  useEffect(() => {
    if (courseData) {
      setFacultyId(courseData.data.department.facultyId)
      setDepartmentId(courseData.data.department.id)
      methods.setValue('level', courseData.data.level, { shouldDirty: true })
    }
  }, [courseData])

  return (
    <div className="flex flex-col gap-5 mt-5">
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
        <Select
          className="w-1/3"
          label="คณะ"
          onChange={(val) => {
            setFacultyId(val as string)
          }}
          value={facultyId}
          options={
            faculties?.data.map((faculty) => ({
              label: faculty.name,
              value: faculty.id,
            })) ?? []
          }
        />
        <Select
          className="w-1/3"
          label="ภาควิชา"
          onChange={(val) => {
            setDepartmentId(val as string)
          }}
          value={departmentId}
          options={
            departments?.data.map((department) => ({
              label: department.name,
              value: department.id,
            })) ?? []
          }
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
        name="profileImg"
        render={({ field: { onChange, value } }) => (
          <SignatureInput
            onChange={(val) => console.log(val)}
            value={['https://www.w3schools.com/howto/img_avatar.png']}
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
