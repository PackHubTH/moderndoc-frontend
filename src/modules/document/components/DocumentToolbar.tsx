interface DocumentToolbarProps {
  children: React.ReactNode
}

const DocumentToolbar = ({ children }: DocumentToolbarProps) => {
  return (
    <div className="flex h-[48px] w-full justify-center border-b-4 bg-[#f1f2f5] px-6">
      {children}
    </div>
  )
}

export default DocumentToolbar
