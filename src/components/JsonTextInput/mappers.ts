import Facebook from '@/assets/facebook.png'
import Line from '@/assets/line.png'
import Phone from '@/assets/phone.png'
import Pin from '@/assets/pin.png'
import Schedule from '@/assets/schedule.png'
import Website from '@/assets/website.png'

export const getContactInfoIcon = (contactInfo: string) => {
  switch (contactInfo) {
    case 'ที่ตั้ง':
      return Pin
    case 'เบอร์โทรศัพท์':
      return Phone
    case 'เว็ปไซต์ (Link URL)':
      return Website
    case 'เพจ Facebook':
      return Facebook
    case 'Line ID':
      return Line
    case 'วันเวลาทำการ':
      return Schedule
    default:
      return undefined
  }
}
