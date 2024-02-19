import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import { Controller, FormProvider } from 'react-hook-form'
import { UserRole } from 'types/user'
import ProfileImageUpload from '../../components/ProfileImageUpload'
import useEditProfile from '../../hooks/useEditUserProfile'
import StaffSection from '../CreateProfilePage/StaffSection'
import UserInfoSection from '../CreateProfilePage/UserInfoSection'
import StudentSection from './StudentSection'

const EditUserInfo = () => {
  const { methods } = useEditProfile()

  return (
    <PageContainer className="px-36 pt-7">
      <FormProvider {...methods}>
        <form className="py-11 px-12 bg-white rounded-2xl max-w-4xl mx-auto">
          <h1 className="text-xl text-gray-600 font-bold mb-6">
            ข้อมูลส่วนตัว
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
          <div className="mt-8 w-full">
            <div className="text-right">
              <Button
                label="บันทึกข้อมูลส่วนตัว"
                type="submit"
                disabled={!methods.formState.isValid}
                onClick={(e) => {
                  e.preventDefault()
                }}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </PageContainer>
  )
}

export default EditUserInfo
