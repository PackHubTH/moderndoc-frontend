import Select from '@/components/Select'
import TextInput from '@/components/TextInput'
import { Controller, FormProvider } from 'react-hook-form'
import { UserRole } from 'types/user'
import ProfileImageUpload from '../../components/ProfileImageUpload'
import useCreateProfileForm from '../../hooks/useCreateProfileForm'
import StaffSection from './StaffSection'
import StudentSection from './StudentSection'

const CreateProfilePage = () => {
  const { methods } = useCreateProfileForm()

  return (
    <div className="bg-blue-100 w-full p-6 h-[100vh]">
      <FormProvider {...methods}>
        <form className="py-11 px-12 bg-white rounded-2xl max-w-4xl mx-auto">
          <h1 className="text-xl text-gray-600 font-bold mb-6">
            เพิ่มข้อมูลส่วนตัว
          </h1>
          <hr className="mb-6" />
          <Controller
            control={methods.control}
            name="profileImg"
            render={({ field: { onChange, value } }) => (
              <ProfileImageUpload value={value} onChange={onChange} />
            )}
          />
          <div className="flex flex-col gap-5 my-5">
            <Controller
              control={methods.control}
              name="role"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="สถานภาพ"
                  options={[
                    {
                      value: UserRole.STUDENT,
                      label: 'นักศึกษา',
                    },
                    {
                      value: UserRole.TEACHER,
                      label: 'อาจารย์',
                    },
                    {
                      value: UserRole.STAFF,
                      label: 'เจ้าหน้าที่',
                    },
                  ]}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="nameTh"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="ชื่อ-นามสกุล (ภาษาไทย)"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={methods.control}
              name="nameEn"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="ชื่อ-นามสกุล (ภาษาอังกฤษ)"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          {methods.watch('role') === UserRole.STUDENT ? (
            <StudentSection />
          ) : (
            <StaffSection />
          )}
        </form>
      </FormProvider>
    </div>
  )
}

export default CreateProfilePage
