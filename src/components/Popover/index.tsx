import tw from 'twin.macro'

type PropsType = {
  toggleElement: React.ReactNode
  children: React.ReactNode
  isOpen: boolean
}

const Popover: React.FC<PropsType> = ({ toggleElement, children, isOpen }) => {
  return (
    <div className="relative">
      {toggleElement}
      <div css={[tw`absolute z-10`]}>{isOpen && children}</div>
    </div>
  )
}

export default Popover
