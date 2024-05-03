import { DocumentSentStatus, DocumentStatus } from '../types/types'

import { UserRole } from 'types/user'
import { VariantType } from '@/components/Badge/types'

export const getStatusBadgeProps = (
  status: DocumentStatus,
  documentSentStatusReceive: DocumentSentStatus,
  documentSentStatusSend: DocumentSentStatus,
  isOwner: boolean,
  role: UserRole,
  isSentToOperator: boolean
) => {
  console.log('is Sent to operator', isSentToOperator)
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatusReceive === DocumentSentStatus.PROCESSING &&
    isOwner
  ) {
    return { variant: 'action' as VariantType, label: 'แก้ไขเอกสาร' }
  }
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatusReceive === DocumentSentStatus.PROCESSING &&
    role === UserRole.STAFF &&
    !isOwner
  ) {
    return { variant: 'action' as VariantType, label: 'ตรวจสอบเอกสาร' }
  }
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatusReceive === DocumentSentStatus.PROCESSING
  ) {
    return { variant: 'action' as VariantType, label: 'พิจารณาเอกสาร' }
  }
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatusReceive === DocumentSentStatus.RETURNING
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างแก้ไขเอกสาร',
    }
  }
  // if (
  //     status === DocumentStatus.PROCESSING &&
  //     documentSentStatus === DocumentSentStatus.
  // ) {
  //     return { variant: 'action' as VariantType, label: 'แก้ไขเอกสาร' }
  // }
  if (status === DocumentStatus.PROCESSING && isSentToOperator) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างตรวจสอบเอกสาร',
    }
  }
  if (
    status === DocumentStatus.PROCESSING &&
    documentSentStatusSend === DocumentSentStatus.PROCESSING
  ) {
    return {
      variant: 'waiting' as VariantType,
      label: 'อยู่ระหว่างผู้อนุมัติพิจารณาเอกสาร',
    }
  }
  if (status === DocumentStatus.DRAFT) {
    return { variant: 'action' as VariantType, label: 'ฉบับร่าง' }
  }
  if (
    status === DocumentStatus.COMPLETED ||
    (documentSentStatusReceive === DocumentSentStatus.COMPLETED &&
      status === DocumentStatus.PROCESSING)
  ) {
    return { variant: 'success' as VariantType, label: 'เสร็จสิ้นแล้ว' }
  }
  if (status === DocumentStatus.CANCELED) {
    return { variant: 'error' as VariantType, label: 'ยกเลิกแล้ว' }
  }
  return {
    variant: 'waiting' as VariantType,
    label: 'อยู่ระหว่างตรวจสอบเอกสาร',
  }
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
