import { HelpCircle, Check } from "lucide-react";
import { useState } from "react";

interface FormMultiSelectProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  helpText?: string;
  required?: boolean;
  maxSelections?: number;
  error?: string;
}

export function FormMultiSelect({
  label,
  name,
  value,
  onChange,
  options,
  helpText,
  required = false,
  maxSelections,
  error,
}: FormMultiSelectProps) {
  const [showHelp, setShowHelp] = useState(false);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return;
      }
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-slate-900">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = value.includes(option);
          const isDisabled = maxSelections && value.length >= maxSelections && !isSelected;
          
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              disabled={isDisabled}
              className={`
                px-4 py-3 rounded-lg border-2 text-left transition-all
                flex items-center justify-between
                ${isSelected
                  ? "border-slate-900 bg-slate-50"
                  : isDisabled
                  ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                  : "border-slate-200 hover:border-slate-300"
                }
              `}
            >
              <span className={`text-sm ${isSelected ? "font-medium text-slate-900" : "text-slate-700"}`}>
                {option}
              </span>
              {isSelected && (
                <Check className="w-5 h-5 text-slate-900" />
              )}
            </button>
          );
        })}
      </div>

      {(maxSelections || error) && (
        <div className="flex items-center justify-between mt-2">
          {error && <p className="text-sm text-red-600">{error}</p>}
          {maxSelections && (
            <p className="text-sm text-slate-500 ml-auto">
              {value.length} / {maxSelections} selected
            </p>
          )}
        </div>
      )}
    </div>
  );
}
