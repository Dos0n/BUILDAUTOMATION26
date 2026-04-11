import { Section1 } from "./sections/Section1";
import { Section2 } from "./sections/Section2";
import { Section3 } from "./sections/Section3";
import { Section4 } from "./sections/Section4";
import { Section5 } from "./sections/Section5";
import { Section6 } from "./sections/Section6";

interface FormSectionProps {
  section: number;
  formData: any;
  setFormData: (data: any) => void;
}

export function FormSection({ section, formData, setFormData }: FormSectionProps) {
  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const sections = {
    1: <Section1 formData={formData} updateField={updateField} />,
    2: <Section2 formData={formData} updateField={updateField} />,
    3: <Section3 formData={formData} updateField={updateField} />,
    4: <Section4 formData={formData} updateField={updateField} />,
    5: <Section5 formData={formData} updateField={updateField} />,
    6: <Section6 formData={formData} updateField={updateField} />,
  };

  return sections[section as keyof typeof sections] || null;
}
