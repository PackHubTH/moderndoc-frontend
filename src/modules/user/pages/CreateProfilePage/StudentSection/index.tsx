import EmailInput from '@/components/EmailInput'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import useGetAllFaculties from '@/modules/user/hooks/api/useGetAllFaculties'
import useGetCourses from '@/modules/user/hooks/api/useGetCourses'
import useGetDepartments from '@/modules/user/hooks/api/useGetDepartment'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import { Controller, useFormContext } from 'react-hook-form'
import { Level } from 'types/user'

const StudentSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  const { data: faculties } = useGetAllFaculties()
  const { data: departments } = useGetDepartments(methods.watch('facultyId'))
  const { data: courses } = useGetCourses(methods.watch('departmentId'))

  return (
    <div className="mt-5 flex flex-col gap-5">
      <Controller
        control={methods.control}
        name="studentNumber"
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
        <Controller
          control={methods.control}
          name="courseId"
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
    </div>
  )
}

export default StudentSection
