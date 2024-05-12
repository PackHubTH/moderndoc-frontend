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
  // if (
  //   documentStatus === DocumentStatus.PROCESSING &&
  //   userStatus === DocumentSentStatus.COMPLETED &&
  //   userId !== createdById &&
  //   userId !== operatorId
  // ) {
  //   return 'อยู่ระหว่างตรวจสอบเอกสาร'
  // }
  // if (userId !== createdById && userStatus === DocumentSentStatus.RETURNING) {
  //   return 'อยู่ระหว่างแก้ไขเอกสาร'
  // }
  // if (
  //   documentStatus === DocumentStatus.PROCESSING &&
  //   userStatus === DocumentSentStatus.PROCESSING
  // ) {
  //   return 'อยู่ระหว่างผู้อนุมัติพิจารณาเอกสาร'
  // }

  return '-'
}

export const getTimelineStatusBadge = (
  documentStatus: DocumentStatus,
  senderStatus: DocumentSentStatus,
  senderId: string,
  receiverId: string
) => {
  if (documentStatus === DocumentStatus.DRAFT) {
    return { variant: 'action' as VariantType, label: 'ฉบับร่าง' }
  }
  if (documentStatus === DocumentStatus.COMPLETED) {
    return { variant: 'success' as VariantType, label: 'เสร็จสิ้นแล้ว' }
  }
  if (documentStatus === DocumentStatus.CANCELED) {
    return { variant: 'error' as VariantType, label: 'ยกเลิกแล้ว' }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId === receiverId
  ) {
    return { variant: 'waiting' as VariantType, label: 'รอตรวจสอบเอกสาร' }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.WAITING &&
    senderId !== receiverId
  ) {
    return { variant: 'waiting' as VariantType, label: 'รอพิจารณาเอกสาร' }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.RETURNING
  ) {
    return { variant: 'waiting' as VariantType, label: 'รอแก้ไขเอกสาร' }
  }
  if (
    documentStatus === DocumentStatus.PROCESSING &&
    senderStatus === DocumentSentStatus.PROCESSING
  ) {
    return { variant: 'waiting' as VariantType, label: 'ตรวจสอบเอกสาร' }
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
