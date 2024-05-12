import {
  getStatusBadgeProps,
  getTimelineStatus,
} from '@/modules/document/utils/statusUtils'
import { useEffect, useState } from 'react'
import { Document, Page } from 'react-pdf'

import Badge from '@/components/Badge'
import Loading from '@/components/Loading'
import useGetFile from '@/hooks/useGetFile'
import ProfileBox from '@/modules/document/components/ProfileBox'
import { GetDocumentById } from '@/modules/document/types/response'
import { DocumentStatus } from '@/modules/document/types/types'
import { useUserStore } from '@/stores/userStore'
import { formatFullDatetime } from '@/utils/formatUtils'
import { IoDocumentText } from 'react-icons/io5'

type PropsType = {
  data: GetDocumentById
  isSidebar?: boolean
}

const TimelineDescriptionBox = ({ data, isSidebar }: PropsType) => {
  const {
    data: file,
    refetch: refetchFile,
    isFetched,
  } = useGetFile(data?.templateFile ?? '')
  const user = useUserStore((state) => state.user)

  const [pageTotal, setPageTotal] = useState(0)

  useEffect(() => {
    if (!file) refetchFile()
  }, [data])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageTotal(numPages)
  }

  return (
    <div className={!isSidebar ? 'mt-4 rounded-lg border-2' : ''}>
      <div className="bg-gray-100 px-6 py-3 font-semibold text-blue-500">
        รายละเอียดเอกสาร
      </div>
      {data && isFetched ? (
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
          <div className="my-5 grid grid-cols-2 gap-1 break-all">
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
          {data?.operator && (
            <>
              <h1 className="font-semibold">ผู้รับเอกสาร</h1>
              <ProfileBox
                name={data?.operator?.nameTh}
                email={
                  data?.operator?.emails[data?.operator?.defaultEmailIndex] ??
                  ''
                }
                profileImg={data?.operator?.profileImg}
              />
            </>
          )}
          {data?.documentSents.length > 0 && (
            <>
              <h1 className="font-semibold">ผู้อนุมัติหรือผู้ที่เกี่ยวข้อง</h1>
              {data?.documentSents.map((sent, index) => (
                <div key={index}>
                  <ProfileBox
                    name={sent.receiver.nameTh}
                    email={
                      sent.receiver.emails[sent.receiver.defaultEmailIndex]
                    }
                    profileImg={sent.receiver.profileImg}
                  />
                </div>
              ))}
            </>
          )}
          {data?.documentTimelines.length > 0 && (
            <>
              <h1 className="font-semibold">ไทม์ไลน์</h1>
              {data?.documentTimelines.map((timeline) => (
                <div key={timeline.id} className="flex items-center gap-2">
                  <IoDocumentText size={32} className="text-blue-500" />
                  <div className="space-y-1 py-2">
                    <p className="text-sm">
                      {getTimelineStatus(
                        timeline.documentStatus,
                        timeline.status,
                        timeline.updatedBy,
                        timeline.userId,
                        data.createdBy,
                        data.operatorId
                      )}{' '}
                      <span className="ml-2 text-xs text-gray-400">
                        {formatFullDatetime(timeline.createdAt)}
                      </span>
                    </p>
                    <p className="text-xs">{timeline.userUpdatedBy.nameTh}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default TimelineDescriptionBox
