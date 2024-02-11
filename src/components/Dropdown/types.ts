import { ReactNode } from 'react'

export type DropdownSectionType = {
  title?: string | ReactNode
  lists: DropdownListType[]
}

export type DropdownListType = {
  icon?: ReactNode
  displayText: string | ReactNode
  onClick?: () => void
}
