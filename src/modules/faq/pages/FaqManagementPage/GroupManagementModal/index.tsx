import Modal from '@/components/Modal'
import Tabs from '@/components/Tabs'
import { MdModeEditOutline } from 'react-icons/md'
import AgenciesTab from './AgenciesTab'
import TagsTab from './TagsTab'

type PropsType = {
  isOpen: boolean
  onClose: () => void
}

const GroupManagementModal: React.FC<PropsType> = ({ isOpen, onClose }) => {
  return (
    <Modal
      width="800px"
      title={
        <div className="mt-4 flex flex-col items-center justify-center gap-3 text-gray-600">
          <span className="flex items-center justify-center gap-2 text-gray-600">
            <MdModeEditOutline
              size={24}
              className="rounded-full text-yellow-500"
            />
            จัดการกลุ่ม FAQ
          </span>
          <span className="text-sm font-normal text-gray-500">
            กลุ่ม FAQ ใช้เมื่อผู้ใช้งานค้นหาข้อมูลหรือเอกสาร
          </span>
        </div>
      }
      content={
        <div className="px-8 py-2">
          <Tabs
            tabs={[
              {
                title: 'หมวดหมู่',
                content: <TagsTab />,
              },
              {
                title: 'หน่วยงาน',
                content: <AgenciesTab />,
              },
            ]}
          />
        </div>
      }
      onClose={onClose}
      isOpen={isOpen}
    />
  )
}

export default GroupManagementModal
