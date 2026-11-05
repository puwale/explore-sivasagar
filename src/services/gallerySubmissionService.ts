import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface GallerySubmission {
  id: string;
  collectionId: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
  destinationId: string;
  title: string;
  description: string;
  contributorName: string;
  imageUrl: string;
  storagePath?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  license: string;
}

const LOCAL_STORAGE_KEY = 'explore_sivasagar_gallery_submissions_v1';

// Read local submissions
function getLocalSubmissions(): GallerySubmission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn('Failed to parse local gallery submissions:', err);
    return [];
  }
}

// Write local submissions
function saveLocalSubmissions(submissions: GallerySubmission[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(submissions));
    window.dispatchEvent(new CustomEvent('gallery_submissions_updated'));
  } catch (err) {
    console.warn('Failed to save local gallery submissions:', err);
  }
}

// Validate file
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid format (${file.type || 'unknown'}). Only JPEG, PNG, and WebP are supported.`,
    };
  }

  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSizeInBytes) {
    return {
      valid: false,
      error: `File "${file.name}" exceeds the 5MB maximum upload limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }

  return { valid: true };
}

// Convert File to base64 for preview / staging
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

// Submit a visitor photograph
export async function submitVisitorPhoto(data: {
  file: File;
  title: string;
  description: string;
  contributorName: string;
  collectionId: 'palaces' | 'architecture' | 'temples-lakes' | 'unesco-heritage' | 'culture-traditions';
  destinationId: string;
  licenseConfirmation: boolean;
}): Promise<{ success: boolean; submission?: GallerySubmission; error?: string }> {
  const { file, title, description, contributorName, collectionId, destinationId, licenseConfirmation } = data;

  if (!licenseConfirmation) {
    return { success: false, error: 'You must confirm ownership or license permission before submitting.' };
  }

  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const uniqueKey = `${collectionId}/${destinationId}-${Date.now()}-${sanitizedFileName}`;

  // If Supabase is configured, use persistent cloud storage and database
  if (isSupabaseConfigured() && supabase) {
    try {
      // 1. Upload to storage bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-submissions')
        .upload(uniqueKey, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw new Error(`Storage upload error: ${uploadError.message}`);
      }

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery-submissions')
        .getPublicUrl(uploadData.path);

      const publicUrl = urlData.publicUrl;

      // 3. Insert record into database
      const newRecord = {
        collection_id: collectionId,
        destination_id: destinationId,
        title: title.trim(),
        description: description.trim(),
        contributor_name: contributorName.trim(),
        image_url: publicUrl,
        storage_path: uploadData.path,
        status: 'pending' as const,
        license: 'Creative Commons (Contributor-Confirmed)',
      };

      const { data: insertedData, error: dbError } = await supabase
        .from('gallery_submissions')
        .insert([newRecord])
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      const submission: GallerySubmission = {
        id: insertedData.id,
        collectionId: insertedData.collection_id,
        destinationId: insertedData.destination_id,
        title: insertedData.title,
        description: insertedData.description,
        contributorName: insertedData.contributor_name,
        imageUrl: insertedData.image_url,
        storagePath: insertedData.storage_path,
        status: insertedData.status,
        createdAt: insertedData.created_at,
        license: insertedData.license,
      };

      return { success: true, submission };
    } catch (err: unknown) {
      console.error('Supabase upload failed, falling back to local staging:', err);
      // Fallback gracefully to local staging if remote fails
    }
  }

  // Local persistent staging mode (when Supabase is offline or not yet configured)
  try {
    const base64Url = await fileToBase64(file);
    const stagedSubmission: GallerySubmission = {
      id: `staging-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      collectionId,
      destinationId,
      title: title.trim(),
      description: description.trim(),
      contributorName: contributorName.trim(),
      imageUrl: base64Url,
      storagePath: `local/${uniqueKey}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
      license: 'Creative Commons (Contributor-Confirmed)',
    };

    const current = getLocalSubmissions();
    saveLocalSubmissions([stagedSubmission, ...current]);

    return { success: true, submission: stagedSubmission };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown upload error';
    return { success: false, error: `Failed to process image: ${message}` };
  }
}

