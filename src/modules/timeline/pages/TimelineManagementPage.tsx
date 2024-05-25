import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import TimelineListTable from '../components/TimelineListTable'

const TimelineManagementPage: React.FC = () => {
  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการไทม์ไลน์</h1>
      <div className="flex items-center justify-end">
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <TimelineListTable />
    </PageContainer>
  )
}

export default TimelineManagementPage
