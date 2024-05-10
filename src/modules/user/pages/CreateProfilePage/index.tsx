import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import { useUserStore } from '@/stores/userStore'
import { useEffect } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import ProfileImageUpload from '../../components/ProfileImageUpload'
import { useRegister } from '../../hooks/api/useRegister'
import useCreateProfileForm from '../../hooks/useCreateProfileForm'
import StaffSection from './StaffSection'
import StudentSection from './StudentSection'
import UserInfoSection from './UserInfoSection'

const CreateProfilePage = () => {
  const navigate = useNavigate()

  const { methods } = useCreateProfileForm()
  const { mutate: registerUser } = useRegister()

  const { email, setUser } = useUserStore()

  const onSubmit = () => {
    const data = methods.getValues()
    const dataToSend = {
      ...data,
      departmentIds: [data.departmentId],
    }
    registerUser(dataToSend, {
      onSuccess: (response) => {
        setUser(response.data!, response.data!.token!)
        navigate('/')
      },
      onError: (error) => {
        toast('เกิดข้อผิดพลาดในการสร้างข้อมูลส่วนตัว', { type: 'error' })
      },
    })
  }

  useEffect(() => {
    if (email === '') navigate('/login')

    methods.setValue('emails', [email], { shouldDirty: true })
    methods.setValue('defaultEmailIndex', 0, { shouldDirty: true })
  }, [])

  return (
    <PageContainer>
      <div className="h-full min-h-[100vh] w-full bg-blue-100 p-6">
        <FormProvider {...methods}>
          <form className="mx-auto max-w-4xl rounded-2xl bg-white px-12 py-11">
            <h1 className="mb-6 text-xl font-bold text-gray-600">
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
            {/* {methods.watch('role') === UserRole.STUDENT ? (
              <StudentSection />
            ) : (
              <StaffSection />
            )} */}
            <div className="mt-8 w-full">
              <div className="text-right">
                <Button
                  label="บันทึกข้อมูลส่วนตัว"
                  type="submit"
                  disabled={!methods.formState.isValid}
                  onClick={(e) => {
                    e.preventDefault()
                    onSubmit()
                  }}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </PageContainer>
  )
}

export default CreateProfilePage
