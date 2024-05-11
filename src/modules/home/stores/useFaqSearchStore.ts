import { create } from 'zustand'

interface FaqSearchStore {
  search: string
  setSearch: (search: string) => void
  filterTagId: string
  setFilterTagId: (tagId: string) => void
  filterDepartmentId: string
  setFilterDepartmentId: (departmentId: string) => void
}

export const useFaqSearchStore = create<FaqSearchStore>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),

  filterTagId: '',
  setFilterTagId: (tagId) => set({ filterTagId: tagId }),

  filterDepartmentId: '',
  setFilterDepartmentId: (departmentId) =>
    set({ filterDepartmentId: departmentId }),
}))
