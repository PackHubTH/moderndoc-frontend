import * as Fabric from 'fabric'

import { create } from 'zustand'

type DocumentStore = {
  canvasList: {
    id: string
    canvas: Fabric.Canvas | null
    isOver?: boolean
    isDrop?: boolean
  }[]
  dropField: { id: string; x: number; y: number }
  mousePosition: { x: number; y: number }
  pageTotal: number
  canvasSizes: { id: string; h: number; w: number }[]
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void
  setCanvasSize: (id: string, h: number, w: number) => void
  setDropField: (id: string, x: number, y: number) => void
  setPageTotal: (pageTotal: number) => void
  setIsDrop: (id: string, isDrop: boolean) => void
  setIsOver: (id: string, isOver: boolean) => void
  setMousePosition: (x: number, y: number) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  canvasList: [],
  canvasSizes: [],
  dropField: { id: '', x: 0, y: 0 },
  mousePosition: { x: 0, y: 0 },
  pageTotal: 0,
  setCanvasList: (id, canvas) => {
    set((state) => {
      const index = state.canvasList.findIndex((item) => item.id === id)
      if (index === -1) {
        return { canvasList: [...state.canvasList, { id, canvas }] }
      }
      const newCanvasList = [...state.canvasList]
      newCanvasList[index] = { id, canvas }
      return { canvasList: newCanvasList }
    })
  },
  setCanvasSize: (id, h, w) => {
    set((state) => {
      const index = state.canvasSizes.findIndex((item) => item.id === id)
      if (index === -1) {
        return { canvasSizes: [...state.canvasSizes, { id, h, w }] }
      }
      const newCanvasSizes = [...state.canvasSizes]
      newCanvasSizes[index] = { id, h, w }
      return { canvasSizes: newCanvasSizes }
    })
  },
  setDropField: (id, x, y) => set({ dropField: { id, x, y } }),
  setPageTotal: (pageTotal) => set({ pageTotal }),
  setIsDrop: (id, isDrop) => {
    set((state): Partial<DocumentStore> => {
      const index = state.canvasList.findIndex((item) => item.id === id)
      if (index === -1) return state
      const newCanvasList = [...state.canvasList]
      newCanvasList[index] = { ...newCanvasList[index], isDrop }
      return { canvasList: newCanvasList }
    })
  },
  setIsOver: (id, isOver) => {
    set((state): Partial<DocumentStore> => {
      const index = state.canvasList.findIndex((item) => item.id === id)
      if (index === -1) return state
      const newCanvasList = [...state.canvasList]
      newCanvasList[index] = { ...newCanvasList[index], isOver }
      return { canvasList: newCanvasList }
    })
  },
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}))
