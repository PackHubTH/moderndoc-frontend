import tw from 'twin.macro'
import { ReactNode } from 'react'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'

interface ToolbarButtonProps {
  id: number
  icon: ReactNode
}

const ToolbarButton = ({ icon, id }: ToolbarButtonProps) => {
  const activeButton = useDocumentToolbarStore((state) => state.activeButton)
  const setActiveButton = useDocumentToolbarStore(
    (state) => state.setActiveButton
  )

  return (
    <button
      type="button"
      css={[
        tw`inline-flex items-center gap-x-2 rounded-sm border border-transparent p-2 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`,
        activeButton === id ? tw`bg-gray-100` : tw`bg-transparent`,
      ]}
      onClick={() => setActiveButton(id)}
    >
      {icon}
    </button>
  )
}

export default ToolbarButton
