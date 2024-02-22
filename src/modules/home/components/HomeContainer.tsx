type PropsType = {
  children: React.ReactNode
}

const HomeContainer = ({ children }: PropsType) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#e4f0ff] p-32">
      <div className="flex h-full max-h-96 w-full max-w-4xl flex-col items-center gap-6 rounded-[15px] bg-white p-5">
        {children}
      </div>
    </div>
  )
}

export default HomeContainer
