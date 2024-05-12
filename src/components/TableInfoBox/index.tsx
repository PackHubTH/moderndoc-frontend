import { formatFullDatetime } from '@/utils/formatUtils'

type PropsType = {
  title: string
  createdAt: string | Date
  createdBy: string
  updatedBy: string
  createdByImg?: string
  updatedByImg?: string
}

const TableInfoBox = ({
  title,
  createdAt,
  createdBy,
  createdByImg,
  updatedBy,
  updatedByImg,
}: PropsType) => {
  return (
    <div>
      <div className="flex gap-2">
        <h1 className="mr-2 font-semibold text-blue-500">{title}</h1>
        <p className="font-medium text-gray-400">
          วันที่สร้างเอกสาร {formatFullDatetime(createdAt)}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="flex items-center gap-2 text-sm text-[#888888]">
          สร้างโดย
          <img
            src={createdByImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          <span className="text-[#797979]">{createdBy}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-[#888888]">
          ดำเนินการโดย
          <img
            src={updatedByImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          <span className="text-[#797979]">{updatedBy}</span>
        </p>
      </div>
    </div>

    // <div>
    // <p className="text-[#888888]">
    //   <span className="mr-2 font-semibold text-blue-500">
    //     {info.row.original.title}
    //   </span>
    //   วันที่สร้างเอกสาร {formatFullDatetime(info.row.original.createdAt)}
    // </p>
    // <div className="flex gap-2">
    //   <p className="flex items-center gap-2 text-sm text-[#888888]">
    //     สร้างโดย
    //     <img
    //       src={info.row.original.userCreated?.profileImg}
    //       alt="create-by-img"
    //       className="h-5 w-5 rounded-full"
    //     />
    //     <span className="text-[#797979]">
    //       {info.row.original.userCreated?.nameTh}
    //     </span>
    //   </p>
    //   {info.row.original.operator && (
    //     <p className="flex items-center gap-2 text-sm text-[#888888]">
    //       ดำเนินการโดย
    //       <img
    //         src={info.row.original.operator?.profileImg}
    //         alt="create-by-img"
    //         className="h-5 w-5 rounded-full"
    //       />
    //       <span className="text-[#797979]">
    //         {info.row.original.operator?.nameTh}
    //       </span>
    //     </p>
    //   )}
    // </div>
    // </div>
  )
}

export default TableInfoBox
