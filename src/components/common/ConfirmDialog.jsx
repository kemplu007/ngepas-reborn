/*==================================================
 NGEPAS REBORN
 File    : ConfirmDialog.jsx
 Module  : Common Confirmation Wrapper
==================================================*/

import { AlertTriangle } from "lucide-react";

import Button from "../ui/Button";
import Dialog from "../ui/Dialog";

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
  return (
    <Dialog open={open} title={title} description={message} onClose={onCancel}>
      <div className="mb-[var(--np-space-6)] flex justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--np-color-danger-soft)] text-[var(--np-color-danger)]">
          <AlertTriangle size={24} aria-hidden="true" />
        </span>
      </div>

      <div className="flex flex-col-reverse gap-[var(--np-space-3)] sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} className="sm:min-w-28">
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm} className="sm:min-w-28">
          {confirmText}
        </Button>
      </div>
    </Dialog>
  );
}

/*==================================================
 EXPORT
==================================================*/

export default ConfirmDialog;
