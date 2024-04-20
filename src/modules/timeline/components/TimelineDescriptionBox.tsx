const TimelineDescriptionBox = () => {
  return (
    <div className="rounded-lg border-2">
      <div className="bg-gray-200 px-6 py-3 font-semibold text-blue-500">
        รายละเอียดเอกสาร
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="create-by-img"
        className="h-[164px] w-full"
      />
      <div className="grid grid-cols-2 break-all p-5">
        <p>จำนวนหน้า</p>
        <p>2</p>
        <p>สร้างเมื่อ</p>
        <p>2</p>
        <p>อัปเดตล่าสุดเมื่อ</p>
        <p>2</p>
        <p>สถานะ</p>
        <p>2</p>
        <p>วันที่เสร็จสิ้น</p>
        <p>2</p>
      </div>
      <h1>ผู้สร้างเอกสาร</h1>
      <h1>ผู้รับเอกสาร</h1>
      <h1>ผู้อนุมัติหรือผู้ที่เกี่ยวข้อง</h1>
      <h1>ไทม์ไลน์</h1>
    </div>
  )
}

export default TimelineDescriptionBox
