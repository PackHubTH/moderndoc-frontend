import { Tab } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import tw from 'twin.macro'

type PropsType = {
  tabs: {
    title: string
    content: ReactNode
  }[]
}

const Tabs: React.FC<PropsType> = ({ tabs }) => {
  return (
    <>
      <Tab.Group>
        <Tab.List className='space-x-2.5'>
          {tabs.map((tab, index) => (
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  css={[
                    tw`inline-flex items-center  gap-x-2 rounded-lg bg-transparent px-7 py-3.5 text-center text-sm font-medium text-gray-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50`,
                    selected && tw`bg-blue-500 text-white hover:text-white`,
                  ]}
                >
                  {tab.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, index) => (
            <Tab.Panel key={index}>{tab.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}

export default Tabs
