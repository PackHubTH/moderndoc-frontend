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
      <p className="font-bold">ปิดจบเอกสาร (Finalize) เนื่องจาก</p>
      test
      <p className="text-sm text-gray-500">
        หมายเหตุ: หากยืนยันการปิดจบ (Finalize) เอกสารแล้ว จะไม่สามารถเปลี่ยนแปลง
        หรือดำเนินการเอกสารต่อได้
      </p>
    </div>
  )
}

export default FinalizeModalContent
