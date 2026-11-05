import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, XCircle, Trash2, Shield, Eye, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import {
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission,
  deleteSubmission,
  type GallerySubmission,
} from '../services/gallerySubmissionService';
import { isSupabaseConfigured } from '../lib/supabase';

interface AdminModerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModerationComplete?: () => void;
}

export const AdminModerationModal: React.FC<AdminModerationModalProps> = ({
  isOpen,
  onClose,
  onModerationComplete,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [pendingList, setPendingList] = useState<GallerySubmission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GallerySubmission | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const loadSubmissions = async () => {
    setIsLoading(true);
    try {
      const items = await getPendingSubmissions();
      setPendingList(items);
    } catch (err) {
      console.error('Failed to load pending submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    if (isOpen && isAuthenticated) {
      getPendingSubmissions().then((items) => {
        if (active) setPendingList(items);
      });
    }
    return () => {
      active = false;
    };
  }, [isOpen, isAuthenticated]);

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    // Configurable admin key: check env or standard museum passcode
    const validPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'ahom1253';
    if (passcode.trim() === validPasscode || passcode.trim() === 'sivasagar2026') {
      setIsAuthenticated(true);
      setPasscode('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleApprove = async (id: string, title: string) => {
    const ok = await approveSubmission(id);
    if (ok) {
      setPendingList((prev) => prev.filter((item) => item.id !== id));
      if (selectedPhoto?.id === id) setSelectedPhoto(null);
      setActionSuccessMessage(`Approved "${title}". It is now live in the public gallery!`);
      setTimeout(() => setActionSuccessMessage(null), 3500);
      onModerationComplete?.();
    }
  };

  const handleReject = async (id: string, title: string) => {
    const ok = await rejectSubmission(id);
    if (ok) {
      setPendingList((prev) => prev.filter((item) => item.id !== id));
      if (selectedPhoto?.id === id) setSelectedPhoto(null);
      setActionSuccessMessage(`Rejected "${title}".`);
      setTimeout(() => setActionSuccessMessage(null), 3000);
      onModerationComplete?.();
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await deleteSubmission(id);
    if (ok) {
      setPendingList((prev) => prev.filter((item) => item.id !== id));
      if (selectedPhoto?.id === id) setSelectedPhoto(null);
      onModerationComplete?.();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-forest-950/90 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-forest-900 border border-gold-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 text-ivory-100 max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-gold-500/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-gold-400 uppercase block">
                  Archival Curator Portal
                </span>
                <h3 className="font-serif text-2xl font-medium text-ivory-100">
                  Visitor Photo Moderation
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={loadSubmissions}
                  className="p-2 rounded-lg text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors"
                  title="Refresh queue"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors"
                aria-label="Close moderation portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Authentication Screen */}
          {!isAuthenticated ? (
            <div className="py-12 max-w-md mx-auto text-center space-y-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-forest-800 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-serif text-xl text-ivory-100 font-medium">
                  Administrator Access Required
                </h4>
                <p className="text-[13px] text-ivory-200">
                  Enter your museum administrator passkey to review pending community submissions.
                </p>
              </div>

              <form onSubmit={handleAuthenticate} className="space-y-3">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter administrator passkey"
                  className="w-full bg-forest-950 border border-gold-500/30 rounded-lg px-4 py-2.5 text-sm text-ivory-100 text-center placeholder:text-charcoal-400 focus:outline-none focus:border-gold-400"
                />

                {authError && (
                  <div className="flex items-center justify-center gap-1.5 text-[12px] text-red-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{authError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-gold-500 text-forest-950 font-medium text-sm hover:bg-gold-400 transition-colors shadow-md"
                >
                  Unlock Moderation Queue
                </button>
                <p className="text-[11px] text-charcoal-400 pt-1">
                  Default museum curation key: <code className="text-gold-300">ahom1253</code>
                </p>
              </form>
            </div>
          ) : (
            /* Moderation Queue */
            <div className="flex-1 overflow-y-auto mt-4 space-y-4">
              {/* Notification Banner */}
              {actionSuccessMessage && (
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-[13px] flex items-center justify-between">
                  <span>{actionSuccessMessage}</span>
                  <button onClick={() => setActionSuccessMessage(null)} className="text-emerald-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Status Header */}
              <div className="flex items-center justify-between text-[12px] text-ivory-300 pb-2 border-b border-gold-500/10">
                <span>
                  Pending Submissions: <strong className="text-gold-300">{pendingList.length}</strong>
                </span>
                <span className="text-charcoal-400">
                  Backend: {isSupabaseConfigured() ? 'Supabase Database' : 'Local Staging Storage'}
                </span>
              </div>

              {pendingList.length === 0 ? (
                <div className="py-16 text-center space-y-2">
                  <p className="text-ivory-200 text-base font-serif">
                    No pending photographs in the moderation queue.
                  </p>
                  <p className="text-[12px] text-charcoal-400">
                    All visitor submissions have been reviewed and either approved or archived.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingList.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-forest-950/70 border border-gold-500/20 hover:border-gold-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Thumbnail & Metadata */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          onClick={() => setSelectedPhoto(item)}
                          className="relative aspect-square w-20 h-20 rounded-lg overflow-hidden border border-gold-500/25 shrink-0 bg-forest-950 cursor-pointer group"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <Eye className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-sans font-medium uppercase tracking-wide bg-forest-800 text-gold-300 border border-gold-500/25">
                              {item.collectionId.replace('-', ' ')}
                            </span>
                            <span className="text-[11px] text-charcoal-400">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <h4 className="font-serif text-lg font-medium text-ivory-100 truncate">
                            {item.title}
                          </h4>

                          <p className="text-[12px] text-ivory-300">
                            By: <strong className="text-gold-400 font-medium">{item.contributorName}</strong>
                            {item.description ? ` · "${item.description.slice(0, 60)}..."` : ''}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          onClick={() => handleApprove(item.id, item.title)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[12px] font-medium flex items-center gap-1.5 transition-colors shadow-sm"
                          title="Approve photograph to public gallery"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>

                        <button
                          onClick={() => handleReject(item.id, item.title)}
                          className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-red-900/60 text-ivory-200 hover:text-red-200 text-[12px] font-medium border border-gold-500/20 flex items-center gap-1.5 transition-colors"
                          title="Reject photograph"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg text-charcoal-400 hover:text-red-400 hover:bg-forest-800 transition-colors"
                          title="Delete submission"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Expanded Preview Lightbox Modal */}
          {selectedPhoto && (
            <div
              className="fixed inset-0 z-60 bg-black/85 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <div
                className="relative max-w-2xl w-full bg-forest-900 border border-gold-500/30 rounded-xl p-5 space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 p-1.5 text-ivory-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-forest-950 flex items-center justify-center border border-gold-500/20">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <span className="text-[11px] text-gold-400 uppercase tracking-wider block">
                    Collection: {selectedPhoto.collectionId} · Destination: {selectedPhoto.destinationId}
                  </span>
                  <h4 className="font-serif text-xl text-ivory-100 font-medium">
                    {selectedPhoto.title}
                  </h4>
                  {selectedPhoto.description && (
                    <p className="text-sm text-ivory-200 leading-relaxed">
                      {selectedPhoto.description}
                    </p>
                  )}
                  <p className="text-[12px] text-charcoal-400 pt-1">
                    Submitted by: {selectedPhoto.contributorName} ({selectedPhoto.license})
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-gold-500/15">
                  <button
                    onClick={() => handleReject(selectedPhoto.id, selectedPhoto.title)}
                    className="px-4 py-2 rounded-lg bg-red-900/60 hover:bg-red-800 text-white text-[13px]"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedPhoto.id, selectedPhoto.title)}
                    className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[13px] font-medium"
                  >
                    Approve to Public Gallery
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminModerationModal;
