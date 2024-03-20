import PageContainer from '@/components/PageContainer'
import HomeContainer from '../../components/HomeContainer'

const GuestHomePage = () => {
  return (
    <PageContainer>
      <HomeContainer>
        <div tw="flex gap-4">
          <h1 tw="bg-gradient-to-r from-blue-600 to-blue-300 bg-clip-text font-extrabold text-transparent text-3xl">
            ModernDoc
          </h1>
        </div>
        <p>เข้าสู่ระบบ</p>
      </HomeContainer>
    </PageContainer>
  )
}

export default GuestHomePage
