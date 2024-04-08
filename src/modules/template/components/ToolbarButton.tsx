interface ToolbarButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

const ToolbarButton = ({ icon, label, onClick }: ToolbarButtonProps) => {
  return (
    <div
      className="flex h-12 cursor-pointer flex-col items-center justify-center bg-gray-200 px-3 hover:bg-gray-300"
      onClick={onClick}
    >
      {icon}
      <span className="text-xs text-black">{label}</span>
    </div>
  )
}

export default ToolbarButton
