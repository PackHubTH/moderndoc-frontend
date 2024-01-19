import useGetUsers from '@/hooks/useGetUsers'
import HomeContainer from '../components/HomeContainer'

const Home = () => {
  const { data } = useGetUsers()

  return (
    <HomeContainer>
      <div tw="flex gap-4">
        <h1 tw="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text font-extrabold text-transparent text-3xl">
          ModernDoc
        </h1>
      </div>
      <p>เข้าสู่ระบบ</p>
    </HomeContainer>
  )
}

export default Home
