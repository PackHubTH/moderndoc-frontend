import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

import { IoClose } from 'react-icons/io5'
import tw from 'twin.macro'
import { VariantType } from './types'

type PropsType = {
  content: React.ReactNode | string
  isOpen: boolean
  title: React.ReactNode | string
  onClose: () => void
  actions?: React.ReactNode
  className?: string
  css?: CssProps
  leftIcon?: React.ReactNode
  variant?: VariantType
  width?: string
}

const Modal: React.FC<PropsType> = ({
  content,
  isOpen,
  title,
  onClose,
  actions,
  className,
  leftIcon,
  width,
  variant = 'default',
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                css={[
                  tw`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all`,
                  width && { width, maxWidth: width },
                ]}
              >
                <IoClose
                  size="24px"
                  className="absolute right-3 top-4 cursor-pointer rounded-full border border-transparent text-gray-500 hover:bg-gray-100"
                  onClick={onClose}
                />
                <Dialog.Title
                  as="div"
                  css={[
                    variant === 'default' && tw`justify-center`,
                    tw`mt-4 flex items-center gap-x-4 break-all border-b px-6 py-4 pr-9 font-bold text-gray-800`,
                  ]}
                >
                  {leftIcon && leftIcon}
                  {title}
                </Dialog.Title>
                <Dialog.Description
                  as="div"
                  className={className ? className : 'border-b p-4'}
                >
                  {typeof content === 'string' ? (
                    <p className="text-sm text-gray-500">{content}</p>
                  ) : (
                    content
                  )}
                </Dialog.Description>

                <div className="flex justify-end gap-x-3 px-4 py-3">
                  {actions}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
