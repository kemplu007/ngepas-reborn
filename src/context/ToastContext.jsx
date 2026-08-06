/*==================================================
 NGEPAS REBORN
 File    : ToastContext.jsx
 Module  : Toast Notification Context
==================================================*/
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

/*==================================================
 CONTEXT
==================================================*/
const ToastContext = createContext(null);

/*==================================================
 TOAST ITEM
==================================================*/
function ToastItem({ toast, onClose }) {
  const icons = {
    success: <CheckCircle size={18} className="text-emerald-600 shrink-0" />,
    error: <AlertCircle size={18} className="text-red-600 shrink-0" />,
    info: <Info size={18} className="text-sky-600 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 bg-emerald-50",
    error: "border-red-200 bg-red-50",
    info: "border-sky-200 bg-sky-50",
  };

  return (
    <div
      className={`
        flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg
        transition-all duration-300 animate-in slide-in-from-right
        ${borders[toast.type] || borders.info}
      `}
    >
      {icons[toast.type] || icons.info}
      <p className="flex-1 text-sm font-medium text-slate-700">
        {toast.message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="shrink-0 text-slate-400 transition hover:text-slate-600"
      >
        <X size={16} />
      </button>
    </div>
  );
}

/*==================================================
 PROVIDER
==================================================*/
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (message, type = "success") => addToast(message, type),
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ toast, toasts }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/*==================================================
 HOOK
==================================================*/
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast wajib dipakai di dalam ToastProvider");
  return ctx;
};
