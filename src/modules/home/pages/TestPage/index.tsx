import Button from '@/components/Button'
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
    </div>
  )
}

export default TestPage
