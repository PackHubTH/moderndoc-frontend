import React from 'react'

type PropsType = {
  children: React.ReactNode
  color?: string
  backgroundColor?: string
  onClick: () => void
}
const Button: React.FC<PropsType> = ({
  children,
  onClick,
  color = 'white',
  backgroundColor,
}) => {
  return (
    <button className="bg-red-500" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
