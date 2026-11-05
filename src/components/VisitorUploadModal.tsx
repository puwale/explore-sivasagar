import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, CheckCircle2, AlertCircle, Trash2, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import { submitVisitorPhoto, validateImageFile } from '../services/gallerySubmissionService';
import { EXISTING_DESTINATION_OPTIONS } from '../data/expandedGalleryData';
import { isSupabaseConfigured } from '../lib/supabase';

interface VisitorUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: () => void;
  defaultCollectionId?: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
}

interface StagedFile {
  file: File;
  previewUrl: string;
}

export const VisitorUploadModal: React.FC<VisitorUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
  defaultCollectionId,
}) => {
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]);
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>(
    defaultCollectionId
      ? EXISTING_DESTINATION_OPTIONS.find((d) => d.collectionId === defaultCollectionId)?.id || EXISTING_DESTINATION_OPTIONS[0].id
      : EXISTING_DESTINATION_OPTIONS[0].id
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [hasLicenseConfirmation, setHasLicenseConfirmation] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Selected destination info
  const selectedDest = EXISTING_DESTINATION_OPTIONS.find((d) => d.id === selectedDestinationId) || EXISTING_DESTINATION_OPTIONS[0];

  const handleFiles = (files: FileList | File[]) => {
    setValidationError(null);
    const newStaged: StagedFile[] = [];

    Array.from(files).forEach((file) => {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setValidationError(validation.error || 'Invalid file');
        return;
      }
      newStaged.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });

    if (newStaged.length > 0) {
      setStagedFiles((prev) => [...prev, ...newStaged]);
      if (!title && newStaged[0]) {
        // Auto-fill nice title from first filename
        const cleanName = newStaged[0].file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const removeFile = (index: number) => {
    setStagedFiles((prev) => {
      const target = prev[index];
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const resetForm = () => {
    stagedFiles.forEach((sf) => URL.revokeObjectURL(sf.previewUrl));
    setStagedFiles([]);
    setTitle('');
    setDescription('');
    setContributorName('');
    setHasLicenseConfirmation(false);
    setIsSubmitting(false);
    setUploadProgress(0);
    setValidationError(null);
    setSuccessCount(null);
  };

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (stagedFiles.length === 0) {
      setValidationError('Please select or drag-and-drop at least one photograph.');
      return;
    }

    if (!title.trim()) {
      setValidationError('Please enter a photograph title.');
      return;
    }

    if (!contributorName.trim()) {
      setValidationError('Please enter your name as the photographer/contributor.');
      return;
    }

    if (!hasLicenseConfirmation) {
      setValidationError('Please check the confirmation box verifying ownership or reuse permission.');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(10);

    let submitted = 0;
    let lastError: string | null = null;

    for (let i = 0; i < stagedFiles.length; i++) {
      const sf = stagedFiles[i];
      const itemTitle = stagedFiles.length > 1 ? `${title.trim()} (${i + 1}/${stagedFiles.length})` : title.trim();

      const res = await submitVisitorPhoto({
        file: sf.file,
        title: itemTitle,
        description: description.trim(),
        contributorName: contributorName.trim(),
        collectionId: selectedDest.collectionId,
        destinationId: selectedDest.id,
        licenseConfirmation: hasLicenseConfirmation,
      });

      if (res.success) {
        submitted++;
      } else {
        lastError = res.error || 'Failed to upload photo.';
      }

      setUploadProgress(Math.round(((i + 1) / stagedFiles.length) * 100));
    }

    setIsSubmitting(false);

    if (submitted > 0) {
      setSuccessCount(submitted);
      onUploadSuccess?.();
    } else {
      setValidationError(lastError || 'Upload failed. Please check file format and size.');
    }
  };

  if (!isOpen) return null;

  const isCloudActive = isSupabaseConfigured();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-forest-950/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-forest-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-ivory-100 max-h-[92vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-gold-500/15">
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-wider text-gold-400 uppercase block mb-1">
                Explore Sivasagar Community Archive
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ivory-100">
                Contribute Heritage Photograph
              </h3>
            </div>
            <button
              onClick={handleModalClose}
              className="p-2 rounded-full text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Success Screen */}
          {successCount !== null ? (
            <div className="py-10 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-gold-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-ivory-100 font-medium">
                  Photograph Submitted for Moderation!
                </h4>
                <p className="text-sm text-ivory-200 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-gold-300">{contributorName}</strong>. Your {successCount > 1 ? `${successCount} photographs have` : 'photograph has'} been submitted for the{' '}
                  <span className="text-gold-400 font-medium">{selectedDest.collectionName}</span> collection under{' '}
                  <span className="text-ivory-100 font-medium">{selectedDest.name}</span>.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] bg-forest-800 border border-gold-500/25 text-gold-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                    Status: Pending Archival Review
                  </span>
                </div>
                <p className="text-[12px] text-charcoal-400 pt-1">
                  Once approved by the museum administration, your photograph will appear permanently in the public {selectedDest.collectionName} collection.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg border border-gold-500/30 text-ivory-200 hover:text-white text-[13px] font-medium hover:bg-forest-800 transition-all"
                >
                  Submit Another Photo
                </button>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-6 py-2.5 rounded-lg bg-gold-500 text-forest-950 font-medium text-[13px] hover:bg-gold-400 transition-all shadow-md"
                >
                  Return to Gallery
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {/* Cloud Storage Notice */}
              <div className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-forest-950/80 border border-gold-500/20 text-[12px]">
                <div className="flex items-center gap-2 text-ivory-300">
                  <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>
                    Storage backend:{' '}
                    <strong className={isCloudActive ? 'text-emerald-400' : 'text-gold-300'}>
                      {isCloudActive ? 'Supabase Cloud Storage (Active)' : 'Local Persistent Staging (Demo Mode)'}
                    </strong>
                  </span>
                </div>
                <span className="text-charcoal-400 hidden sm:inline">Max 5MB / JPEG, PNG, WebP</span>
              </div>

              {/* Drag and Drop Zone */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) handleFiles(e.target.files);
                  }}
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-gold-400 bg-forest-800/80'
                      : 'border-gold-500/25 hover:border-gold-500/50 bg-forest-950/40 hover:bg-forest-950/60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-forest-800 border border-gold-500/30 text-gold-400 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-[14px] font-medium text-ivory-100">
                    Click to select or drag and drop photographs
                  </p>
                  <p className="text-[12px] text-charcoal-400 mt-1">
                    Multiple uploads supported · High-resolution camera or mobile captures
                  </p>
                </div>
              </div>

              {/* Staged File Previews */}
              {stagedFiles.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[12px] text-gold-400">
                    <span>Selected Photographs ({stagedFiles.length})</span>
                    <button
                      type="button"
                      onClick={() => {
                        stagedFiles.forEach((sf) => URL.revokeObjectURL(sf.previewUrl));
                        setStagedFiles([]);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2 bg-forest-950/50 rounded-lg border border-gold-500/15">
                    {stagedFiles.map((sf, index) => (
                      <div key={index} className="relative group rounded-lg overflow-hidden border border-gold-500/20 aspect-[4/3] bg-forest-950">
                        <img
                          src={sf.previewUrl}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="absolute top-1 right-1 p-1 bg-forest-950/80 text-red-400 rounded-full hover:bg-red-950 transition-colors opacity-80 group-hover:opacity-100"
                          title="Remove photograph"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destination & Collection Assignment */}
              <div className="space-y-1.5">
                <label htmlFor="destination-select" className="block text-[13px] font-medium text-gold-400">
                  Select Existing Destination &amp; Collection *
                </label>
                <select
                  id="destination-select"
                  value={selectedDestinationId}
                  onChange={(e) => setSelectedDestinationId(e.target.value)}
                  className="w-full bg-forest-950 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-400 transition-colors"
                >
                  <optgroup label="1. Royal Palaces">
                    {EXISTING_DESTINATION_OPTIONS.filter((d) => d.collectionId === 'palaces').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} → Royal Palaces
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="2. Ahom Architecture">
                    {EXISTING_DESTINATION_OPTIONS.filter((d) => d.collectionId === 'architecture').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} → Ahom Architecture
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="3. Temples & Sacred Lakes">
                    {EXISTING_DESTINATION_OPTIONS.filter((d) => d.collectionId === 'temples-lakes').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} → Temples &amp; Sacred Lakes
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="4. UNESCO & Heritage">
                    {EXISTING_DESTINATION_OPTIONS.filter((d) => d.collectionId === 'unesco-heritage').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} → UNESCO &amp; Heritage
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="5. Culture & Traditions">
                    {EXISTING_DESTINATION_OPTIONS.filter((d) => d.collectionId === 'culture-traditions').map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} → Culture &amp; Traditions
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-[12px] text-charcoal-400">
                  Target collection:{' '}
                  <span className="text-gold-300 font-medium">{selectedDest.collectionName}</span>. Your upload will only appear inside this collection.
                </p>
              </div>

              {/* Title & Contributor Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="photo-title" className="block text-[13px] font-medium text-gold-400">
                    Photograph Title *
                  </label>
                  <input
                    id="photo-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Rang Ghar Southern Arch in Morning Light"
                    className="w-full bg-forest-950 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contributor-name" className="block text-[13px] font-medium text-gold-400">
                    Photographer / Contributor Name *
                  </label>
                  <input
                    id="contributor-name"
                    type="text"
                    required
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                    placeholder="e.g. Partha Pratim Dutta"
                    className="w-full bg-forest-950 border border-gold-500/30 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label htmlFor="photo-desc" className="block text-[13px] font-medium text-gold-400">
                  Description / Historical Context <span className="text-charcoal-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  id="photo-desc"
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail architectural perspective, time of capture, lighting or conservation notes..."
                  className="w-full bg-forest-950 border border-gold-500/30 rounded-lg px-3.5 py-2 text-sm text-ivory-100 placeholder:text-ivory-400/40 focus:outline-none focus:border-gold-400 transition-colors resize-none"
                />
              </div>

              {/* License / Ownership Confirmation Checkbox */}
              <div className="p-3.5 rounded-lg bg-forest-950/70 border border-gold-500/20">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={hasLicenseConfirmation}
                    onChange={(e) => setHasLicenseConfirmation(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gold-500/40 bg-forest-900 text-gold-500 focus:ring-gold-400"
                  />
                  <span className="text-[12px] text-ivory-200 leading-snug">
                    I confirm that I took this photograph myself or have explicit permission to contribute it to the Explore Sivasagar Digital Heritage Archive under Creative Commons (CC-BY-SA 4.0) attribution terms.
                  </span>
                </label>
              </div>

              {/* Validation / Error Message */}
              {validationError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/70 border border-red-500/40 text-red-200 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[12px] text-gold-400">
                    <span>Uploading photograph...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-forest-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-400 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gold-500/15">
                <button
                  type="button"
                  onClick={handleModalClose}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-lg border border-gold-500/25 text-ivory-300 hover:text-white text-[13px] font-medium hover:bg-forest-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-gold-500 text-forest-950 text-[13px] font-medium hover:bg-gold-400 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Submit for Archival Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VisitorUploadModal;
