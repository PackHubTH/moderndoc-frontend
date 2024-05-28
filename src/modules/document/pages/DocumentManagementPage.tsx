import PageContainer from '@/components/PageContainer'
import Tabs from '@/components/Tabs'
import DocumentListTable from '../components/DocumentListTable'

const DocumentManagementPage: React.FC = () => {
  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการเอกสาร</h1>
      <Tabs
        onSearch={(val) => console.log(val)}
        tabs={[
          {
            content: <DocumentListTable type="ASSIGNED_TO_ME" />,
            title: 'งานของฉัน',
          },
          {
            content: <DocumentListTable type="PROCESSING" />,
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
