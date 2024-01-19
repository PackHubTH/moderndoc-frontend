import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Tabs from '@/components/Tabs'
import { RiEyeCloseFill } from 'react-icons/ri'

const TestPage = () => {
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
      <Tabs
        tabs={[
          { title: 'Tab 1', content: <div>Tab 1</div> },
          { title: 'Tab 2', content: <div>Tab 2</div> },
          { title: 'Tab 3', content: <div>Tab 3</div> },
        ]}
      />
    </div>
  )
}

export default TestPage
