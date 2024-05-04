import Button from '@/components/Button'
import DocumentListTable from '../components/DocumentListTable'
import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import TextInput from '@/components/TextInput'
import { useNavigate } from 'react-router-dom'

// import TemplateInfoBox from '../components/TemplateInfoBox'
// import TemplateListTable from '../components/TemplateListTable'
// import UploadModal from '../components/UploadModal'

const DocumentManagementPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการเอกสาร</h1>
      <div className="flex items-center justify-end">
        <Button
          label="สร้าง mock"
          variant="green"
          onClick={() => {
            navigate('/create-document/f5fb00e4-7d45-43a8-9781-dbb72833c4a4')
          }}
        />
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <Tabs
        tabs={[
          {
            content: <DocumentListTable type="ALL" />,
            title: 'เอกสารทั้งหมด',
          },
          {
            content: <DocumentListTable type="SENT" />,
            title: 'เอกสารของฉัน',
          },
          {
            content: <DocumentListTable type="RECEIVED" />,
            title: 'เอกสารที่ได้รับ',
          },
        ]}
      />
    </PageContainer>
  )
}

export default DocumentManagementPage
