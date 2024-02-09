import Sidebar from '@/modules/Home/components/Sidebar'
import Navbar from '@/modules/navbar/pages'
import { useUserStore } from '@/stores/userStore'
import tw from 'twin.macro'

type PropsType = {
  children: React.ReactNode
  showSidebar?: boolean
  showNavbar?: boolean
}

const SIDE_BAR_WIDTH = '260px'
const NAVBAR_HEIGHT = '68px'

const PageContainer: React.FC<PropsType> = ({
  children,
  showSidebar = true,
  showNavbar = true,
}) => {
  const { isLogin } = useUserStore()

  const isShowSidebar = showSidebar && isLogin

  return (
    <>
      {showNavbar && <Navbar />}
      {isLogin && showSidebar && <Sidebar />}
      <div
        css={[
          tw`flex flex-col h-screen`,
          isShowSidebar && tw`pl-[${SIDE_BAR_WIDTH}]`,
          showNavbar && tw`pt-[${NAVBAR_HEIGHT}]`,
        ]}
      >
        {children}
      </div>
    </>
  )
}

export default PageContainer
