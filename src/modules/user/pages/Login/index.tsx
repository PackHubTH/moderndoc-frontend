import Button from '@/components/Button'
import TextInput from '@/components/TextInput'
import { useUserStore } from '@/stores/userStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const Login = () => {
  const navigate = useNavigate()
  const { mutate: login } = useLogin()

  const [email, setEmail] = useState('')

  const { setIsLogin, setUser, setEmail: setUserEmail } = useUserStore()

  const handleLogin = (email: string) => {
    login(email, {
      onSuccess: (data) => {
        if (data.data === null || !data.data.isFinishRegister) {
          setUserEmail(email)
          return navigate('/create-profile', { replace: true })
        }

        setUser(data.data, data.data.token!)
        setIsLogin(true)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }

  return (
    <form className="max-w-xs p-8">
      <TextInput
        label="Email"
        placeholder="Enter your email"
        type="email"
        onChange={setEmail}
      />
      <Button
        label="Login"
        onClick={() => {
          handleLogin(email)
        }}
      />
    </form>
  )
}

export default Login
