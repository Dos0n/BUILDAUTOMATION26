import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  error?: string;
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  helpText,
  required = false,
  error,
}: FormSelectProps) {
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

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors appearance-none
            ${error 
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20" 
              : "border-slate-200 focus:border-slate-900 focus:ring-slate-900/10"
            }
            focus:outline-none focus:ring-4
            ${!value ? "text-slate-400" : "text-slate-900"}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
