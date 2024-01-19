import React from 'react'
import colors from 'tailwindcss/colors'
import tw from 'twin.macro'
import { BadgeType, VariantType } from './types'

type PropsType = {
  label: string
  variant: VariantType
  onClick?: () => void
}

const Badge: React.FC<PropsType> = ({ label, onClick, variant }) => {
  const BADGE_STYLES: Record<VariantType, BadgeType> = {
    action: {
      color: colors.amber[500],
      bgColor: colors.amber[100],
    },
    waiting: {
      color: colors.blue[500],
      bgColor: colors.blue[100],
    },
    success: {
      color: colors.green[500],
      bgColor: colors.green[100],
    },
    error: {
      color: colors.red[500],
      bgColor: colors.red[100],
    },
  }

  return (
    <span
      css={[
        tw`inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs font-medium`,
        {
          color: BADGE_STYLES[variant].color,
          backgroundColor: BADGE_STYLES[variant].bgColor,
        },
      ]}
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default Badge
