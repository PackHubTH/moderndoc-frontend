import RadioGroup from '@/components/RadioGroup'
import { useState } from 'react'

type PropsType = {
  onSelected?: (selected: string) => void
}

const FinalizeModalContent: React.FC<PropsType> = ({ onSelected }) => {
  const [selected, setSelected] = useState('')

  const handleSelected = (selected: string) => {
    setSelected(selected)
    onSelected && onSelected(selected)
  }

  return (
    <div className="px-2">
      <RadioGroup
        label="ปิดจบเอกสาร (Finalize) เนื่องจาก"
        options={[
          { value: '0', label: 'เอกสารดำเนินการเสร็จสิ้นแล้ว' },
          { value: '1', label: 'ยกเลิกเอกสาร' },
        ]}
        value={selected}
        onChange={handleSelected}
      />
      <p className="mt-5 text-sm text-gray-500">
        <span className="text-red-500">หมายเหตุ:</span> หากยืนยันการปิดจบ
        (Finalize) เอกสารแล้ว จะไม่สามารถเปลี่ยนแปลง หรือดำเนินการเอกสารต่อได้
      </p>
    </div>
  )
}

export default FinalizeModalContent
