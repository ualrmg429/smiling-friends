// components/LogoutConfirmModal.tsx
interface LogoutConfirmModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function LogoutConfirmModal({ isOpen, onConfirm, onCancel }: LogoutConfirmModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                onClick={onCancel}
            />
            <div className="relative bg-slate-900 border border-slate-700 rounded-lg p-6 w-full max-w-sm mx-4 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-2">
                    Log Out
                </h2>
                <p className="text-gray-400 mb-6">
                    Are you sure you want to log out?
                </p>
                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded-lg bg-slate-700 text-gray-200 hover:bg-slate-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
}