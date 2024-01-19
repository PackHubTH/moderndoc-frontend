import React from 'react'
import tw from 'twin.macro'
import colors from 'tailwindcss/colors'

type VariantType = 'blue' | 'yellow' | 'red' | 'green' | 'gray' | 'outline-blue'
type ButtonColor = {
  color: string
  bgColor: string
  hoverColor?: string
  hoverBgColor?: string
}

type PropsType = {
  label: string
  onClick?: () => void
  color?: string
  backgroundColor?: string
  leftIcon?: React.ReactNode
  disabled?: boolean
  width?: string
  height?: string
  variant?: VariantType
}
const Button: React.FC<PropsType> = ({
  label,
  onClick,
  color,
  backgroundColor,
  leftIcon,
  disabled = false,
  variant: colorVariant = 'blue',
}) => {
  const BUTTON_VARIANTS: Record<VariantType, ButtonColor> = {
    blue: {
      color: colors.white,
      bgColor: colors.blue[500],
      hoverBgColor: colors.blue[600],
    },
    'outline-blue': {
      color: colors.blue[500],
      bgColor: colors.white,
      hoverColor: colors.white,
      hoverBgColor: colors.blue[600],
    },
    yellow: {
      color: colors.white,
      bgColor: colors.amber[500],
      hoverBgColor: colors.amber[600],
    },
    red: {
      color: colors.white,
      bgColor: colors.red[500],
      hoverBgColor: colors.red[600],
    },
    green: {
      color: colors.white,
      bgColor: colors.green[500],
      hoverBgColor: colors.green[600],
    },
    gray: {
      color: colors.white,
      bgColor: colors.gray[500],
      hoverBgColor: colors.gray[600],
    },
  }

  return (
    <button
      type="button"
      css={[
        tw`inline-flex items-center gap-x-2 rounded-2xl border border-transparent py-2 px-6 text-center font-semibold text-sm disabled:(pointer-events-none opacity-50)`,
        {
          backgroundColor:
            backgroundColor ?? BUTTON_VARIANTS[colorVariant].bgColor,
          color: color ?? BUTTON_VARIANTS[colorVariant].color,
          '&:hover': {
            backgroundColor:
              BUTTON_VARIANTS[colorVariant].hoverBgColor ??
              BUTTON_VARIANTS[colorVariant].bgColor,
            color:
              BUTTON_VARIANTS[colorVariant].hoverColor ??
              BUTTON_VARIANTS[colorVariant].color,
          },
        },
      ]}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIcon}
      {label}
    </button>
  )
}

export default Button
