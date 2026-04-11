import { Save, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FormHeaderProps {
  lastSaved: Date | null;
  onSaveDraft: () => void;
}

export function FormHeader({ lastSaved, onSaveDraft }: FormHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#DC4436] rounded flex items-center justify-center">
            <span className="text-white font-bold text-base">B</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 leading-tight">BUILD UMass</h2>
            <p className="text-xs text-slate-500 leading-tight">Client Intake Form</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span>
                Saved {formatDistanceToNow(lastSaved, { addSuffix: true })}
              </span>
            </div>
          )}
          
          <button
            onClick={onSaveDraft}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#DC4436] hover:bg-[#C03A2E] rounded-md transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save Draft
          </button>
        </div>
      </div>
    </header>
  );
}