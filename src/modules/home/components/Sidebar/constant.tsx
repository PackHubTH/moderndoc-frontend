import {
  IoChatboxEllipsesOutline,
  IoDocumentTextOutline,
  IoDocumentsOutline,
  IoGlobeOutline,
  IoHomeOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from 'react-icons/io5'

import { UserRole } from 'types/user'

export const SIDE_BAR_MENUS = [
  {
    name: 'หน้าหลัก',
    icon: <IoHomeOutline />,
    link: '/',
    role: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER, UserRole.STUDENT],
  },
  {
    name: 'รายการเอกสาร',
    icon: <IoDocumentTextOutline />,
    link: '/document-management',
    role: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER, UserRole.STUDENT],
  },
  {
    name: 'ไทม์ไลน์',
    icon: <IoNotificationsOutline />,
    link: null,
    role: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER, UserRole.STUDENT],
  },
  {
    name: 'รายการเทมเพลต',
    icon: <IoDocumentsOutline />,
    link: '/template-management',
    role: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    name: 'แก้ไขข้อมูลส่วนตัว',
    icon: <IoPersonOutline />,
    link: '/edit-user',
    role: [UserRole.ADMIN, UserRole.STAFF, UserRole.TEACHER, UserRole.STUDENT],
  },
  {
    name: 'จัดการหน่วยงาน',
    icon: <IoGlobeOutline />,
    link: '/department-management',
    role: [UserRole.ADMIN, UserRole.STAFF],
  },
  {
    name: 'จัดการรายการ FAQ',
    icon: <IoChatboxEllipsesOutline />,
    link: '/faq-management',
    role: [UserRole.ADMIN, UserRole.STAFF],
  },
]
