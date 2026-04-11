import { FormSelect } from "../FormSelect";
import { FormInput } from "../FormInput";
import { FormMultiSelect } from "../FormMultiSelect";
import { FormTextarea } from "../FormTextarea";

interface Section5Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section5({ formData, updateField }: Section5Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Technical Details
        </h2>
        <p className="text-slate-600">
          Let us know about your domain and any integrations you need.
        </p>
      </div>

      <FormSelect
        label="Do you have a domain name?"
        name="hasDomain"
        value={formData.hasDomain}
        onChange={(value) => updateField("hasDomain", value)}
        options={[
          "Yes — I own one already",
          "No — I need one",
          "No — a Vercel subdomain is fine for now"
        ]}
        helpText="A domain is your website address (e.g. buildumass.com). If you don't have one, your site can launch on a free Vercel address (e.g. yourorg.vercel.app) and move to a custom domain later."
        required
      />

      {formData.hasDomain === "Yes — I own one already" && (
        <FormInput
          label="Domain Name"
          name="domainName"
          value={formData.domainName}
          onChange={(value) => updateField("domainName", value)}
          placeholder="e.g., buildumass.com"
          helpText="Enter your domain without 'https://' or 'www.' — just the domain itself"
          required
        />
      )}

      <FormMultiSelect
        label="Do you have any third-party tools that need to connect to the site?"
        name="integrations"
        value={formData.integrations}
        onChange={(value) => updateField("integrations", value)}
        options={[
          "Google Analytics",
          "Mailchimp",
          "HubSpot",
          "Stripe",
          "PayPal",
          "Calendly",
          "Instagram feed",
          "Facebook page",
          "LinkedIn",
          "Other"
        ]}
        helpText="Select any tools you currently use that should be integrated into your site."
      />

      {formData.integrations.length > 0 && (
        <FormTextarea
          label="Integration Details"
          name="integrationDetails"
          value={formData.integrationDetails}
          onChange={(value) => updateField("integrationDetails", value)}
          placeholder="Provide any relevant account IDs or embed codes..."
          helpText="If you selected integrations above, paste any relevant account IDs or embed codes. If you're unsure, leave blank and BUILD will follow up."
          maxLength={500}
          rows={4}
        />
      )}
    </div>
  );
}
