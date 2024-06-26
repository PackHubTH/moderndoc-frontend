import { ReactNode } from 'react'

type PropsType = {
  status: string
  icon?: ReactNode
}

const TimelineStatusBox = ({ icon, status }: PropsType) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <h1 className="font-semibold">{status}</h1>
    </div>
  )
}

export default TimelineStatusBox
