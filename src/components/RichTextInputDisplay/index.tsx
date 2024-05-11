import 'react-quill/dist/quill.snow.css'
import { styled } from 'twin.macro'

type PropsType = {
  value: string
  color?: string
}

const RichText = styled.div`
  font-size: 1rem;
  color: ${(props) => props.color};

  ol {
    list-style-type: decimal;
    padding-left: 2rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 2rem;
  }
`
const RichTextInputDisplay: React.FC<PropsType> = ({
  value,
  color = '#333',
}) => {
  return <RichText dangerouslySetInnerHTML={{ __html: value }} color={color} />
}

export default RichTextInputDisplay
