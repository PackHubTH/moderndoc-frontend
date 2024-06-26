import { BadgeType, VariantType } from './types'

import React from 'react'
import colors from 'tailwindcss/colors'
import tw from 'twin.macro'

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
    processing: {
      color: colors.white,
      bgColor: colors.amber[500],
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
        tw`inline-flex items-center gap-x-1.5 rounded-full px-3 py-1 text-xs font-medium`,
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
