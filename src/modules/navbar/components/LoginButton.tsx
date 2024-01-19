import tw from 'twin.macro'
import personIcon from '../assets/person.svg'

interface LoginButtonProps {
  onClick: () => void
}

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <button
      tw="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gradient-to-r from-[#3888ff] to-[#38c3ff] px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
      type="button"
      onClick={onClick}
    >
      <img alt="person-icon" src={personIcon} />
      เข้าสู่ระบบ
    </button>
  )
}

export default LoginButton
