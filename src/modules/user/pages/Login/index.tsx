import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import useLogin from '@/modules/user//hooks/api/useLogin'
import LoginImage from '@/modules/user/assets/login-image.png'
import { useUserStore } from '@/stores/userStore'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'

const Login = () => {
  const navigate = useNavigate()
  const { mutate: login } = useLogin()

  const [email, setEmail] = useState('')

  const { setIsLogin, setUser, setEmail: setUserEmail } = useUserStore()

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (data) => {
      handleAccessTokenLogin(data.access_token)
    },
  })

  const handleAccessTokenLogin = (accessToken: string) => {
    login(accessToken, {
      onSuccess: (data) => {
        if (
          !data ||
          (data.data?.role !== UserRole.ADMIN && !data.data?.isFinishRegister)
        ) {
          setUserEmail((data.data as any)?.email ?? data.data?.emails[0])
          return navigate('/create-profile', { replace: true })
        }

        setUser(data.data, data.data.token!)
        setIsLogin(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
        toast.error('เข้าสู่ระบบไม่สำเร็จ')
      },
    })
  }

  return (
    <PageContainer className="mx-auto grid h-full max-w-7xl grid-cols-2 place-items-center">
      <img src={LoginImage} alt="login" className="max-w-[645px]" />
      <form>
        <h1 className="text-2xl font-semibold text-gray-600">
          ยินดีต้อนรับสู่ ModernDoc! 👋🏻
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          เข้าสู่ระบบด้วยอีเมลมหาวิทยาลัย
        </p>
        <div className="mt-4">
          <Button
            width="100%"
            label="เข้าสู่ระบบ"
            onClick={(e) => {
              e.preventDefault()
              handleGoogleLogin()
            }}
            centerText
          />
        </div>
      </form>
    </PageContainer>
  )
}

export default Login
