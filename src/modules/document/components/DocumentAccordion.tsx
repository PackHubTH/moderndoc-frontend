import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

type PropsType = {
  children: React.ReactNode
  title: string
}

const DocumentAccordion = ({ children, title }: PropsType) => {
  return (
    <div className="hs-accordion active">
      <button className="hs-accordion-toggle hs-accordion-active inline-flex w-full items-center justify-between gap-x-3 border-b-2 px-[15px] py-[14px] text-start text-[16px] font-semibold text-blue-600 hover:text-gray-500 disabled:pointer-events-none disabled:opacity-50">
        {title}
        <IoIosArrowDown className="size-4 block hs-accordion-active:hidden" />
        <IoIosArrowUp className="size-4 hidden hs-accordion-active:block" />
      </button>
      <div className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300">
        {children}
      </div>
    </div>
  )
}

export default DocumentAccordion
