import { SendChannel } from '@/modules/faq/types'
import { gray, lime, sky, white, yellow } from 'tailwindcss/colors'
export const SendChannelTextMapper = {
  [SendChannel.ONSITE]: 'ส่งในสถานที่ (Onsite)',
  [SendChannel.ONLINE]: 'ส่งภายในระบบ (Online)',
  [SendChannel.BOTH]: 'ส่งได้ทั้งในระบบ Online และ Onsite',
  [SendChannel.OTHER]: 'อื่นๆ (Other)',
}

export const SendChannelBgColorMapper = {
  [SendChannel.ONSITE]: yellow[100],
  [SendChannel.ONLINE]: sky[100],
  [SendChannel.BOTH]: lime[100],
  [SendChannel.OTHER]: gray[500],
}

export const SendChannelTextColorMapper = {
  [SendChannel.ONSITE]: yellow[500],
  [SendChannel.ONLINE]: sky[500],
  [SendChannel.BOTH]: lime[500],
  [SendChannel.OTHER]: white,
}
