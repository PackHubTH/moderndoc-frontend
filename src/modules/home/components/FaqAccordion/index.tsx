import { Faq, SubFaq } from '@/modules/faq/types'
import { ReactNode, useState } from 'react'
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa6'
import { blue, white, yellow } from 'tailwindcss/colors'
import {
  SendChannelBgColorMapper,
  SendChannelTextColorMapper,
  SendChannelTextMapper,
} from './mapper'

import Button from '@/components/Button'
import Tag from '@/components/Tag'
import { useDisclosure } from '@/hooks/useDisclosure'
import useGetFileMutate from '@/hooks/useGetFileMutate'
import CreateFaqModal from '@/modules/faq/components/CreateFaqModal'
import { Disclosure } from '@headlessui/react'
import { HiTrash } from 'react-icons/hi'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import tw from 'twin.macro'
import DeleteSubFaqModal from '../DeleteSubFaqModal'
import SubFaqActionModal from '../SubFaqActionModal'

type PropsType = {
  faq: Faq
  isEditable?: boolean
  defaultOpen?: boolean
  refetch?: () => void
}

const FaqAccordion: React.FC<PropsType> = ({
  faq,
  isEditable,
  defaultOpen = false,
}) => {
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
  const {
    isOpen: editFaqIsOpen,
    open: editFaqOpen,
    close: editFaqClose,
  } = useDisclosure()

  const { mutateAsync: getFile } = useGetFileMutate()

  const navigate = useNavigate()

  const [actionFaqId, setActionFaqId] = useState<string | null>(null)
  const [actionSubFaq, setActionSubFaq] = useState<SubFaq | null>(null)
  const [subFaqModalType, setSubFaqModalType] = useState<'CREATE' | 'UPDATE'>(
    'CREATE'
  )

  const handleClickCreateSubFaq = (faqId: string) => {
    setSubFaqModalType('CREATE')
    setActionFaqId(faqId)
    createSubFaqOpen()
  }

  const handleClickUpdateSubFaq = (subFaq: SubFaq) => {
    setSubFaqModalType('UPDATE')
    setActionSubFaq(subFaq)
    createSubFaqOpen()
  }

  const handleClickDeleteSubFaq = (subFaq: SubFaq) => {
    setActionSubFaq(subFaq)
    deleteSubFaqOpen()
  }

  return (
    <>
      <CreateFaqModal
        isOpen={editFaqIsOpen}
        onClose={editFaqClose}
        faq={faq}
        mode="edit"
      />
      <div className="break-words p-5 shadow">
        <Disclosure defaultOpen={defaultOpen}>
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
                <div className="flex items-center gap-3">
                  {isEditable && (
                    <Button
                      label="แก้ไขข้อมูล FAQ"
                      onClick={() => {
                        editFaqOpen()
                      }}
                      variant="yellow"
                      backgroundColor="white"
                      color={yellow[500]}
                      borderColor={yellow[500]}
                      leftIcon={
                        <MdModeEditOutline
                          size={24}
                          className="rounded-full p-1 text-yellow-500"
                        />
                      }
                    />
                  )}
                  {faq.templateId && (
                    <Button
                      label="สร้างเอกสาร"
                      variant="green"
                      onClick={(e) => {
                        e.preventDefault()
                        console.log('create document', faq.templateId)
                        navigate(`/create-document/${faq.templateId}`)
                      }}
                      leftIcon={
                        <FaPlus
                          size={24}
                          className="rounded-full p-1 text-white"
                        />
                      }
                    />
                  )}
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
                </div>
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
                          : {value as ReactNode}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {faq.files.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="font-semibold text-blue-500">ไฟล์แนบ</h3>
                    <ul className="space-y-4 pt-1">
                      {faq.files.map((file) => (
                        <li key={file}>
                          <a
                            rel="noreferrer"
                            className="cursor-pointer rounded-md border border-blue-300 bg-blue-100 p-1 text-blue-500
                     hover:underline"
                            onClick={async () => {
                              const result = await getFile(file)
                              window.open(result.data, '_blank')
                            }}
                          >
                            {file}
                          </a>
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
                    {isEditable && (
                      <Button
                        label="สร้างรายการ FAQ ย่อย"
                        variant="green"
                        onClick={() => handleClickCreateSubFaq(faq.id)}
                      />
                    )}
                    <div
                      css={[
                        tw`rounded-xl border`,
                        faq.subFaqs.length > 0 && tw`divide-y-2 `,
                      ]}
                    >
                      {faq.subFaqs.map((subFaq) => (
                        <Disclosure defaultOpen={defaultOpen}>
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
                                        onClick={() =>
                                          handleClickUpdateSubFaq(subFaq)
                                        }
                                      />
                                      <HiTrash
                                        size={25}
                                        className="cursor-pointer rounded-full bg-red-500 p-1 text-white"
                                        onClick={() =>
                                          handleClickDeleteSubFaq(subFaq)
                                        }
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
      <SubFaqActionModal
        type={subFaqModalType}
        isOpen={createSubFaqIsOpen}
        onClose={createSubFaqClose}
        faqId={actionFaqId}
        subFaq={actionSubFaq}
      />
      <DeleteSubFaqModal
        isOpen={deleteSubFaqIsOpen}
        onClose={deleteSubFaqClose}
        subFaqId={actionSubFaq?.id || null}
      />
    </>
  )
}

export default FaqAccordion
