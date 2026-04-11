import { HelpCircle, Upload, X, FileIcon } from "lucide-react";
import { useState, useRef } from "react";

interface FormFileUploadProps {
  label: string;
  name: string;
  value: File | File[] | null;
  onChange: (value: File | File[] | null) => void;
  accept?: string;
  helpText?: string;
  required?: boolean;
  multiple?: boolean;
  maxSize?: number; // in MB
  error?: string;
}

export function FormFileUpload({
  label,
  name,
  value,
  onChange,
  accept,
  helpText,
  required = false,
  multiple = false,
  maxSize,
  error,
}: FormFileUploadProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const files = multiple 
    ? (Array.isArray(value) ? value : []) 
    : (value && !Array.isArray(value) ? [value] : []);

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    
    const fileArray = Array.from(selectedFiles);
    
    if (multiple) {
      onChange([...files, ...fileArray]);
    } else {
      onChange(fileArray[0] || null);
    }
  };

  const removeFile = (index: number) => {
    if (multiple) {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-slate-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {helpText && (
          <button
            type="button"
            onMouseEnter={() => setShowHelp(true)}
            onMouseLeave={() => setShowHelp(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        )}
      </div>

      {showHelp && helpText && (
        <p className="text-sm text-slate-600 mb-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
          {helpText}
        </p>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${dragActive 
            ? "border-slate-900 bg-slate-50" 
            : error
            ? "border-red-300 hover:border-red-400"
            : "border-slate-200 hover:border-slate-300"
          }
        `}
        onClick={() => inputRef.current?.click()}
      >
        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm text-slate-900 mb-1 font-medium">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-slate-500">
          {accept || "Any file type"} {maxSize && `• Max ${maxSize}MB`}
        </p>
        
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          required={required}
          onChange={(e) => handleFileChange(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <FileIcon className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="text-slate-400 hover:text-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
