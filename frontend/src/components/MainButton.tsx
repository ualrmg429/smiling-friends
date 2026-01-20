import React from 'react'
import type { IconType } from 'react-icons';

interface MainButtonProps {
  label?: string
  onClick?: () => void // función opcional que se ejecuta al hacer clic
  Icon?: IconType;
}

export default function MainButton({ label, onClick, Icon }: MainButtonProps) {
  return (
    <button
      className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-600 
      text-white px-6 py-3 rounded-full border-b-1"
      onClick={onClick}
    >
      {label}
      {Icon && <Icon size={32} />}
    </button>
  )
}
