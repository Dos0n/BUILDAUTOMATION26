import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  example?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  rows?: number;
  error?: string;
}

export function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  helpText,
  example,
  required = false,
  maxLength,
  minLength,
  rows = 4,
  error,
}: FormTextareaProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {helpText && (
          <button
            type="button"
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {showHelp && helpText && (
        <p className="text-sm text-slate-600 mb-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          {helpText}
        </p>
      )}

      {example && (
        <div className="mb-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-900 mb-1">Example:</p>
          <p className="text-sm text-blue-800">{example}</p>
        </div>
      )}

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        rows={rows}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors resize-none
          ${error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
            : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
          }
          focus:outline-none focus:ring-4
        `}
      />

      {(maxLength || error) && (
        <div className="flex items-center justify-between mt-2">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {maxLength && (
            <p className="text-sm text-slate-500 ml-auto">
              {value.length} / {maxLength}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
