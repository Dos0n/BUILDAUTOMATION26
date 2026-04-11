import { Check, LucideIcon } from "lucide-react";

interface Section {
  id: number;
  title: string;
  icon: LucideIcon;
}

interface FormProgressProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (sectionId: number) => void;
}

export function FormProgress({ sections, currentSection, onSectionClick }: FormProgressProps) {
  return (
    <div className="relative">
      {/* Progress bar background */}
      <div className="absolute top-6 left-0 right-0 h-0.5 bg-slate-200" />
      
      {/* Progress bar fill */}
      <div 
        className="absolute top-6 left-0 h-0.5 bg-[#DC4436] transition-all duration-500"
        style={{ width: `${((currentSection - 1) / (sections.length - 1)) * 100}%` }}
      />

      {/* Section dots */}
      <div className="relative flex justify-between">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isCompleted = currentSection > section.id;
          const isCurrent = currentSection === section.id;
          
          return (
            <div
              key={section.id}
              className="flex flex-col items-center"
              style={{ width: `${100 / sections.length}%` }}
            >
              <button
                onClick={() => onSectionClick(section.id)}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center
                  transition-all duration-300 mb-2
                  ${isCompleted 
                    ? "bg-[#DC4436] text-white" 
                    : isCurrent 
                    ? "bg-[#DC4436] text-white ring-4 ring-[#DC4436]/10" 
                    : "bg-white border-2 border-slate-200 text-slate-400"
                  }
                  ${!isCompleted && !isCurrent ? "hover:border-slate-300" : ""}
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </button>
              
              <span className={`
                text-xs text-center font-semibold hidden sm:block
                ${isCurrent ? "text-slate-900" : "text-slate-500"}
              `}>
                {section.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}