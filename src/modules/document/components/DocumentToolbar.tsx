interface DocumentToolbarProps {
  children: React.ReactNode
}

const DocumentToolbar = ({ children }: DocumentToolbarProps) => {
  return (
    <div className="flex h-[30px] w-full justify-center bg-green-600 px-6">
      {children}
    </div>
  )
}

export default DocumentToolbar
