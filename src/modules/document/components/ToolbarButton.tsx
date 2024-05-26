import { ReactNode } from 'react'
import tw from 'twin.macro'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'

interface ToolbarButtonProps {
  id: number
  icon: ReactNode
  label?: string
  selected?: boolean
  onClick?: VoidFunction
}

const ToolbarButton = ({
  icon,
  id,
  label,
  selected,
  onClick,
}: ToolbarButtonProps) => {
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)
  const setActiveButton = useDocumentToolbarStore(
    (state) => state.setActiveButton
  )

  return (
    <button
      type="button"
      css={[
        tw`inline-flex flex-col items-center gap-x-2 rounded-sm border border-transparent p-1 text-sm font-semibold text-gray-800 hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 `,
        activeButton === id || selected ? tw`bg-gray-300` : tw`bg-transparent`,
      ]}
      onClick={() => {
        if (onClick) onClick()
        setActiveButton(id)
      }}
    >
      {icon}
      {label}
    </button>
  )
}

export default ToolbarButton
