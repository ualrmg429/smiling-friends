import React from 'react'

interface NavButtonProps {
  label: string
  onClick?: () => void // función opcional que se ejecuta al hacer clic
}

export const NavButton: React.FC<NavButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="px-5 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
      onClick={onClick} // asignamos la acción
    >
      {label}
    </button>
  )
}
