import { FormSelect } from "../FormSelect";
import { FormTextarea } from "../FormTextarea";
import { FormFileUpload } from "../FormFileUpload";
import { FormMultiSelect } from "../FormMultiSelect";

interface Section4Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section4({ formData, updateField }: Section4Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Content
        </h2>
        <p className="text-slate-600">
          Tell us about your existing content and how you want your website to sound.
        </p>
      </div>

      <FormSelect
        label="Do you have existing written content for your site?"
        name="hasContent"
        value={formData.hasContent}
        onChange={(value) => updateField("hasContent", value)}
        options={[
          "Yes — I will upload or paste it",
          "Partially — I have some but not all",
          "No — please generate it from my description"
        ]}
        helpText="Existing content can be anything written about your organization."
        required
      />

      {(formData.hasContent === "Yes — I will upload or paste it" || 
        formData.hasContent === "Partially — I have some but not all") && (
        <>
          <FormTextarea
            label="Paste any existing content here"
            name="existingContent"
            value={formData.existingContent}
            onChange={(value) => updateField("existingContent", value)}
            placeholder="Paste your content here..."
            helpText="Paste any text you want used or referenced on the site. This can be rough — it will be edited and formatted."
            maxLength={5000}
            rows={8}
            required={formData.hasContent === "Yes — I will upload or paste it"}
          />

          <FormFileUpload
            label="Content Files"
            name="contentFiles"
            value={formData.contentFiles}
            onChange={(value) => updateField("contentFiles", value)}
            accept=".pdf,.docx,.txt"
            helpText="If your content is in documents, upload them here. We'll extract and use what's relevant."
            maxSize={10}
            multiple
          />
        </>
      )}

      <FormMultiSelect
        label="Tone and Voice"
        name="toneAndVoice"
        value={formData.toneAndVoice}
        onChange={(value) => updateField("toneAndVoice", value)}
        options={[
          "Professional",
          "Friendly",
          "Casual",
          "Inspiring",
          "Authoritative",
          "Playful",
          "Minimalist"
        ]}
        helpText="Select up to 3 words that describe how you want your site to sound."
        required
        maxSelections={3}
      />

      <FormTextarea
        label="Is there anything the site should never say or do?"
        name="contentRestrictions"
        value={formData.contentRestrictions}
        onChange={(value) => updateField("contentRestrictions", value)}
        placeholder="Any topics or phrases to avoid..."
        helpText="Any topics, phrases, claims, or approaches that should be avoided. For example: 'Do not mention founding year' or 'Avoid competitive language.'"
        maxLength={500}
        rows={3}
      />
    </div>
  );
}
