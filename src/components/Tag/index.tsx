import tw from 'twin.macro'

type PropsType = {
  name: string
  onClick?: () => void
}

const Tag: React.FC<PropsType> = ({ name, onClick }) => {
  return (
    <div
      onClick={onClick}
      css={[
        tw`w-fit rounded-3xl border border-[#3888FF] bg-[#F0F7FF] px-2.5 py-0.5`,
        onClick && tw`cursor-pointer`,
      ]}
    >
      {name}
    </div>
  )
}

export default Tag
