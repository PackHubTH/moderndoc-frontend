import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import useUploadFile from '@/hooks/useUploadFile'
import { useEffect } from 'react'
import { Controller, FormProvider } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import ProfileImageUpload from '../../components/ProfileImageUpload'
import useGetUser from '../../hooks/api/useGetUser'
import useUpdateProfile from '../../hooks/api/useUpdateProfile'
import useEditProfile from '../../hooks/useEditUserProfile'
import StaffSection from './StaffSection'
import StudentSection from './StudentSection'
import UserInfoSection from './UserInfoSection'

const EditUserInfo = () => {
  const navigate = useNavigate()
  const { methods } = useEditProfile()

  const { data: userData } = useGetUser()
  const { mutate: updateUser } = useUpdateProfile()

  const { mutateAsync: uploadFile, data: uploadFileData } = useUploadFile()

  useEffect(() => {
    if (userData?.data) {
      methods.reset({
        id: userData.data.id,
        emails: userData.data.emails,
        nameEn: userData.data.nameEn,
        nameTh: userData.data.nameTh,
        notificationConfig:
          Object.keys(userData.data.notificationConfig).length === 0
            ? [1, 3, 5]
            : userData.data.notificationConfig,
        phone: userData.data.phones[0],
        profileImg: userData.data.profileImg,
        defaultEmailIndex: userData.data.defaultEmailIndex,
        role: userData.data.role,
        signatures: userData.data.signatures,
        student: userData.data.student,
        staff: userData.data.staff,
        teacher: userData.data.teacher,
        courseId: userData.data.student?.courseId,
      })
    }
  }, [userData])

  // useEffect(() => {
  //   if (methods.watch('profileImgFile')) {
  //     uploadFile(
  //       {
  //         file: methods.watch('profileImgFile'),
  //         folder: 'profile-img',
  //         isPublic: true,
  //       },
  //       {
  //         onError: (error) => {
  //           toast('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ', { type: 'error' })
  //         },
  //       }
  //     )
  //   }
  // }, [methods.watch('profileImgFile')])

  const onSubmit = async () => {
    const data = methods.getValues()

    let uploadFileResult: any = {}
    if (methods.watch('profileImgFile')) {
      uploadFileResult = await uploadFile({
        file: methods.watch('profileImgFile'),
        folder: 'profile-img',
        isPublic: true,
      })

      if (uploadFileResult.error) {
        toast('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ', { type: 'error' })
        return
      }
    }

    const dataToSend = {
      role: data.role,
      user: {
        ...data,
        phones: [data.phone],
        profileImg: uploadFileResult?.data?.fileUrl ?? undefined,
      },
      student: data.student,
      staff: {
        ...data.staff,
        ...(data.departmentId && {
          staffDepartments: [{ departmentId: data.departmentId }],
        }),
      },
      teacher: {
        ...data.teacher,
        ...(data.departmentId && {
          teacherDepartments: [{ departmentId: data.departmentId }],
        }),
      },
    }

    updateUser(dataToSend, {
      onSuccess: (response) => {
        navigate('/')
        toast('แก้ไขข้อมูลส่วนตัวสำเร็จ', { type: 'success' })
      },
      onError: (error) => {
        toast('เกิดข้อผิดพลาดในการสร้างข้อมูลส่วนตัว', { type: 'error' })
      },
    })
  }

  return (
    <PageContainer className="px-36 pt-7">
      <FormProvider {...methods}>
        <form className="mx-auto max-w-4xl rounded-2xl bg-white">
          <h1 className="mb-6 text-xl font-bold text-gray-600">
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
          <div className="my-8 w-full">
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
    </PageContainer>
  )
}

export default EditUserInfo
