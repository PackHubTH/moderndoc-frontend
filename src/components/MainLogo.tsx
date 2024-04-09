import logo from '@/assets/mainLogo.svg'
import { useNavigate } from 'react-router-dom'

const MainLogo = () => {
  const navigate = useNavigate()
  return (
    <img
      className="cursor-pointer"
      src={logo}
      alt="main-logo"
      onClick={() => navigate('/')}
    />
  )
}

export default MainLogo
