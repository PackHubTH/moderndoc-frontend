import { formatDate } from '@/utils/formatUtils'
import Badge from '../Badge'
import { VariantType } from '../Badge/types'

type PropsType = {
  label: string
  variant: VariantType
  updatedAt: string
}

const TableStatusBox = ({ label, variant, updatedAt }: PropsType) => {
  return (
    <div className="flex flex-col items-end gap-2">
      <Badge label={label} variant={variant} />
      <p className="text-gray-400">อัพเดตล่าสุดเมื่อ {formatDate(updatedAt)}</p>
    </div>
  )
}
export default TableStatusBox
