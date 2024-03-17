import { ActiveToolbarButton } from '../types/ToolbarButton'
import { create } from 'zustand'

type DocumentToolbarStore = {
  activeButton: ActiveToolbarButton
  activeObject: any
  setActiveButton: (button: ActiveToolbarButton) => void
  setActiveObject: (object: any) => void
}

export const useDocumentToolbarStore = create<DocumentToolbarStore>((set) => ({
  activeButton: ActiveToolbarButton.Default,
  activeObject: null,
  setActiveButton: (button) => set({ activeButton: button }),
  setActiveObject: (object) => set({ activeObject: object }),
}))
