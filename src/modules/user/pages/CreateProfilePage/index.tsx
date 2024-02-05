import { useEffect } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { UserRole } from 'types/user'
import ProfileImageUpload from '../../components/ProfileImageUpload'
import useCreateProfileForm from '../../hooks/useCreateProfileForm'
import StaffSection from './StaffSection'
import StudentSection from './StudentSection'
import UserInfoSection from './UserInfoSection'

const CreateProfilePage = () => {
  const { methods } = useCreateProfileForm()

  useEffect(() => {
    // This is mock email
    methods.setValue('emails', ['apicha.oap@mail.kmutt.ac.th'])
    methods.setValue('defaultEmailIndex', 0)
  }, [])

  return (
    <div className="bg-blue-100 w-full p-6 h-full min-h-[100vh]">
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
              <ProfileImageUpload
                urlValue={value}
                onChange={(url, file) => {
                  onChange(url)
                  methods.setValue('profileImgFile', file)
                }}
              />
            )}
          />
          <UserInfoSection />
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
