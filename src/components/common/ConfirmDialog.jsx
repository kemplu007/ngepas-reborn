/*==================================================
 NGEPAS REBORN
 File    : ConfirmDialog.jsx
 Module  : Confirmation Dialog Component
==================================================*/
import { AlertTriangle } from "lucide-react";

/*==================================================
 COMPONENT
==================================================*/
function ConfirmDialog({
  open = false,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  confirmText = "Ya, Hapus",
  cancelText = "Batal",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle size={24} className="text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-center text-lg font-bold text-slate-900">
          {title}
        </h3>

        {/* Message */}
        <p className="mt-2 text-center text-sm text-slate-500">{message}</p>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
