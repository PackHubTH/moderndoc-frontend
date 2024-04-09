const TemplateInfoBox = () => {
  const data = {}

  return (
    <div className="w-[388px] overflow-hidden rounded-2xl border-[1px]">
      <p className="bg-gray-100 px-6 py-2 font-semibold text-blue-500">
        คำร้องขอ
      </p>
      <img src="https://placehold.jp/388x150.png" alt="template" />
      <div className="grid grid-cols-2 break-all p-5">
        <p>สร้างเมื่อ</p>
        <p>2</p>
        <p>อัปเดตล่าสุดเมื่อ</p>
        <p>2</p>
        <p>ถูกสร้างเอกสาร</p>
        <p>2</p>
      </div>
      <p className="px-5 font-semibold">ผู้สร้าง Template</p>
    </div>
  )
}

export default TemplateInfoBox
