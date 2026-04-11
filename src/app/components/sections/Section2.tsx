import { FormSelect } from "../FormSelect";
import { FormTextarea } from "../FormTextarea";
import { FormMultiSelect } from "../FormMultiSelect";

interface Section2Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section2({ formData, updateField }: Section2Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Project Goals
        </h2>
        <p className="text-slate-600">
          Help us understand what you want to achieve with your website and who it's for.
        </p>
      </div>

      <FormSelect
        label="What is the primary goal of your website?"
        name="primaryGoal"
        value={formData.primaryGoal}
        onChange={(value) => updateField("primaryGoal", value)}
        options={[
          "Attract new members",
          "Sell products or services",
          "Share information or resources",
          "Accept donations",
          "Build a professional presence",
          "Promote events",
          "Other"
        ]}
        helpText="Choose the single most important thing your website should accomplish."
        required
      />

      <FormTextarea
        label="Describe your organization and what you do"
        name="organizationDescription"
        value={formData.organizationDescription}
        onChange={(value) => updateField("organizationDescription", value)}
        placeholder="Tell us about your organization..."
        helpText="Input 2–5 sentences as if explaining to someone who has never heard of you. This will be used to generate your site's core content."
        example="BUILD UMass is a student-run organization that is committed to providing nonprofits, startups, and local businesses with scalable technology solutions through pro-bono software development and consulting. We provide services such as software development, web development, and tech consulting."
        required
        maxLength={1000}
        minLength={50}
        rows={5}
      />

      <FormTextarea
        label="Who is your target audience?"
        name="targetAudience"
        value={formData.targetAudience}
        onChange={(value) => updateField("targetAudience", value)}
        placeholder="Describe your ideal visitor..."
        helpText="Describe the people you want visiting your site. Include age range, background, or any other relevant details."
        example="UMass students looking to join BUILD, along with any nonprofits, startups, or local businesses that may be interested in BUILD's services."
        required
        maxLength={500}
        minLength={30}
        rows={4}
      />

      <FormMultiSelect
        label="What pages do you need on your site?"
        name="pages"
        value={formData.pages}
        onChange={(value) => updateField("pages", value)}
        options={[
          "Home",
          "About",
          "Team",
          "Services",
          "Events",
          "Blog",
          "Contact",
          "Gallery",
          "Donate",
          "Join/Apply",
          "FAQ",
          "Other"
        ]}
        helpText="Select all pages you want included. If you're unsure, Home, About, and Contact are a standard starting point."
        required
      />

      <FormMultiSelect
        label="Are there any specific features you need?"
        name="features"
        value={formData.features}
        onChange={(value) => updateField("features", value)}
        options={[
          "Contact form",
          "Event calendar",
          "Photo gallery",
          "Newsletter signup",
          "Social media feed",
          "Member application form",
          "Donation button",
          "Password-protected page",
          "Other"
        ]}
        helpText="Select any features your site needs beyond standard pages."
      />

      {(formData.features.includes("Other") || formData.features.length > 0) && (
        <FormTextarea
          label="Additional feature details or requests"
          name="additionalFeatureDetails"
          value={formData.additionalFeatureDetails}
          onChange={(value) => updateField("additionalFeatureDetails", value)}
          placeholder="Describe any additional features..."
          helpText="If you selected 'Other' above, or want to describe a feature in more detail, use this field."
          maxLength={500}
          rows={3}
        />
      )}
    </div>
  );
}
