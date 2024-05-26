import MainLogo from '@/components/MainLogo'
import useLogin from '@/modules/user/hooks/api/useLogin'
import { useUserStore } from '@/stores/userStore'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserRole } from 'types/user'
import LoginButton from '../components/LoginButton'
import ProfileButton from '../components/ProfileButton'

const Navbar = () => {
  const { isLogin, setIsLogin, user, setEmail, setUser } = useUserStore()

  const navigate = useNavigate()

  const { mutate: login } = useLogin()

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
          setEmail((data.data as any)?.email ?? data.data?.emails[0])
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
    <header className="fixed z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto w-full px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <MainLogo />
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 "
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="h-4 w-4 hs-collapse-open:hidden"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hidden h-4 w-4 flex-shrink-0 hs-collapse-open:block"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden grow basis-full overflow-visible transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex h-[72px] flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:ps-7">
            {isLogin ? (
              <ProfileButton
                profileImg={user.profileImg}
                name={user.nameEn}
                email={user.emails[0]}
              />
            ) : (
              <LoginButton onClick={handleGoogleLogin} />
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
