import { Faq } from '@/modules/faq/types'
import { create } from 'zustand'

type FaqStore = {
  faq?: Faq
  setFaq: (faq: Faq) => void
  clearFaq: () => void
}

const useFaqStore = create<FaqStore>((set) => ({
  faq: undefined,
  setFaq: (faq) => set({ faq }),
  clearFaq: () => set({ faq: undefined }),
}))

export default useFaqStore
