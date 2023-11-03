import tw from 'twin.macro'

type PropsType = {
  label: string
  variant?: 'primary' | 'secondary'
  onClick: () => void
}

const buttonVariant = {
  primary: tw`bg-red-500 hover:bg-red-700`,
}

const LoginButton = ({ label, variant, onClick }: PropsType) => {
  return (
    <button onClick={onClick} css={buttonVariant['primary']}>
      {label}
    </button>
  )
}

export default LoginButton
