import ProfileBox from '@/modules/document/components/ProfileBox'
import { GetDocumentById } from '@/modules/document/types/response'

type PropsType = {
  data: GetDocumentById
}

const TimelineDescriptionBox = ({ data }: PropsType) => {
  console.log('data', data)
  return (
    <div className="rounded-lg border-2">
      <div className="bg-gray-200 px-6 py-3 font-semibold text-blue-500">
        รายละเอียดเอกสาร
      </div>
      <div className="p-5">
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
        <h1 className="font-semibold">ผู้สร้างเอกสาร</h1>
        <ProfileBox name={data.createdBy} email="test" profileImg="" />
        <h1 className="font-semibold">ผู้รับเอกสาร</h1>
        <ProfileBox name={data.updatedBy} email="test" profileImg="" />
        <h1 className="font-semibold">ผู้อนุมัติหรือผู้ที่เกี่ยวข้อง</h1>
        {data?.documentSents.map((sent, index) => (
          <div key={index}>
            <ProfileBox name={'test'} email="test" profileImg="" />
          </div>
        ))}
        <h1 className="font-semibold">ไทม์ไลน์</h1>
        {data?.documentTimelines.map((timeline) => (
          <div key={timeline.id} className="p-5">
            <p>
              {timeline.status}{' '}
              {new Date(timeline.createdAt).toLocaleDateString()}
            </p>
            <p>{timeline.userUpdatedBy.nameTh}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimelineDescriptionBox
