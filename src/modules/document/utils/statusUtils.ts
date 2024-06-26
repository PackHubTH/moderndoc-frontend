import {
  DocumentSent,
  DocumentSentStatus,
  DocumentStatus,
} from '../types/types'

import { VariantType } from '@/components/Badge/types'

export const getStatusBadgeProps = (
  documentSent: DocumentSent[],
  status: DocumentStatus,
  userId: string,
  createdById: string,
  operatorId: string
) => {
  const senderStatus = documentSent
    ?.sort(
      (a, b) => new Date(b.sendAt).getTime() - new Date(a.sendAt).getTime()
    )
    ?.find((sent) => sent.senderId === userId)?.status as DocumentSentStatus

  const receiverStatus = documentSent
    ?.sort(
      (a, b) => new Date(b.sendAt).getTime() - new Date(a.sendAt).getTime()
    )
    ?.find((sent) => sent.receiverId === userId)?.status as DocumentSentStatus

  if (status === DocumentStatus.DRAFT) {
    return { variant: 'action' as VariantType, label: 'ฉบับร่าง' }
  }
  if (status === DocumentStatus.COMPLETED) {
    return { variant: 'success' as VariantType, label: 'เสร็จสิ้นแล้ว' }
  }
  if (status === DocumentStatus.CANCELED) {
    return { variant: 'error' as VariantType, label: 'ยกเลิกแล้ว' }
  }
  // TEACHER
  if (
    status === DocumentStatus.PROCESSING &&
    receiverStatus === DocumentSentStatus.PROCESSING &&
    userId !== createdById &&
    userId !== operatorId
  ) {
    return { variant: 'action' as VariantType, label: 'พิจารณาเอกสาร' }
  }
  // STUDENT
  if (
    userId === createdById &&
    status === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.RETURNING
  ) {
    return { variant: 'action' as VariantType, label: 'แก้ไขเอกสาร' }
  }
  // STAFF
  if (
    status === DocumentStatus.PROCESSING &&
    documentSent.some(
      (sent) =>
        sent.receiverId === userId &&
        sent.status === DocumentSentStatus.PROCESSING
    )
  ) {
    return { variant: 'action' as VariantType, label: 'ตรวจสอบเอกสาร' }
  }

  if (
    (userId !== operatorId &&
      status === DocumentStatus.PROCESSING &&
      documentSent.some(
        (sent) =>
          sent.receiverId === operatorId &&
          sent.status === DocumentSentStatus.PROCESSING
      )) ||
    (status === DocumentStatus.PROCESSING &&
      documentSent.some(
        (sent) =>
          sent.receiverId === userId &&
          sent.status === DocumentSentStatus.COMPLETED
      ) &&
      userId !== createdById &&
      userId !== operatorId)
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างตรวจสอบเอกสาร',
    }
  }
  if (
    userId !== createdById &&
    documentSent.some(
      (sent) =>
        sent.senderId === createdById &&
        sent.status === DocumentSentStatus.RETURNING
    )
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างแก้ไขเอกสาร',
    }
  }
  if (
    status === DocumentStatus.PROCESSING &&
    documentSent.some(
      (sent) =>
        (sent.senderId === userId &&
          sent.status === DocumentSentStatus.PROCESSING) ||
        (sent.senderId === userId && sent.status === DocumentSentStatus.WAITING)
    )
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างผู้อนุมัติพิจารณาเอกสาร',
    }
  }

  return { variant: 'waiting' as VariantType, label: '-' }
}

export const shouldShowAction = (
  status: string,
  documentSentStatus: string
) => {
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatus === DocumentSentStatus.PROCESSING
  ) {
    return true
  }
  if (status === DocumentStatus.DRAFT) return true

  return false
}
