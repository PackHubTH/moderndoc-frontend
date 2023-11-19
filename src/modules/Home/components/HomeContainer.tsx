import tw from 'twin.macro'

type PropsType = {
  children: React.ReactNode
}

const HomeContainer = ({ children }: PropsType) => {
  return (
    <div tw="flex h-screen flex-col items-center justify-center p-32 bg-[#e4f0ff]">
      <div tw="flex h-full max-h-96 w-full max-w-4xl flex-col items-center gap-6 bg-white p-5 rounded-[15px]">
        {children}
      </div>
    </div>
  )
}

export default HomeContainer
