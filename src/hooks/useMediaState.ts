import { useState, useEffect } from 'react';
import { Sermon, GalleryItem } from '../types';
import { SERMONS as INITIAL_SERMONS, GALLERY_ITEMS as INITIAL_GALLERY } from '../data';

const SERMONS_STORAGE_KEY = 'kohl_sermons_state_v1';
const GALLERY_STORAGE_KEY = 'kohl_gallery_state_v1';

/**
 * Universal video URL converter to ensure iframes load cleanly
 * Supports TikTok (@user/video/ID, embed/v2/ID) and YouTube (youtu.be/ID, watch?v=ID, shorts/ID)
 */
export function convertVideoUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  const url = rawUrl.trim();

  // 1. If it's already a clean embed link, return as is
  if (url.includes('/embed/')) return url;

  // 2. Standard TikTok link: https://www.tiktok.com/@username/video/1234567890123456789
  const tiktokMatch = url.match(/\/video\/(\d+)/);
  if (tiktokMatch && tiktokMatch[1]) {
    return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
  }

  // Known vt.tiktok.com resolutions from earlier sync
  const knownShorts: Record<string, string> = {
    'https://vt.tiktok.com/ZSX8Q263e/': 'https://www.tiktok.com/embed/v2/7613836154726518024',
    'https://vt.tiktok.com/ZSX8QYPQL/': 'https://www.tiktok.com/embed/v2/7606040429796068629',
    'https://vt.tiktok.com/ZSX8QLDfb/': 'https://www.tiktok.com/embed/v2/7517349976435952952',
    'https://vt.tiktok.com/ZSX8xWtng/': 'https://www.tiktok.com/embed/v2/7641665797085056274',
    'https://vt.tiktok.com/ZSX8Q2F5B/': 'https://www.tiktok.com/embed/v2/7582663261112339724',
    'https://vt.tiktok.com/ZSX8QXo2U/': 'https://www.tiktok.com/embed/v2/7588599075902147852',
    'https://vt.tiktok.com/ZSX8QC82m/': 'https://www.tiktok.com/embed/v2/7615317915142786322',
    'https://vt.tiktok.com/ZSX8QAUYP/': 'https://www.tiktok.com/embed/v2/7644262132220955912',
    'https://vt.tiktok.com/ZSX8Qfkvh/': 'https://www.tiktok.com/embed/v2/7649829240036232466',
  };
  if (knownShorts[url]) return knownShorts[url];

  // 3. YouTube link patterns
  // youtu.be/ID or youtube.com/watch?v=ID or youtube.com/shorts/ID
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Return original if no pattern matched
  return url;
}

export function useMediaState() {
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    try {
      const saved = localStorage.getItem(SERMONS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load sermons from localStorage', e);
    }
    return INITIAL_SERMONS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load gallery from localStorage', e);
    }
    return INITIAL_GALLERY;
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(SERMONS_STORAGE_KEY, JSON.stringify(sermons));
    } catch (e) {
      console.error('Failed to save sermons to localStorage', e);
    }
  }, [sermons]);

  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(galleryItems));
    } catch (e) {
      console.error('Failed to save gallery to localStorage', e);
    }
  }, [galleryItems]);

  // Sermon CRUD
  const addSermon = (newSermon: Sermon) => {
    setSermons((prev) => [{ ...newSermon, videoUrl: convertVideoUrl(newSermon.videoUrl) }, ...prev]);
  };

  const updateSermon = (id: string, updatedFields: Partial<Sermon>) => {
    setSermons((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          if (updatedFields.videoUrl !== undefined) {
            updated.videoUrl = convertVideoUrl(updatedFields.videoUrl);
          }
          return updated;
        }
        return item;
      })
    );
  };

  const deleteSermon = (id: string) => {
    setSermons((prev) => prev.filter((item) => item.id !== id));
  };

  // Gallery CRUD
  const addGalleryItem = (newItem: GalleryItem) => {
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updatedFields: Partial<GalleryItem>) => {
    setGalleryItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset all to initial data.ts values
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all videos and photos to default initial values?')) {
      localStorage.removeItem(SERMONS_STORAGE_KEY);
      localStorage.removeItem(GALLERY_STORAGE_KEY);
      setSermons(INITIAL_SERMONS);
      setGalleryItems(INITIAL_GALLERY);
    }
  };

  return {
    sermons,
    galleryItems,
    addSermon,
    updateSermon,
    deleteSermon,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
  };
}
