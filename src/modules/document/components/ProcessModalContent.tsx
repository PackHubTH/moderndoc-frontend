import RadioGroup from '@/components/RadioGroup'
import RichTextInput from '@/components/RichTextInput'
import Select from '@/components/Select'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import useProcessDocumentForm from '../hooks/useProcessDocumentForm'

enum ProcessState {
  SEND_DOCUMENT = '0',
  NOTIFY_SENDER = '1',
  COMPLETE = '2',
  CANCEL = '3',
}

type PropsType = {}

const ProcessModalContent: React.FC<PropsType> = ({}) => {
  const { methods } = useProcessDocumentForm()
  const [processState, setProcessState] = useState(ProcessState.SEND_DOCUMENT)

  const renderSendDocumentForm = () => {
    if (processState !== ProcessState.SEND_DOCUMENT) return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        <Controller
          control={methods.control}
          name="operatorId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="เลือกผู้ลงนามหรือผู้ดำเนินการต่อ"
              onChange={onChange}
              value={value}
              options={[]}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="description"
          render={({ field }) => (
            <RichTextInput
              label="รายละเอียดเอกสาร"
              placeholder="กรอกรายละเอียด"
              {...field}
            />
          )}
        />
      </form>
    )
  }

  const renderNotifySenderForm = () => {
    if (processState !== ProcessState.NOTIFY_SENDER) return null
    return (
      <form className="max-h-[586px] space-y-5 overflow-y-auto p-1">
        <Controller
          control={methods.control}
          name="operatorId"
          render={({ field: { value, onChange } }) => (
            <Select
              label="เลือกผู้ลงนามหรือผู้ดำเนินการต่อ"
              onChange={onChange}
              value={value}
              options={[]}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="description"
          render={({ field }) => (
            <RichTextInput
              label="รายละเอียดเอกสาร"
              placeholder="กรอกรายละเอียด"
              {...field}
            />
          )}
        />
      </form>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-6">
      <RadioGroup
        label="ดำเนินการ"
        options={[
          { value: ProcessState.SEND_DOCUMENT, label: 'ส่งต่อเอกสาร' },
          { value: ProcessState.NOTIFY_SENDER, label: 'แจ้งผู้ส่งแก้ไขเอกสาร' },
          { value: ProcessState.COMPLETE, label: 'ดำเนินการเสร็จสิ้น' },
          { value: ProcessState.CANCEL, label: 'ยกเลิกเอกสาร' },
        ]}
        value={processState}
        onChange={setProcessState}
      />
      {renderSendDocumentForm()}
      {renderNotifySenderForm()}
      {processState === ProcessState.COMPLETE && (
        <p>
          เอกสารจะถูกบันทึกไว้ในระบบ โดยมีสถานะเสร็จสิ้นแล้ว
          ท่านจะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
        </p>
      )}
      {processState === ProcessState.CANCEL && (
        <p>เอกสารที่ได้รับการยกเลิกจะไม่สามารถแก้ไขหรือดำเนินต่อได้</p>
      )}
    </div>
  )
}

export default ProcessModalContent
