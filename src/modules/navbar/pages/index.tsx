import tw from 'twin.macro'
import bellIcon from '../assets/bell.svg'
import { useGoogleLogin } from '@react-oauth/google'
import { useUserStore } from '@/stores/userStore'
import ProfileButton from '../components/ProfileButton'
import LoginButton from '../components/LoginButton'

const Navbar = () => {
  const setIsLogin = useUserStore((state) => state.setIsLogin)
  const isLogin = useUserStore((state) => state.isLogin)

  const handleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      console.log('code', code)
      //TODO: send code to backend for authentication
      setIsLogin(true)
    },
    flow: 'auth-code',
  })

  return (
    <header className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-nowrap sm:justify-start sm:py-0">
      <nav
        className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a
            className="flex-none text-xl font-semibold dark:text-white"
            href="#"
            aria-label="Brand"
          >
            Brand
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:ps-7">
            <a
              className="font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 sm:py-6"
              href="#"
            >
              Blog
            </a>

            <img alt="bell-icon" src={bellIcon} />
            {isLogin ? (
              <ProfileButton />
            ) : (
              <LoginButton onClick={handleLogin} />
            )}
            <button onClick={() => setIsLogin(false)}>logout</button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
