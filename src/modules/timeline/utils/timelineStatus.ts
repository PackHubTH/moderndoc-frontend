import { VariantType } from '@/components/Badge/types'
import { DocumentStatus } from '@/modules/document/types/types'
import Cancel from '@/modules/timeline/assets/cancel.png'
import Checked from '@/modules/timeline/assets/checked.png'
import Doc from '@/modules/timeline/assets/doc.png'
import Eye from '@/modules/timeline/assets/eye.png'
import Pencil from '@/modules/timeline/assets/pencil.png'
import Watch from '@/modules/timeline/assets/watch.png'
import { DocumentSentStatus } from '../types/types'

export const getTimelineStatus = (
  documentStatus: DocumentStatus,
  senderStatus: DocumentSentStatus,
  senderId: string,
  receiverId: string,
  createdById: string,
  operatorId: string
) => {
  if (documentStatus === DocumentStatus.DRAFT) {
    return 'ฉบับร่าง'
  }
  if (documentStatus === DocumentStatus.COMPLETED) {
    return 'เสร็จสิ้นแล้ว'
  }
  if (documentStatus === DocumentStatus.CANCELED) {
    return 'ยกเลิกแล้ว'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId === createdById
  ) {
    return 'รอตรวจสอบเอกสาร'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId === operatorId
  ) {
    return 'รอพิจารณาเอกสาร'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.RETURNING &&
    senderId === operatorId
  ) {
    return 'รอแก้ไขเอกสาร'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.PROCESSING &&
    senderId === operatorId
  ) {
    return 'ตรวจสอบเอกสาร'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.PROCESSING &&
    senderId !== createdById &&
    senderId !== operatorId
  ) {
    return 'พิจารณาอนุมัติ'
  }
  if (
    senderId === createdById &&
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.RETURNING
  ) {
    return 'แก้ไขเอกสาร'
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.PROCESSING &&
    senderId === createdById
  ) {
    return 'แก้ไขเอกสาร'
  }

  return '-'
}

export const getTimelineStatusBadge = (
  documentStatus: DocumentStatus,
  senderStatus: DocumentSentStatus,
  senderId: string,
  receiverId: string
) => {
  if (documentStatus === DocumentStatus.DRAFT) {
    return { variant: 'action' as VariantType, label: 'ฉบับร่าง', icon: Doc }
  }
  if (documentStatus === DocumentStatus.COMPLETED) {
    return {
      variant: 'success' as VariantType,
      label: 'เสร็จสิ้นแล้ว',
      icon: Checked,
    }
  }
  if (documentStatus === DocumentStatus.CANCELED) {
    return {
      variant: 'error' as VariantType,
      label: 'ยกเลิกแล้ว',
      icon: Cancel,
    }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId === receiverId
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'รอตรวจสอบเอกสาร',
      icon: Eye,
    }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId !== receiverId
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'รอพิจารณาเอกสาร',
      icon: Watch,
    }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.RETURNING
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'รอแก้ไขเอกสาร',
      icon: Pencil,
    }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.PROCESSING
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'ตรวจสอบเอกสาร',
      icon: Eye,
    }
  }
  return { variant: 'waiting' as VariantType, label: '-' }
}

// export const timelineIconMapper: Record<DocumentSentStatus, string> = {
//   [DocumentSentStatus.SENT]: Doc,
// }
