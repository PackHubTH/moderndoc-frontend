import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import { useSearchParams } from 'react-router-dom'
import TimelineListTable from '../components/TimelineListTable'

const TimelineManagementPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search') ?? ''

  return (
    <PageContainer className="space-y-8 p-7">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-600">รายการไทม์ไลน์</h1>
        <TextInput
          className="w-[240px]"
          placeholder="ค้นหา..."
          value={search}
          onChange={(val) => setSearchParams({ search: val })}
        />
      </div>
      <TimelineListTable />
    </PageContainer>
  )
}

export default TimelineManagementPage
