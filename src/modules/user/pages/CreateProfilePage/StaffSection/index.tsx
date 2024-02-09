import EmailInput from '@/components/EmailInput'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { DepartmentType } from '@/modules/user/hooks/types'
import { CreateProfileForm } from '@/modules/user/hooks/useCreateProfileForm/validation'
import useGetAllFaculties from '@/modules/user/hooks/useGetAllFaculties'
import useGetDepartments from '@/modules/user/hooks/useGetDepartment'
import { Controller, useFormContext } from 'react-hook-form'

const StaffSection = () => {
  const methods = useFormContext<CreateProfileForm>()

  const isAgency = methods.watch('departmentType') === DepartmentType.AGENCY

  const { data: faculties } = useGetAllFaculties()
  const { data: departments } = useGetDepartments(
    isAgency ? undefined : methods.watch('facultyId')
  )
  return (
    <div className="flex flex-col gap-5 mt-5">
      <Controller
        control={methods.control}
        name="staffNumber"
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
        render={({ field: { value,onChange } }) => (
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
        name="departmentType"
        render={({ field: { onChange, value } }) => (
          <RadioGroup
            label="ประเภท"
            value={value}
            onChange={onChange}
            options={[
              { label: 'คณะ/ภาควิชา', value: DepartmentType.DEPARTMENT },
              { label: 'หน่วยงาน', value: DepartmentType.AGENCY },
            ]}
          />
        )}
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
      )}
    </div>
  )
}

export default StaffSection
