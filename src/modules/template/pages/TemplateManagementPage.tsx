import Button from '@/components/Button'
import { FaPlus } from 'react-icons/fa6'
import PageContainer from '@/components/PageContainer'
import TemplateListTable from '../components/TemplateListTable'
import TextInput from '@/components/TextInput'
import UploadModal from '../components/UploadModal'
import { useDisclosure } from '@/hooks/useDisclosure'

const TemplateManagementPage: React.FC = () => {
  const { isOpen, open, close } = useDisclosure()

  return (
    <PageContainer className="space-y-8 p-7">
      <h1 className="text-2xl font-bold text-gray-600">รายการ Template</h1>
      <div className="flex items-center justify-between">
        <Button
          label="สร้าง Template"
          variant="green"
          leftIcon={<FaPlus size={18} />}
          onClick={open}
        />
        <TextInput className="w-[240px]" placeholder="ค้นหา..." />
      </div>
      <TemplateListTable />
      <UploadModal isOpen={isOpen} close={close} />
    </PageContainer>
  )
}

export default TemplateManagementPage
