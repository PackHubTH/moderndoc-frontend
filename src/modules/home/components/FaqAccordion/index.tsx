import Button from '@/components/Button'
import Tag from '@/components/Tag'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Faq } from '@/modules/faq/types'
import { Disclosure } from '@headlessui/react'
import { useState } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline } from 'react-icons/md'
import { blue, white } from 'tailwindcss/colors'
import tw from 'twin.macro'
import CreateSubFaqModal from '../CreateSubFaqModal'
import DeleteSubFaqModal from '../DeleteSubFaqModal'
import {
  SendChannelBgColorMapper,
  SendChannelTextColorMapper,
  SendChannelTextMapper,
} from './mapper'

type PropsType = {
  faq: Faq
  isEditable?: boolean
}

const FaqAccordion: React.FC<PropsType> = ({ faq, isEditable }) => {
  const {
    isOpen: createSubFaqIsOpen,
    open: createSubFaqOpen,
    close: createSubFaqClose,
  } = useDisclosure()
  const {
    isOpen: deleteSubFaqIsOpen,
    open: deleteSubFaqOpen,
    close: deleteSubFaqClose,
  } = useDisclosure()

  const [actionFaqId, setActionFaqId] = useState<string | null>(null)
  const [actionSubFaqId, setActionSubFaqId] = useState<string | null>(null)

  return (
    <>
      <div className="break-words p-5 shadow">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg text-left">
                <div className="space-y-1 font-semibold ">
                  <h3 className="space-x-1">
                    <span className="text-blue-500">
                      {faq.documentCodeTh} :
                    </span>
                    <span className="font- text-[#170f49]">{faq.titleTh}</span>
                  </h3>
                  <h3 className="space-x-1">
                    <span className="text-blue-500">
                      {faq.documentCodeEn} :
                    </span>
                    <span className="font- text-[#170f49]">{faq.titleEn}</span>
                  </h3>
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
                  <h3 className="font-semibold text-blue-500">รายละเอียด</h3>
                  <p>{faq.description}</p>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-blue-500">
                      แนวทางการส่งเอกสาร
                    </h3>
                    <Tag
                      name={SendChannelTextMapper[faq.sendChannel]}
                      bgColor={SendChannelBgColorMapper[faq.sendChannel]}
                      color={SendChannelTextColorMapper[faq.sendChannel]}
                      borderColor="transparent"
                    />
                  </div>
                  <p>{faq.sendChannelInfo}</p>
                </div>
                {Object.entries(faq.extraContact).length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="font-semibold text-blue-500">
                      ช่องทางการติดต่อสอบถามเพิ่มเติม
                    </h3>
                    <ul className="space-y-1.5 pt-1">
                      {Object.entries(faq.extraContact).map(([key, value]) => (
                        <li key={key}>
                          <span className="font-medium text-gray-600">
                            {key}
                          </span>{' '}
                          : {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {(faq.subFaqs.length > 0 || isEditable) && (
                  <>
                    <h3 className="font-semibold text-blue-500">
                      รายการคำถามที่เกี่ยวข้อง
                    </h3>
                    <Button
                      label="สร้างรายการ FAQ ย่อย"
                      variant="green"
                      onClick={() => {
                        createSubFaqOpen()
                        setActionFaqId(faq.id)
                      }}
                    />
                    <div
                      css={[
                        tw`rounded-xl border`,
                        faq.subFaqs.length > 0 && tw`divide-y-2 `,
                      ]}
                    >
                      {faq.subFaqs.map((subFaq) => (
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between p-4">
                                <h4>{subFaq.title}</h4>
                                <div className="flex items-center gap-3">
                                  {isEditable && (
                                    <>
                                      <MdModeEditOutline
                                        size={25}
                                        className="cursor-pointer rounded-full bg-sky-500 p-1 text-white"
                                        onClick={() => {
                                          setActionSubFaqId(subFaq.id)
                                        }}
                                      />
                                      <HiTrash
                                        size={25}
                                        className="cursor-pointer rounded-full bg-red-500 p-1 text-white"
                                        onClick={() => {
                                          setActionSubFaqId(subFaq.id)
                                          deleteSubFaqOpen()
                                        }}
                                      />
                                    </>
                                  )}
                                  <FaChevronDown
                                    size={14}
                                    style={{
                                      transform: open
                                        ? 'rotate(180deg)'
                                        : 'rotate(0deg)',
                                      transition: 'all 0.3s ease',
                                    }}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel className="flex items-start justify-between bg-gray-100 p-4">
                                <p>{subFaq.description}</p>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </div>
                  </>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <CreateSubFaqModal
        isOpen={createSubFaqIsOpen}
        onClose={createSubFaqClose}
        faqId={actionFaqId}
      />
      <DeleteSubFaqModal
        isOpen={deleteSubFaqIsOpen}
        onClose={deleteSubFaqClose}
        subFaqId={actionSubFaqId}
      />
    </>
  )
}

export default FaqAccordion
