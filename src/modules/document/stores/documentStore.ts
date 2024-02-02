import * as Fabric from 'fabric'
import { create } from 'zustand'

type DocumentStore = {
  canvasList: {
    id: string
    canvas: Fabric.Canvas | null
  }[]
  pageTotal: number
  canvasSizes: { id: string; h: number; w: number }[]
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void
  setCanvasSize: (id: string, h: number, w: number) => void
  setPageTotal: (pageTotal: number) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  canvasList: [],
  canvasSizes: [],
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
  setPageTotal: (pageTotal) => set({ pageTotal }),
}))
