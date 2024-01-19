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
            className="hs-tab-active:bg-blue-600 hs-tab-active:text-white hs-tab-active:hover:text-white  py-3 px-4 inline-flex items-center gap-x-2 bg-transparent text-sm font-medium text-center text-gray-500 hover:text-blue-600 rounded-lg disabled:opacity-50 disabled:pointer-events-none active"
            id={`tabs-${index}`}
            data-hs-tab={`#tabs-color-${index}`}
            aria-controls={`tabs-color-${index}`}
            role="tab"
          >
            {tab.title}
          </button>
        ))}
      </nav>

      <div className="mt-3">
        {tabs.map((tab, index) => (
          <div
            id={`tabs-color-${index}`}
            role="tabpanel"
            aria-labelledby={`tabs-color-${index}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  )
}

export default Tabs
