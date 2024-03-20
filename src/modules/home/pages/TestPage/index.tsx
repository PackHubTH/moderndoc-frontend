import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Modal from '@/components/Modal'
import RadioGroup from '@/components/RadioGroup'
import Select from '@/components/Select'
import Tabs from '@/components/Tabs'
import Tag from '@/components/Tag'
import { useDisclosure } from '@/hooks/useDisclosure'
import { RiEyeCloseFill } from 'react-icons/ri'

const TestPage = () => {
  const { isOpen, open, close, toggle } = useDisclosure(true)

  return (
    <div>
      <Button
        label="test"
        width="100px"
        leftIcon={<RiEyeCloseFill />}
        variant="outline-blue"
      />
      <Badge label="doggy" variant="error" />
      <Dropdown
        label="Alan"
        dropdownSection={[
          {
            title: 'Title',
            lists: [
              {
                displayText: 'Display Text',
                onClick: () => console.log('clicked'),
              },
              {
                displayText: 'Display Text2',
                onClick: () => console.log('clicked'),
              },
              {
                displayText: 'Display Text3',
                onClick: () => console.log('clicked'),
              },
            ],
          },
          {
            lists: [
              {
                displayText: 'Display Text',
                onClick: () => console.log('clicked'),
              },
              {
                displayText: 'Display Text2',
                onClick: () => console.log('clicked'),
              },
              {
                displayText: 'Display Text3',
                onClick: () => console.log('clicked'),
              },
            ],
          },
        ]}
      />
      <Tag name="Tag" />
      <Tabs
        tabs={[
          { title: 'Tab 1', content: <div>Tab 1</div> },
          { title: 'Tab 2', content: <div>Tab 2</div> },
          { title: 'Tab 3', content: <div>Tab 3</div> },
        ]}
      />
      <Button label="testModal" onClick={open} />
      <Modal
        content={'Lorem ipsum'}
        title="Title"
        isOpen={isOpen}
        onClose={close}
        actions={
          <>
            <Button label="Button1" onClick={close} />
            <Button label="Button2" onClick={close} />
          </>
        }
      />
      <Select
        label="test"
        options={[{ value: '0', label: 'เอกสารดำเนินการเสร็จแล้ว' }]}
      />
      <RadioGroup
        label=""
        options={[
          { value: '0', label: 'เอกสารดำเนินการเสร็จแล้ว' },
          { value: '1', label: 'ยกเลิกเอกสาร' },
        ]}
      />
    </div>
  )
}

export default TestPage
