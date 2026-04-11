import { FormInput } from "../FormInput";
import { FormSelect } from "../FormSelect";

interface Section1Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section1({ formData, updateField }: Section1Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Organization & Contact
        </h2>
        <p className="text-slate-600">
          Let's start with the basics. Tell us about your organization and how we can reach you.
        </p>
      </div>

      <FormInput
        label="Organization Name"
        name="organizationName"
        value={formData.organizationName}
        onChange={(value) => updateField("organizationName", value)}
        placeholder="e.g., BUILD UMass"
        helpText="Enter your organization's full legal or official name. This will appear on your website."
        required
        maxLength={100}
        minLength={2}
      />

      <FormInput
        label="Primary Contact Name"
        name="primaryContactName"
        value={formData.primaryContactName}
        onChange={(value) => updateField("primaryContactName", value)}
        placeholder="e.g., John Smith"
        helpText="The person BUILD will contact with questions and updates throughout the project."
        required
        maxLength={100}
        minLength={2}
      />

      <FormInput
        label="Primary Contact Email"
        name="primaryContactEmail"
        type="email"
        value={formData.primaryContactEmail}
        onChange={(value) => updateField("primaryContactEmail", value)}
        placeholder="e.g., john.smith@email.com"
        helpText="We'll send your confirmation, preview link, and final site link to this address."
        required
      />

      <FormSelect
        label="Organization Type"
        name="organizationType"
        value={formData.organizationType}
        onChange={(value) => updateField("organizationType", value)}
        options={[
          "Student Organization",
          "Campus Department",
          "Small Business",
          "Nonprofit",
          "Personal/Portfolio",
          "Other"
        ]}
        helpText="Select the option that best describes your organization. This helps us choose the right site structure."
        required
      />
    </div>
  );
}
