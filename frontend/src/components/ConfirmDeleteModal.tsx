import { MdDeleteForever, MdCancel } from 'react-icons/md';
import SecondaryButton from './Buttons/SecondaryButton';
import DeleteButton from './Buttons/DeleteButton';

interface Props {
  characterName: string;
  isOpen: boolean;
  isDeleting?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  characterName,
  isOpen,
  isDeleting = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 rounded-lg border border-slate-800 shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header gradient accent */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500" />

        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <MdDeleteForever className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Title */}
          <h2 className="font-heading text-2xl text-white text-center mb-2">
            Delete Character
          </h2>

          {/* Message */}
          <p className="text-gray-400 text-center mb-6">
            Are you sure you want to delete{' '}
            <span className="text-green-400 font-semibold">{characterName}</span>?
            <br />
            <span className="text-sm text-gray-500">This action cannot be undone.</span>
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <SecondaryButton
              label="Cancel"
              Icon={MdCancel}
              additionalClasses="min-w-32"
              onClick={onCancel}
              disabled={isDeleting}
            />
            <DeleteButton
              label={isDeleting ? 'Deleting...' : 'Delete'}
              Icon={MdDeleteForever}
              additionalClasses="min-w-32"
              onClick={onConfirm}
              disabled={isDeleting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}