import { FormTextarea } from "../FormTextarea";

interface Section6Props {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export function Section6({ formData, updateField }: Section6Props) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">
          Additional Information
        </h2>
        <p className="text-slate-600">
          Any final thoughts, requirements, or context we should know about?
        </p>
      </div>

      <FormTextarea
        label="Is there anything else we should know?"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={(value) => updateField("additionalInfo", value)}
        placeholder="Share any additional context, constraints, or requests..."
        helpText="Any additional context, constraints, or requests that didn't fit elsewhere."
        maxLength={1000}
        rows={6}
      />

      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          What happens next?
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>You'll receive a confirmation email with your job ID and submission summary</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Our system will begin building your website automatically</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>We'll send you a preview link for review before anything goes live</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">4.</span>
            <span>Once approved, your site will be deployed to your chosen domain</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
