import { CheckCircle2, Mail, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

export function SuccessScreen() {
  const [copied, setCopied] = useState(false);
  const jobId = "BUILD-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const copyJobId = () => {
    navigator.clipboard.writeText(jobId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            Submission Received!
          </h1>
          <p className="text-lg text-slate-600">
            Thank you for submitting your website request. We're excited to build your site!
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-8 mb-6">
          <div className="mb-6">
            <label className="text-sm font-semibold text-slate-700 mb-2 block">
              Your Job ID
            </label>
            <div className="flex items-center gap-2">
              <code className="flex-1 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-slate-900">
                {jobId}
              </code>
              <button
                onClick={copyJobId}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                title="Copy Job ID"
              >
                {copied ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Save this ID for your records. You'll need it to reference your project.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h3 className="font-bold text-slate-900 mb-4">What happens next?</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DC4436] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Confirmation Email</h4>
                  <p className="text-sm text-slate-600">
                    You'll receive an email within 60 seconds with your submission summary and next steps.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DC4436] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Website Generation</h4>
                  <p className="text-sm text-slate-600">
                    Our automated system will begin building your website based on your specifications.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DC4436] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Preview & Review</h4>
                  <p className="text-sm text-slate-600">
                    We'll send you a preview link to review your site before it goes live. You'll have a chance to request changes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-[#DC4436] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Final Deployment</h4>
                  <p className="text-sm text-slate-600">
                    Once approved, your website will be deployed to your chosen domain and go live.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6">
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Check Your Email</h4>
              <p className="text-sm text-blue-800">
                We've sent a confirmation to the email address you provided. If you don't see it within a few minutes, check your spam folder.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-sm text-slate-600">
            Questions? Contact us at{" "}
            <a href="mailto:contact@buildumass.com" className="text-[#DC4436] font-semibold hover:underline">
              contact@buildumass.com
            </a>
          </p>
          
          <a
            href="https://buildumass.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#DC4436] transition-colors"
          >
            Visit BUILD UMass Website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}