import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-bounce-in">
      <div
        className={`p-4 rounded-xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
          isSuccess
            ? 'bg-emerald-950/95 border-emerald-500/40 text-emerald-50'
            : 'bg-rose-950/95 border-rose-500/40 text-rose-50'
        }`}
      >
        <div className="flex-shrink-0 mt-0.5">
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-sm">
            {isSuccess ? 'Success' : 'Notice'}
          </p>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
            {toast.message}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
