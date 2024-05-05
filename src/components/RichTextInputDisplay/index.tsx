import 'react-quill/dist/quill.snow.css'
import { styled } from 'twin.macro'

type PropsType = {
  value: string
}

const RichText = styled.div`
  font-size: 1rem;
  color: #333;

  ol {
    list-style-type: decimal;
    padding-left: 2rem;
  }

  ul {
    list-style-type: disc;
    margin-left: 2rem;
  }
`

const RichTextInputDisplay: React.FC<PropsType> = ({ value }) => {
  return <RichText dangerouslySetInnerHTML={{ __html: value }} />
}

export default RichTextInputDisplay
