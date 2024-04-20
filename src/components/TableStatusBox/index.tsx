import Badge from '../Badge'

type PropsType = {
  status: string
  updatedAt: string
}

const TableStatusBox = ({ status, updatedAt }: PropsType) => {
  return (
    <div className="flex flex-col items-end">
      <Badge label={status} variant="waiting" />
      <p className="font-medium text-gray-400">อัปเดตล่าสุดเมื่อ {updatedAt}</p>
    </div>
  )
}
export default TableStatusBox
