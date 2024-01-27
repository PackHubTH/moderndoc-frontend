import { create } from 'zustand'

type DocumentStore = {
  pageSizes: { id: string; h: number; w: number }[]
  setPageSizes: (pageSizes: { id: string; h: number; w: number }) => void
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  pageSizes: [],
  setPageSizes: (pageSize) =>
    set((state) => ({ pageSizes: [...state.pageSizes, pageSize] })),
}))
