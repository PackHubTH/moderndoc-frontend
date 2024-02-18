import Select from '@/components/Select'
import { useEffect } from 'react'

type PropsType = {
  isDefault?: boolean
  value: string[]
  onChange?: (value: string[], isDefault: boolean) => void
}

const options: {
  label: string
  value: string
}[] = []

for (let i = 1; i <= 7; i++) {
  options.push({
    label: `ส่งการแจ้งเตือนหลังจากได้รับเอกสาร ${i} วัน`,
    value: `${i}`,
  })
}

const DEFAULT_VALUE = ['1', '3', '7']

const NotificationConfig: React.FC<PropsType> = ({
  isDefault,
  value,
  onChange,
}) => {
  useEffect(() => {
    if (isDefault || !value) {
      onChange?.(DEFAULT_VALUE, true)
    }
  }, [isDefault])

  const onDayChange = (index: number, newValue: string) => {
    const newValueArr = [...(value ?? [])]
    newValueArr[index] = newValue
    onChange?.(newValueArr, false)
  }
  return (
    <div>
      <h1 className="font-semibold">กำหนดการเตือนความจำ</h1>
      <h2 className="text-sm">
        ผู้ส่งเอกสารสามารถกำหนดการเตือนความจำในแต่ละเอกสารได้เช่นเดียวกัน
      </h2>
      <label className="flex items-center gap-2 mt-4 mb-2.5">
        <input
          className="rounded-sm accent-blue-500"
          type="checkbox"
          onChange={(e) => onChange?.(value, e.target.checked)}
        />
        <span className="text-sm">กำหนดการเตือนความจำด้วยค่าเริ่มต้น</span>
      </label>
      {value?.map((day, index) => (
        <div>
          {index > 0 && <h3 className="text-sm mt-2.5">ต่อมา</h3>}
          <Select
            label=""
            options={options}
            value={day}
            onChange={(value) => {
              const newValue = [...(value ?? [])]
              newValue[index] = value
              onChange?.(newValue, false)
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default NotificationConfig
