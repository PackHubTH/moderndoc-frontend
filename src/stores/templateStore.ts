import { create } from 'zustand'

interface TemplateStore {
  templateFile: File | null
  setTemplateFile: (file: File | null) => void
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templateFile: null,
  setTemplateFile: (file: File | null) => set({ templateFile: file }),
}))
