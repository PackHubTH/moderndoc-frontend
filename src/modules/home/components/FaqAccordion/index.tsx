import { Faq } from '@/modules/faq/types'
import { Disclosure } from '@headlessui/react'
import { FaChevronRight } from 'react-icons/fa6'
import { blue, white } from 'tailwindcss/colors'

type PropsType = {
  faq: Faq
}

const FaqAccordion: React.FC<PropsType> = ({ faq }) => {
  return (
    <div className="p-5 shadow">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg text-left">
              <div className="space-y-1 font-semibold ">
                <h1 className="space-x-1">
                  <span className="text-blue-500">{faq.documentCodeTh} :</span>
                  <span className="font- text-[#170f49]">{faq.titleTh}</span>
                </h1>
                <h1 className="space-x-1">
                  <span className="text-blue-500">{faq.documentCodeEn} :</span>
                  <span className="font- text-[#170f49]">{faq.titleEn}</span>
                </h1>
              </div>
              <FaChevronRight
                size={50}
                className="rounded-full bg-white p-4 shadow"
                style={{
                  transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'all 0.3s ease',
                  color: !open ? blue[500] : white,
                  backgroundColor: !open ? white : blue[500],
                }}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="mt-4 space-y-4 text-gray-500">
              <div className="h-[1px] bg-gray-200" />
              <div className="space-y-2.5">
                <h1 className="font-semibold text-blue-500">รายละเอียด</h1>
                <p>{faq.description}</p>
              </div>
              <div className="space-y-2.5">
                <h1 className="font-semibold text-blue-500">
                  แนวทางการส่งเอกสาร
                </h1>
                <p>{faq.sendChannelInfo}</p>
              </div>
              <div className="space-y-2.5">
                <h1 className="font-semibold text-blue-500">
                  ช่องทางการติดต่อสอบถามเพิ่มเติม
                </h1>
                <ul>
                  {Object.entries(faq.extraContact).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium text-gray-600">{key}</span> :{' '}
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default FaqAccordion
