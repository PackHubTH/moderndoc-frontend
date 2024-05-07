import LoadingIcon from '@/assets/loading.svg'

const Loading: React.FC = () => {
  return (
    <div className="mt-6 grid h-full place-items-center">
      <img src={LoadingIcon} className="h-12 w-12" />
    </div>
  )
}

export default Loading
