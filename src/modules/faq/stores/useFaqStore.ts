import { Faq } from '@/modules/faq/types'
import { create } from 'zustand'

type FaqStore = {
  faq?: Faq
  setFaq: (faq: Faq) => void
  clearFaq: () => void
  filterDepartmentIds: string[]
  setFilterDepartmentIds: (departmentIds: string[]) => void
  filterTagIds: string[]
  setFilterTagIds: (tagIds: string[]) => void
}

const useFaqStore = create<FaqStore>((set) => ({
  faq: undefined,
  setFaq: (faq) => set({ faq }),
  clearFaq: () => set({ faq: undefined }),
  filterDepartmentIds: [],
  setFilterDepartmentIds: (departmentIds) =>
    set({ filterDepartmentIds: departmentIds }),
  filterTagIds: [],
  setFilterTagIds: (tagIds) => set({ filterTagIds: tagIds }),
}))

export default useFaqStore
