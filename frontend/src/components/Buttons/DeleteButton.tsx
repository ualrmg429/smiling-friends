import type { IconType } from 'react-icons';

interface SecondaryButtonProps {
  label?: string
  onClick?: () => void 
  disabled?: boolean
  Icon?: IconType;
  type?: 'button' | 'submit' | 'reset';
  additionalClasses?: string;
}

export default function SecondaryButton({ label, onClick, disabled, Icon, type, additionalClasses }: SecondaryButtonProps) {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={`${additionalClasses || ''} cursor-pointer inline-flex items-center gap-2 bg-red-400 hover:bg-red-700 
      text-white px-6 py-3 rounded-full justify-center`}
      onClick={onClick}
    >
      {label}
      {Icon && <Icon size={20} />}
    </button>
  )
}
