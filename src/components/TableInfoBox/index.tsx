import { User } from '@/modules/user/hooks/types'
import { formatDate } from '@/utils/formatUtils'

type PropsType = {
  title: string
  userUpdatedBy: User
  userCreatedBy: User
  createdAt: string | Date
}

const TableInfoBox = ({
  title,
  userUpdatedBy,
  userCreatedBy,
  createdAt,
}: PropsType) => {
  return (
    <div>
      <div className="flex gap-2">
        <h1 className="mr-2 font-semibold text-blue-500">{title}</h1>
        <p className="font-medium text-gray-400">
          วันที่สร้างเอกสาร {formatDate(createdAt)}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="flex items-center gap-2 text-sm text-[#888888]">
          สร้างโดย
          <img
            src={userCreatedBy.profileImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          <span className="text-[#797979]">{userCreatedBy.nameTh}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-[#888888]">
          ส่งโดย
          <img
            src={userUpdatedBy.profileImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          <span className="text-[#797979]">{userUpdatedBy.nameTh}</span>
        </p>
      </div>
    </div>
  )
}

export default TableInfoBox
