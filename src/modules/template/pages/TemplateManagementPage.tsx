import { FaFileSignature, FaPlus } from 'react-icons/fa6'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import PageContainer from '@/components/PageContainer'
import TextInput from '@/components/TextInput'
import { useDisclosure } from '@/hooks/useDisclosure'
import { Container } from '../components/Container'
import TemplateListTable from '../components/TemplateListTable'

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
      <Modal
        isOpen={isOpen}
        onClose={close}
        title="อัปโหลดเอกสารต้นฉบับ (Template)"
        actions={
          <div className="flex gap-4">
            <Button label="ยกเลิก" variant="outline-blue" onClick={close} />
            <Button label="อัปโหลด" onClick={close} />
          </div>
        }
        content={
          <div className="h-[254px]  bg-[#e2e8f0]">
            <div className="flex h-full flex-col items-center justify-center">
              <FaFileSignature size={60} color="blue" />
              <p className="mt-2 text-gray-500">
                Drop your files here or browse
              </p>
              <p>Maximum size: 50MB</p>
              <Container />
            </div>
          </div>
        }
      />
    </PageContainer>
  )
}

export default TemplateManagementPage
