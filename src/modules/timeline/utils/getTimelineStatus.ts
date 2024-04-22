import { DocumentSentStatus } from '../types/types'

export const getTimelineStatus = (status: string) => {
  switch (status) {
    case DocumentSentStatus.SENT:
      return 'ส่งเอกสารแล้ว'
    case DocumentSentStatus.PROCESSING:
      return 'กำลังดำเนินการ'
    case DocumentSentStatus.RETURNING:
      return 'ส่งกลับ'
    case DocumentSentStatus.WAITING:
      return 'รอดำเนินการ'
    case DocumentSentStatus.COMPLETED:
      return 'เสร็จสิ้น'
    case DocumentSentStatus.CANCELED:
      return 'ยกเลิก'
    default:
      return 'ไม่ระบุ'
  }
}
