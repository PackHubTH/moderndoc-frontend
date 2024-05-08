import tw from 'twin.macro'

interface DocumentToolbarProps {
  children: React.ReactNode
  isEdit?: boolean
}

const DocumentToolbar = ({ children, isEdit }: DocumentToolbarProps) => {
  return (
    <div className="h-[48px] w-full border-b-4 bg-[#f1f2f5]">
      <div
        css={[tw`flex justify-center px-6`, isEdit ? tw`w-3/4` : tw`w-full`]}
      >
        {children}
      </div>
    </div>
  )
}

export default DocumentToolbar
