import { FormSelect } from "../FormSelect";
import { FormInput } from "../FormInput";
import { FormTextarea } from "../FormTextarea";
import { FormFileUpload } from "../FormFileUpload";
import { Plus, X } from "lucide-react";

interface Section3Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section3({ formData, updateField }: Section3Props) {
  const addReferenceWebsite = () => {
    const websites = [...formData.referenceWebsites];
    if (websites.length < 3) {
      websites.push("");
      updateField("referenceWebsites", websites);
    }
  };

  const removeReferenceWebsite = (index: number) => {
    const websites = formData.referenceWebsites.filter((_: string, i: number) => i !== index);
    updateField("referenceWebsites", websites);
  };

  const updateReferenceWebsite = (index: number, value: string) => {
    const websites = [...formData.referenceWebsites];
    websites[index] = value;
    updateField("referenceWebsites", websites);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Design & Branding
        </h2>
        <p className="text-slate-600">
          Share your visual identity to help us create a site that matches your brand.
        </p>
      </div>

      <FormSelect
        label="Do you have an existing logo?"
        name="hasLogo"
        value={formData.hasLogo}
        onChange={(value) => updateField("hasLogo", value)}
        options={[
          "Yes — I will upload it",
          "No — please create a simple text-based logo",
          "No — I will provide one later"
        ]}
        helpText="If you select 'provide one later,' your site will be built with a placeholder and you will need to resubmit assets before final deployment."
        required
      />

      {formData.hasLogo === "Yes — I will upload it" && (
        <FormFileUpload
          label="Logo File"
          name="logoFile"
          value={formData.logoFile}
          onChange={(value) => updateField("logoFile", value)}
          accept=".png,.svg,.jpg,.jpeg"
          helpText="Upload your logo in the highest resolution available. SVG or PNG with a transparent background is preferred."
          maxSize={10}
          required
        />
      )}

      <FormInput
        label="Brand Colors"
        name="brandColors"
        value={formData.brandColors}
        onChange={(value) => updateField("brandColors", value)}
        placeholder="e.g., #1A3C6E, #C9A84C, white"
        helpText="List your primary and secondary brand colors if you have them. Hex codes are ideal (e.g. #1A3C6E), but plain descriptions work too (e.g. 'dark navy and warm gold')."
        maxLength={200}
      />

      <FormInput
        label="Brand Fonts"
        name="brandFonts"
        value={formData.brandFonts}
        onChange={(value) => updateField("brandFonts", value)}
        placeholder="e.g., Inter, Roboto"
        helpText="List any specific fonts your organization uses, if known. If left blank, the design system will select appropriate fonts automatically."
        maxLength={200}
      />

      <FormTextarea
        label="Describe the visual style you want"
        name="visualStyle"
        value={formData.visualStyle}
        onChange={(value) => updateField("visualStyle", value)}
        placeholder="Describe your desired look and feel..."
        helpText="Describe the look and feel you're going for in plain language. Don't worry about technical terms."
        example="Clean and professional with a modern feel. We want it to look credible and established."
        required
        maxLength={500}
        minLength={30}
        rows={4}
      />

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-slate-900">
            Reference Websites You Like
          </label>
        </div>
        <p className="text-sm text-slate-600 mb-3">
          Paste links to 1–3 websites whose design you admire. These don't need to be similar organizations — we're looking for visual inspiration.
        </p>
        
        <div className="space-y-3">
          {formData.referenceWebsites.map((website: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                value={website}
                onChange={(e) => updateReferenceWebsite(index, e.target.value)}
                placeholder="https://example.com"
                className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 focus:outline-none"
              />
              {formData.referenceWebsites.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeReferenceWebsite(index)}
                  className="px-3 py-3 text-slate-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        {formData.referenceWebsites.length < 3 && (
          <button
            type="button"
            onClick={addReferenceWebsite}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add another website
          </button>
        )}
      </div>

      <FormFileUpload
        label="Additional Brand Assets"
        name="brandAssets"
        value={formData.brandAssets}
        onChange={(value) => updateField("brandAssets", value)}
        accept=".png,.jpg,.jpeg,.svg,.pdf"
        helpText="Upload any other brand assets — photos, icons, pattern files, brand guidelines documents. These will be used to inform the site design."
        maxSize={20}
        multiple
      />
    </div>
  );
}
