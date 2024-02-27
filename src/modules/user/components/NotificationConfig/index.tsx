import Select from '@/components/Select'
import { compareArray } from '@/utils/arrayUtil'
import { useEffect } from 'react'

type PropsType = {
  isDefault?: boolean
  value: number[]
  onChange?: (value: number[], isDefault: boolean) => void
}

const options: {
  label: string
  value: number
}[] = []

for (let i = 1; i <= 7; i++) {
  options.push({
    label: `ส่งการแจ้งเตือนหลังจากได้รับเอกสาร ${i} วัน`,
    value: i,
  })
}

const NOT_NOTIFY = 1000

options.push({
  label: 'ไม่ต้องการการแจ้งเตือน',
  value: NOT_NOTIFY,
})

const DEFAULT_VALUE = [1, 3, 7]

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

  const onDayChange = (index: number, newValue: number) => {
    const tempArr = [...value]
    tempArr[index] = newValue
    for (let i = index + 1; i <= tempArr.length; i++) {
      if (tempArr[i] <= tempArr[i - 1] && tempArr[i] !== NOT_NOTIFY)
        tempArr[i] = tempArr[i - 1] + 1
      if (tempArr[i] > 7) tempArr.splice(i, 1)
    }
    if (tempArr.length < 3 && tempArr[tempArr.length - 1] !== 7)
      tempArr.push(tempArr[tempArr.length - 1] + 1)
    onChange?.(tempArr, false)
  }

  return (
    <div>
      <h1 className="font-semibold">กำหนดการเตือนความจำ</h1>
      <h2 className="text-sm">
        ผู้ส่งเอกสารสามารถกำหนดการเตือนความจำในแต่ละเอกสารได้เช่นเดียวกัน
      </h2>
      <label className="mb-2.5 mt-4 flex items-center gap-2">
        <input
          className="rounded-sm accent-blue-500"
          type="checkbox"
          checked={compareArray(value, DEFAULT_VALUE)}
          onChange={(e) => onChange?.(DEFAULT_VALUE, e.target.checked)}
        />
        <span className="text-sm">กำหนดการเตือนความจำด้วยค่าเริ่มต้น</span>
      </label>
      {value?.map(
        (day, index) =>
          value[index - 1] !== 7 && (
            <div>
              {index > 0 && <h3 className="mt-2.5 text-sm">ต่อมา</h3>}
              <Select
                label=""
                options={options.filter(
                  (option) =>
                    index === 0 ||
                    option.value > value[index - 1] ||
                    option.value === NOT_NOTIFY
                )}
                value={day}
                onChange={(value) => onDayChange(index, Number(value))}
              />
            </div>
          )
      )}
    </div>
  )
}

export default NotificationConfig
