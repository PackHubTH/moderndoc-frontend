import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'

import Badge from '@/components/Badge'
import useGetFile from '@/hooks/useGetFile'
import ProfileBox from '@/modules/document/components/ProfileBox'
import { GetDocumentById } from '@/modules/document/types/response'
import { DocumentStatus } from '@/modules/document/types/types'
import { getStatusBadgeProps } from '@/modules/document/utils/statusUtils'
import { useUserStore } from '@/stores/userStore'
import { formatFullDatetime } from '@/utils/formatUtils'

type PropsType = {
  data: GetDocumentById
}

const TimelineDescriptionBox = ({ data }: PropsType) => {
  console.log('data', data)
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
  // const onPageLoadSuccess = (pageNumber: number) => {
  //   const pages = canvasRef.current?.children[0]
  //   if (pages)
  //     setCanvasSize(
  //       `${pageNumber - 1}`,
  //       pages.children[pageNumber - 1].clientHeight,
  //       pages.children[pageNumber - 1].clientWidth
  //     )
  // }

  if (data)
    return (
      <div className="mt-4 rounded-lg border-2">
        <div className="bg-gray-100 px-6 py-3 font-semibold text-blue-500">
          รายละเอียดเอกสาร
        </div>
        <div className="p-5">
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
          <div className="grid grid-cols-2 gap-1 break-all p-5">
            <p>จำนวนหน้า</p>
            <p>{pageTotal}</p>
            <p>สร้างเมื่อ</p>
            <p>{formatFullDatetime(data?.createdAt)}</p>
            <p>อัปเดตล่าสุดเมื่อ</p>
            <p>{formatFullDatetime(data?.lastUpdatedAt)}</p>
            <p>สถานะ</p>
            <div>
              <Badge
                {...getStatusBadgeProps(
                  data?.documentSents ?? [],
                  data?.status as DocumentStatus,
                  user.id,
                  data?.createdBy,
                  data?.operatorId
                )}
              />
            </div>
            <p>วันที่เสร็จสิ้น</p>
            <p>
              {data?.status === DocumentStatus.COMPLETED
                ? formatFullDatetime(data?.lastUpdatedAt)
                : '-'}
            </p>
          </div>
          <h1 className="font-semibold">ผู้สร้างเอกสาร</h1>
          <ProfileBox
            name={data.userCreated.nameTh}
            email={
              data.userCreated.emails[data.userCreated.defaultEmailIndex] ?? ''
            }
            profileImg={data.userCreated.profileImg}
          />

          <h1 className="font-semibold">ผู้รับเอกสาร</h1>
          {data?.operator?.emails && (
            <ProfileBox
              name={data?.operator?.nameTh}
              email={
                data?.operator?.emails[data?.operator?.defaultEmailIndex] ?? ''
              }
              profileImg={data?.operator?.profileImg}
            />
          )}
          <h1 className="font-semibold">ผู้อนุมัติหรือผู้ที่เกี่ยวข้อง</h1>
          {data?.documentSents.map((sent, index) => (
            <div key={index}>
              <ProfileBox
                name={sent.receiver.nameTh}
                email={sent.receiver.emails[sent.receiver.defaultEmailIndex]}
                profileImg={sent.receiver.profileImg}
              />
            </div>
          ))}
          <h1 className="font-semibold">ไทม์ไลน์</h1>
          {data?.documentTimelines.map((timeline) => (
            <div key={timeline.id} className="space-y-2 p-5">
              <p className="text-xs">
                {timeline.status} {formatFullDatetime(timeline.createdAt)}
              </p>
              <p className="text-xs">{timeline.userUpdatedBy.nameTh}</p>
            </div>
          ))}
        </div>
      </div>
    )
}

export default TimelineDescriptionBox
