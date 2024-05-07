import { Tab } from '@headlessui/react'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import tw from 'twin.macro'

type PropsType = {
  tabs: {
    title: string
    content: ReactNode
  }[]
  onChangeTab?: (index: number) => void
  variant?: 'solid' | 'outline'
}

const Tabs: React.FC<PropsType> = ({
  tabs,
  onChangeTab,
  variant = 'solid',
}) => {
  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    onChangeTab && onChangeTab(tabIndex)
  }, [tabIndex])

  return (
    <>
      <Tab.Group>
        <Tab.List className="space-x-2.5">
          {tabs.map((tab, index) => (
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  css={[
                    variant === 'solid' &&
                      tw`inline-flex items-center  gap-x-2 rounded-lg bg-transparent px-7 py-3.5 text-center text-sm font-medium text-gray-600 hover:text-blue-600 disabled:pointer-events-none disabled:opacity-50`,
                    variant === 'solid' &&
                      selected &&
                      tw`bg-blue-500 text-white hover:text-white`,
                    variant === 'outline' &&
                      tw`inline-flex items-center gap-x-2 whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none disabled:pointer-events-none disabled:opacity-50`,
                    variant === 'outline' &&
                      selected &&
                      tw`border-blue-500 text-blue-500`,
                  ]}
                  onClick={() => setTabIndex(index)}
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
