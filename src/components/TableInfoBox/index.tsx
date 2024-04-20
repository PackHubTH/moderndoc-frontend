type PropsType = {
  title: string
  createdAt: string
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
      <div className="flex gap-3">
        <h1 className="font-semibold text-blue-500">{title}</h1>
        <p className="font-medium text-gray-400">
          วันที่สร้างเอกสาร {createdAt}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="flex items-center gap-2">
          สร้างโดย
          <img
            src={createdByImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          {createdBy}
        </p>
        <p className="flex items-center gap-2">
          ดำเนินการโดย
          <img
            src={updatedByImg}
            alt="create-by-img"
            className="h-5 w-5 rounded-full"
          />
          {updatedBy}
        </p>
      </div>
    </div>
  )
}

export default TableInfoBox
