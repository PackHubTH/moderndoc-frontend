import Button from '@/components/Button'
import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import { FaPlus } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

// import TemplateInfoBox from '../components/TemplateInfoBox'
// import TemplateListTable from '../components/TemplateListTable'
// import UploadModal from '../components/UploadModal'

const DocumentManagementPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการเอกสาร</h1>
      <div className="flex items-center justify-between">
        <Button
          label="สร้าง mock"
          variant="green"
          leftIcon={<FaPlus size={18} />}
          onClick={() => navigate('/edit-document')}
        />
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <div className="flex">
        {/* <TemplateListTable />
        <TemplateInfoBox /> */}
      </div>
      {/* <UploadModal isOpen={isOpen} close={close} /> */}
    </PageContainer>
  )
}

export default DocumentManagementPage
