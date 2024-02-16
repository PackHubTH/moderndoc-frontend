import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type PropsType = {
  children: React.ReactNode
  title: string
}

const DocumentAccordion = ({ children, title }: PropsType) => {
  return (
    <div className="hs-accordion active">
      <button className="hs-accordion-toggle hs-accordion-active text-[16px] border-b-2 py-[14px] px-[15px] inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-blue-600 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none">
        {title}
        <IoIosArrowDown className="hs-accordion-active:hidden block size-4" />
        <IoIosArrowUp className="hs-accordion-active:block hidden size-4" />
      </button>
      <div className="hs-accordion-content overflow-hidden w-full transition-[height] duration-300">
        {children}
      </div>
    </div>
  )
}

export default DocumentAccordion
