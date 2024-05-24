import tw from 'twin.macro'
import { useDocumentStore } from '../stores/documentStore'

interface DocumentToolbarProps {
  children: React.ReactNode
  isEdit?: boolean
}

const DocumentToolbar = ({ children, isEdit }: DocumentToolbarProps) => {
  const isPreview = useDocumentStore((state) => state.isPreview)

  return (
    <div
      css={[
        tw`h-[48px] w-full border-b-4 bg-[#f1f2f5]`,
        isPreview ? tw`pointer-events-none` : tw`pointer-events-auto`,
      ]}
    >
      <div
        css={[tw`flex justify-center px-6`, isEdit ? tw`w-3/4` : tw`w-full`]}
      >
        {children}
      </div>
    </div>
  )
}

export default DocumentToolbar
