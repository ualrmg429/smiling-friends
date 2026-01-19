import React from 'react'

interface MainButtonProps {
  label: string
  onClick?: () => void // función opcional que se ejecuta al hacer clic
}

export default function MainButton({ label, onClick }: MainButtonProps) {
  return (
    <button
      className="mt-8 inline-block bg-yellow-400 hover:bg-yellow-600 
        text-white px-6 py-3 rounded-full border-b-1"
      onClick={onClick} // asignamos la acción
    >
      {label}
    </button>
  )
}
