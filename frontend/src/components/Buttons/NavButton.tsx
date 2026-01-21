interface NavButtonProps {
  label: string
  onClick?: () => void 
}

export default function NavButton({ label, onClick }: NavButtonProps) {
  return (
    <button
      className="px-4 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600"
      onClick={onClick} 
    >
      {label}
    </button>
  )
}
