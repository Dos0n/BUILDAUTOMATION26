import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface FormNavigationProps {
  currentSection: number;
  totalSections: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function FormNavigation({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSubmit,
}: FormNavigationProps) {
  const isFirstSection = currentSection === 1;
  const isLastSection = currentSection === totalSections;

  return (
    <div className="mt-8 flex items-center justify-between">
      <button
        onClick={onPrevious}
        disabled={isFirstSection}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-md font-semibold transition-colors
          ${isFirstSection
            ? "text-slate-400 cursor-not-allowed"
            : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>

      <div className="text-sm text-slate-600 font-medium">
        Section {currentSection} of {totalSections}
      </div>

      {isLastSection ? (
        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-[#DC4436] text-white rounded-md font-semibold hover:bg-[#C03A2E] transition-colors"
        >
          Submit Form
          <Send className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-[#DC4436] text-white rounded-md font-semibold hover:bg-[#C03A2E] transition-colors"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}