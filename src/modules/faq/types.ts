import { Department } from '../user/hooks/types'

export enum SendChannel {
  ONSITE = 'ONSITE',
  ONLINE = 'ONLINE',
  BOTH = 'BOTH',
  OTHER = 'OTHER',
}

export type Tag = {
  id: string
  name: string
}

export type Faq = {
  id: string
  templateId?: string
  description: string
  isInternal: boolean
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
  departmentId: string
  documentCodeEn: string
  documentCodeTh: string
  sendChannel: SendChannel
  sendChannelInfo: string
  titleEn: string
  titleTh: string
  extraContact: object
  files: string[]
  subFaqs: SubFaqs[]
  faqTags: FaqTags[]
  department: Department
  userUpdated: UserUpdated
}

export type UserUpdated = {
  id: string
  nameTh: string
  emails: string[]
  defaultEmailIndex: number
  profileImg: string
}

export type SubFaqs = {
  id: string
  faqId: string
  title: string
  description: string
  createdBy: string
  updatedBy: string
  lastUpdatedAt: string
}

export type FaqTags = {
  faqId: string
  tagId: string
  tag: Tag
}
