import ProfileBox from '@/modules/document/components/ProfileBox'
import { Template } from '../types/types'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

interface TemplateInfoBoxProps {
  data: Template
}
const TemplateInfoBox = ({ data }: TemplateInfoBoxProps) => {
  return (
    <div className="w-[388px] overflow-hidden rounded-2xl border-[1px]">
      <p className="bg-gray-100 px-6 py-2 font-semibold text-blue-500">
        {data.title}
      </p>
      <img src="https://placehold.jp/388x150.png" alt="template" />
      <div className="grid grid-cols-2 break-all p-5">
        <p>สร้างเมื่อ</p>
        <p>test</p>
        <p>อัปเดตล่าสุดเมื่อ</p>
        <p>
          {format(data.lastUpdatedAt, 'dd MMM yy, p', {
            locale: th,
          })}
        </p>
        <p>ถูกสร้างเอกสาร</p>
        <p>
          {data.createdCount} <span className="ms-3">ครั้ง</span>
        </p>
      </div>
      <div className="px-5">
        <p className="font-semibold">ผู้สร้าง Template</p>
        <ProfileBox
          email={data.userCreated.emails[data.userCreated.defaultEmailIndex]}
          name={data.userCreated.nameTh}
          profileImg={data.userCreated.profileImg}
        />
      </div>
    </div>
  )
}

export default TemplateInfoBox
