import React from 'react'
import type { IconType } from 'react-icons';

interface MainButtonProps {
  label?: string
  onClick?: () => void 
  disabled?: boolean
  Icon?: IconType;
  type?: 'button' | 'submit' | 'reset';
  additionalClasses?: string;
}

export default function MainButton({ label, onClick, disabled, Icon, type, additionalClasses }: MainButtonProps) {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={`inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 
      text-white px-6 py-3 rounded-full border-b-1 ${additionalClasses || ''}`}
      onClick={onClick}
    >
      {label}
      {Icon && <Icon size={32} />}
    </button>
  )
}