// Fetch approved photographs for public gallery display
export async function getApprovedSubmissions(): Promise<GallerySubmission[]> {
  const localApproved = getLocalSubmissions().filter((s) => s.status === 'approved');

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_submissions')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const remoteApproved: GallerySubmission[] = data.map((d) => ({
          id: d.id,
          collectionId: d.collection_id,
          destinationId: d.destination_id,
          title: d.title,
          description: d.description,
          contributorName: d.contributor_name,
          imageUrl: d.image_url,
          storagePath: d.storage_path,
          status: d.status,
          createdAt: d.created_at,
          license: d.license,
        }));

        // Merge without duplicates
        const map = new Map<string, GallerySubmission>();
        remoteApproved.forEach((item) => map.set(item.id, item));
        localApproved.forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
      }
    } catch (err) {
      console.warn('Could not fetch approved remote submissions:', err);
    }
  }

  return localApproved;
}

// Fetch pending submissions for Admin Moderation
export async function getPendingSubmissions(): Promise<GallerySubmission[]> {
  const localPending = getLocalSubmissions().filter((s) => s.status === 'pending');

  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_submissions')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const remotePending: GallerySubmission[] = data.map((d) => ({
          id: d.id,
          collectionId: d.collection_id,
          destinationId: d.destination_id,
          title: d.title,
          description: d.description,
          contributorName: d.contributor_name,
          imageUrl: d.image_url,
          storagePath: d.storage_path,
          status: d.status,
          createdAt: d.created_at,
          license: d.license,
        }));

        const map = new Map<string, GallerySubmission>();
        remotePending.forEach((item) => map.set(item.id, item));
        localPending.forEach((item) => map.set(item.id, item));
        return Array.from(map.values());
      }
    } catch (err) {
      console.warn('Could not fetch pending remote submissions:', err);
    }
  }

  return localPending;
}

// Admin: Approve a submission
export async function approveSubmission(id: string): Promise<boolean> {
  let success = false;

  // 1. Update local
  const current = getLocalSubmissions();
  const index = current.findIndex((s) => s.id === id);
  if (index !== -1) {
    current[index].status = 'approved';
    saveLocalSubmissions([...current]);
    success = true;
  }

  // 2. Update Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('gallery_submissions')
        .update({ status: 'approved' })
        .eq('id', id);

      if (!error) {
        success = true;
        window.dispatchEvent(new CustomEvent('gallery_submissions_updated'));
      }
    } catch (err) {
      console.error('Failed to approve in Supabase:', err);
    }
  }

  return success;
}

// Admin: Reject a submission
export async function rejectSubmission(id: string): Promise<boolean> {
  let success = false;

  // 1. Update local
  const current = getLocalSubmissions();
  const index = current.findIndex((s) => s.id === id);
  if (index !== -1) {
    current[index].status = 'rejected';
    saveLocalSubmissions([...current]);
    success = true;
  }

  // 2. Update Supabase
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase
        .from('gallery_submissions')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (!error) {
        success = true;
        window.dispatchEvent(new CustomEvent('gallery_submissions_updated'));
      }
    } catch (err) {
      console.error('Failed to reject in Supabase:', err);
    }
  }

  return success;
}

// Admin: Delete a submission
export async function deleteSubmission(id: string): Promise<boolean> {
  let success = false;

  const current = getLocalSubmissions().filter((s) => s.id !== id);
  saveLocalSubmissions(current);
  success = true;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('gallery_submissions').delete().eq('id', id);
      if (!error) {
        success = true;
        window.dispatchEvent(new CustomEvent('gallery_submissions_updated'));
      }
    } catch (err) {
      console.error('Failed to delete in Supabase:', err);
    }
  }

  return success;
}

