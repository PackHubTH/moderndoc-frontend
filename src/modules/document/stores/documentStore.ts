import * as Fabric from 'fabric'

import { create } from 'zustand'
import { CanvasProps } from '../types/DocumentField'

type DocumentStore = {
  canvasList: CanvasProps[]
  dropField: { id: string; x: number; y: number }
  mousePosition: { x: number; y: number }
  pageTotal: number
  canvasSizes: { id: string; h: number; w: number }[]
  setCanvasList: (id: string, canvas: Fabric.Canvas) => void
  setCanvasSize: (id: string, h: number, w: number) => void
  setDropField: (id: string, x: number, y: number) => void
  setPageTotal: (pageTotal: number) => void
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
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}))
