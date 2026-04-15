import { useState, useEffect } from "react";
import { FormHeader } from "./FormHeader";
import { FormProgress } from "./FormProgress";
import { FormSection } from "./FormSection";
import { FormNavigation } from "./FormNavigation";
import { SuccessScreen } from "./SuccessScreen";
import { 
  Building2, 
  Target, 
  Palette, 
  FileText, 
  Settings, 
  AlertCircle 
} from "lucide-react";
import { submitIntake } from "../../lib/submitIntake";

const SECTIONS = [
  { id: 1, title: "Organization & Contact", icon: Building2 },
  { id: 2, title: "Project Goals", icon: Target },
  { id: 3, title: "Design & Branding", icon: Palette },
  { id: 4, title: "Content", icon: FileText },
  { id: 5, title: "Technical Details", icon: Settings },
  { id: 6, title: "Additional Information", icon: AlertCircle },
];

export function IntakeForm() {
  const [currentSection, setCurrentSection] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [referenceNo, setReferenceNo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    // Section 1
    organizationName: "",
    primaryContactName: "",
    primaryContactEmail: "",
    organizationType: "",
    
    // Section 2
    primaryGoal: "",
    organizationDescription: "",
    targetAudience: "",
    pages: [] as string[],
    features: [] as string[],
    additionalFeatureDetails: "",
    
    // Section 3
    hasLogo: "",
    logoFile: null as File | null,
    brandColors: "",
    brandFonts: "",
    visualStyle: "",
    referenceWebsites: ["", "", ""],
    brandAssets: [] as File[],
    
    // Section 4
    hasContent: "",
    existingContent: "",
    contentFiles: [] as File[],
    toneAndVoice: [] as string[],
    contentRestrictions: "",
    
    // Section 5
    hasDomain: "",
    domainName: "",
    integrations: [] as string[],
    integrationDetails: "",
    
    // Section 6
    additionalInfo: "",
  });

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSaved(new Date());
      console.log("Draft auto-saved");
    }, 60000);

    return () => clearInterval(interval);
  }, [formData]);

  const handleNext = () => {
    if (currentSection < SECTIONS.length) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const result = await submitIntake({
        project_name: formData.organizationName,
        client_name: formData.primaryContactName,
        client_email: formData.primaryContactEmail,
        budget: "",
        features: formData.features,
        team_size: "",
        start_date: "",
        notes: formData.additionalInfo,
      });
      setReferenceNo(result.reference_no);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setLastSaved(new Date());
    console.log("Draft saved manually");
  };

  if (isSubmitted) {
    return <SuccessScreen referenceNo={referenceNo} />;
  }

  return (
    <div className="min-h-screen pb-20">
      <FormHeader lastSaved={lastSaved} onSaveDraft={handleSaveDraft} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Website Builder Intake Form
          </h1>
          <p className="text-lg text-slate-600">
            Help us understand your project by filling out the form below. 
            All fields marked with * are required.
          </p>
        </div>

        <FormProgress 
          sections={SECTIONS} 
          currentSection={currentSection}
          onSectionClick={setCurrentSection}
        />

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 mt-8">
          <FormSection 
            section={currentSection}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        <FormNavigation
          currentSection={currentSection}
          totalSections={SECTIONS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />

        {submitError && (
          <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>
        )}
      </div>
    </div>
  );
}