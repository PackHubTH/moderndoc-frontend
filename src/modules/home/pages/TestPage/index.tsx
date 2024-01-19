import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
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
    </div>
  )
}

export default TestPage
