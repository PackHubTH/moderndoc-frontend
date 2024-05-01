import { ReactNode } from 'react'
import tw from 'twin.macro'
import { useDocumentToolbarStore } from '../stores/documentToolbarStore'

interface ToolbarTextButtonProps {
  icon: ReactNode
  name: string
  value: string
  onClick: VoidFunction
}

const ToolbarTextButton = ({
  icon,
  name,
  value,
  onClick,
}: ToolbarTextButtonProps) => {
  const activeObject = useDocumentToolbarStore((state) => state.activeObject)
  const setActiveObject = useDocumentToolbarStore(
    (state) => state.setActiveObject
  )

  return (
    <button
      type="button"
      css={[
        tw`inline-flex flex-col items-center justify-center gap-x-2 rounded-sm border border-transparent p-1 text-sm font-semibold text-gray-800 hover:bg-gray-300 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`,
        activeObject[name] === value ? tw`bg-gray-300` : tw`bg-transparent`,
      ]}
      onClick={() => {
        if (onClick) onClick()
        setActiveObject({ ...activeObject, [name]: value })
      }}
    >
      {icon}
    </button>
  )
}

export default ToolbarTextButton
