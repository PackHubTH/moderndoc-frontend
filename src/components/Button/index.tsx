import { ReactNode } from 'react'
import colors from 'tailwindcss/colors'
import tw from 'twin.macro'
import { ButtonStyle, VariantType } from './types'

type PropsType = {
  label: string
  onClick?: () => void
  color?: string
  backgroundColor?: string
  leftIcon?: ReactNode
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
  const BUTTON_STYLES: Record<VariantType, ButtonStyle> = {
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
            backgroundColor ?? BUTTON_STYLES[colorVariant].bgColor,
          color: color ?? BUTTON_STYLES[colorVariant].color,
          '&:hover': {
            backgroundColor:
              BUTTON_STYLES[colorVariant].hoverBgColor ??
              BUTTON_STYLES[colorVariant].bgColor,
            color:
              BUTTON_STYLES[colorVariant].hoverColor ??
              BUTTON_STYLES[colorVariant].color,
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
