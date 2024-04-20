import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import { FaPlus } from 'react-icons/fa6'
import TimelineListTable from '../components/TimelineListTable'

// import TemplateInfoBox from '../components/TemplateInfoBox'
// import TemplateListTable from '../components/TemplateListTable'
// import UploadModal from '../components/UploadModal'

const TimelineManagementPage: React.FC = () => {
  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการไทม์ไลน์</h1>
      <div className="flex items-center justify-between">
        <Button
          label="สร้าง Template"
          variant="green"
          leftIcon={<FaPlus size={18} />}
          //   onClick={open}
        />
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <div className="flex">
        {/* <TemplateListTable /> */}
        {/* <TemplateInfoBox /> */}
        <TimelineListTable />
      </div>
    </PageContainer>
  )
}

export default TimelineManagementPage
