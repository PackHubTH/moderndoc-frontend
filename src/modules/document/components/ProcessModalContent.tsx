import Button from '@/components/Button'
import RadioGroup from '@/components/RadioGroup'
import TextInput from '@/components/TextInput'
import { useState } from 'react'

type PropsType = {}

const ProcessModalContent: React.FC<PropsType> = ({}) => {
  const [processState, setProcessState] = useState('0')

  return (
    <div className="flex flex-col gap-5 px-6">
      <RadioGroup
        label="ดำเนินการ"
        options={[
          { value: '0', label: 'ส่งต่อเอกสาร' },
          { value: '1', label: 'แจ้งผู้ส่งแก้ไขเอกสาร' },
        ]}
      />
      <div className="flex">
        <TextInput label="ส่งเอกสารถึง" />
        <Button label="ค้นหา" onClick={() => console.log('search')} />
      </div>
      {/* <TextInput label="ส่งเอกสารถึง" />
      <div>
        <p className="mb-1">รายละเอียดแจ้งแก้ไขเอกสาร</p>
        <textarea className="block w-full rounded-2xl border-[1px] border-gray-300 p-4 text-gray-500" />
      </div> */}
    </div>
  )
}

export default ProcessModalContent
