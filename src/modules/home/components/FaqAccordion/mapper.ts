import { SendChannel } from '@/modules/faq/types'
import { gray, lime, sky, white, yellow } from 'tailwindcss/colors'
export const SendChannelTextMapper = {
  [SendChannel.ONSITE]: 'ไม่สามารถส่งภายในระบบได้ (Onsite)',
  [SendChannel.ONLINE]: 'สามารถส่งภายในระบบได้ (Online)',
  [SendChannel.BOTH]: 'สามารถส่งภายในระบบได้ และสามารถส่งนอกระบบได้ (Both)',
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
