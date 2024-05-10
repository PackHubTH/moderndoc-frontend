import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import TextInput from '@/components/TextInput'
import { useNavigate } from 'react-router-dom'
import DocumentListTable from '../components/DocumentListTable'

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
            navigate('/create-document/7719fea9-efa1-4165-8f8a-6b90e16c5fe2')
          }}
        />
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <Tabs
        tabs={[
          {
            content: <DocumentListTable type="RECEIVED" />,
            title: 'งานของฉัน',
          },
          {
            content: <DocumentListTable type="SENT" />,
            title: 'กำลังดำเนินการ',
          },
          {
            content: <DocumentListTable type="COMPLETED" />,
            title: 'เสร็จสิ้นแล้ว',
          },
          {
            content: <DocumentListTable type="CANCELED" />,
            title: 'ยกเลิกแล้ว',
          },
          {
            content: <DocumentListTable type="DRAFT" />,
            title: 'ฉบับร่าง',
          },
          {
            content: <DocumentListTable type="ALL" />,
            title: 'เอกสารทั้งหมด',
          },
        ]}
      />
    </PageContainer>
  )
}

export default DocumentManagementPage
