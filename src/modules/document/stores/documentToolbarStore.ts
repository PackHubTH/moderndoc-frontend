import { create } from 'zustand'
import { ActiveToolbarButton } from '../types/ToolbarButton'

type DocumentToolbarStore = {
  activeButton: ActiveToolbarButton
  setActiveButton: (button: ActiveToolbarButton) => void
}

export const useDocumentToolbarStore = create<DocumentToolbarStore>((set) => ({
  activeButton: ActiveToolbarButton.Default,
  setActiveButton: (button) => set({ activeButton: button }),
}))
