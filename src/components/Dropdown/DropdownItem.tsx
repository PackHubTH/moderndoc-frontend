type PropsType = {
  icon?: React.ReactNode
  displayText: string | React.ReactNode
  onClick?: () => void
  key?: string
}

const DropdownItem = ({ displayText, icon, key, onClick }: PropsType) => {
  return (
    <a
      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none "
      href="#"
      key={key}
      onClick={onClick}
    >
      {icon}
      {displayText}
    </a>
  )
}

export default DropdownItem
