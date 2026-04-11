import { HelpCircle } from "lucide-react";
import { useState } from "react";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  error?: string;
}

export function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  helpText,
  required = false,
  maxLength,
  minLength,
  error,
}: FormInputProps) {
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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors
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
