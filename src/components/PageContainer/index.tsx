import Sidebar from '@/modules/home/components/Sidebar'
import Navbar from '@/modules/navbar/pages'
import tw from 'twin.macro'

type PropsType = {
  children: React.ReactNode
  showSidebar?: boolean
  showNavbar?: boolean
  className?: string
}

const SIDE_BAR_WIDTH = '260px'
const NAVBAR_HEIGHT = '68px'

const PageContainer: React.FC<PropsType> = ({
  children,
  showSidebar = true,
  showNavbar = true,
  className,
}) => {
  const isLogin = true
  // const { isLogin } = useUserStore()

  const isShowSidebar = showSidebar && isLogin

  return (
    <>
      {showNavbar && <Navbar />}
      {isLogin && showSidebar && <Sidebar />}
      <div
        css={[
          tw`flex h-screen flex-col`,
          isShowSidebar && tw`pl-[${SIDE_BAR_WIDTH}]`,
          showNavbar && tw`pt-[${NAVBAR_HEIGHT}]`,
        ]}
      >
        <div className={className}>{children}</div>
      </div>
    </>
  )
}

export default PageContainer
