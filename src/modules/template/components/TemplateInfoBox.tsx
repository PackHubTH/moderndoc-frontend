import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'

import useGetFile from '@/hooks/useGetFile'
import ProfileBox from '@/modules/document/components/ProfileBox'
import { useUserStore } from '@/stores/userStore'
import { formatFullDatetime } from '@/utils/formatUtils'
import { Template } from '../types/types'

interface TemplateInfoBoxProps {
  data: Template
}
const TemplateInfoBox = ({ data }: TemplateInfoBoxProps) => {
  const { data: file, refetch: refetchFile } = useGetFile(
    data?.templateFile ?? ''
  )
  const user = useUserStore((state) => state.user)

  const [pageTotal, setPageTotal] = useState(0)

  useEffect(() => {
    if (!file) refetchFile()
  }, [data])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageTotal(numPages)
  }

  console.log('data', data)

  return (
    // <div className="mt-4 w-[388px] overflow-hidden rounded-2xl border-[1px]">
    <div className="mt-4 rounded-lg border-2">
      <p className="bg-gray-100 px-6 py-3 font-semibold text-blue-500">
        {data.title}
      </p>
      <div className="space-y-5 p-5">
        {/* <img src="https://placehold.jp/388x150.png" alt="template" /> */}
        <div className="flex h-36 justify-center overflow-hidden border-b-2">
          <Document file={file?.data} onLoadSuccess={onDocumentLoadSuccess}>
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={1}
              width={300}
            />
          </Document>
        </div>
        <div className="grid grid-cols-2 gap-1 break-all">
          <p>สร้างเมื่อ</p>
          <p>{formatFullDatetime(data.lastUpdatedAt)}</p>
          <p>อัปเดตล่าสุดเมื่อ</p>
          <p>{formatFullDatetime(data.lastUpdatedAt)}</p>
          <p>ถูกสร้างเอกสาร</p>
          <p>
            {data.createdCount} <span className="ms-3">ครั้ง</span>
          </p>
        </div>
        <div>
          <p className="font-semibold">ผู้สร้าง Template</p>
          <ProfileBox
            email={data.userCreated.emails[data.userCreated.defaultEmailIndex]}
            name={data.userCreated.nameTh}
            profileImg={data.userCreated.profileImg}
          />
        </div>
      </div>
    </div>
  )
}

export default TemplateInfoBox
