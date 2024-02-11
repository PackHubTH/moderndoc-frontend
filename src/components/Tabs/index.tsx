import { ReactNode } from 'react'

type PropsType = {
  tabs: {
    title: string
    content: ReactNode
  }[]
}

const Tabs: React.FC<PropsType> = ({ tabs }) => {
  return (
    <>
      <nav className="flex space-x-2" aria-label="Tabs" role="tablist">
        {tabs.map((tab, index) => (
          <button
            type="button"
            className="active inline-flex items-center  gap-x-2 rounded-lg bg-transparent px-4 py-3 text-center text-sm font-medium text-gray-500 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50 hs-tab-active:bg-blue-600 hs-tab-active:text-white hs-tab-active:hover:text-white"
            id={`tabs-${index}`}
            data-hs-tab={`#tabs-option-${index}`}
            aria-controls={`tabs-option-${index}`}
            role="tab"
          >
            {tab.title}
          </button>
        ))}
      </nav>

      <div className="mt-3">
        {tabs.map((tab, index) => (
          <div
            id={`tabs-option-${index}`}
            role="tabpanel"
            className={index !== 0 ? 'hidden' : ''}
            aria-labelledby={`tabs-option-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  )
}

export default Tabs
