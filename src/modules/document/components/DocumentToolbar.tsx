interface DocumentToolbarProps {
  children: React.ReactNode
}

const DocumentToolbar = ({ children }: DocumentToolbarProps) => {
  return <div className="flex h-[30px] w-full bg-green-600">{children}</div>
}

export default DocumentToolbar
