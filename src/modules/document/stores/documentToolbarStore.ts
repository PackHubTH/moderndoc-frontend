import { ActiveToolbarButton } from '../types/ToolbarButton'
import { create } from 'zustand'

type DocumentToolbarStore = {
  activeButton: ActiveToolbarButton
  activeCanvasId: string
  activeObject: any
  setActiveButton: (button: ActiveToolbarButton) => void
  setActiveCanvasId: (id: string) => void
  setActiveObject: (object: any) => void
}

export const useDocumentToolbarStore = create<DocumentToolbarStore>((set) => ({
  activeButton: ActiveToolbarButton.Default,
  activeCanvasId: '',
  activeObject: null,
  setActiveButton: (button) => set({ activeButton: button }),
  setActiveCanvasId: (id) => set({ activeCanvasId: id }),
  setActiveObject: (object) => set({ activeObject: object }),
}))
