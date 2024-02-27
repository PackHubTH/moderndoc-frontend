import {
  IoChatboxEllipsesOutline,
  IoDocumentTextOutline,
  IoDocumentsOutline,
  IoGlobeOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from 'react-icons/io5'

export const SIDE_BAR_MENUS = [
  {
    name: 'หน้าหลัก',
    icon: <IoHomeOutline />,
    link: '/',
  },
  {
    name: 'รายการเอกสาร',
    icon: <IoDocumentTextOutline />,
    link: null,
  },
  {
    name: 'ไทม์ไลน์',
    icon: <IoNotificationsOutline />,
    link: null,
  },
  {
    name: 'รายการเทมเพลต',
    icon: <IoDocumentsOutline />,
    link: null,
  },
  {
    name: 'แก้ไขข้อมูลส่วนตัว',
    icon: <IoPersonOutline />,
    link: '/edit-user',
  },
  {
    name: 'จัดการหน่วยงาน',
    icon: <IoGlobeOutline />,
    link: null,
  },
  {
    name: 'จัดการรายการ FAQ',
    icon: <IoChatboxEllipsesOutline />,
    link: null,
  },
]
