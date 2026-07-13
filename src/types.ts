export type Language = 'en' | 'am';

export interface Sermon {
  id: string;
  title: { en: string; am: string };
  speaker: { en: string; am: string };
  date: { en: string; am: string };
  category: 'Grace' | 'Salvation' | 'Healing' | 'Worship';
  coverUrl: string;
  duration: string;
  videoUrl?: string;
  scripture?: { en: string; am: string };
  summary: { en: string; am: string };
  content?: { en: string; am: string };
}

export interface GalleryItem {
  id: string;
  title: { en: string; am: string };
  category: 'Worship' | 'Fellowship' | 'Baptism' | 'Youth' | 'Children';
  coverUrl: string;
  description: { en: string; am: string };
}

export interface PrayerRequest {
  id: string;
  name: string;
  phone: string;
  request: string;
  date: string;
  isApproved: boolean;
  replies?: string[];
  likes?: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export type PartnerTier = 'Silver' | 'Gold' | 'Diamond' | 'Platinum';

export interface Partner {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  tier: PartnerTier;
  monthlyAmountRange: string;
  paymentMethod: 'CBE' | 'Dashen' | 'Telebirr' | 'Other';
  dateRegistered: string;
  status: 'Active' | 'Pending';
}

export type MinistryArea = 'Evangelism & Preaching' | 'Intercessory Prayer' | 'Worship & Choir' | 'Youth & Children' | 'Community Outreach';

export interface Member {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city: string;
  ministryArea: MinistryArea;
  statement: string;
  dateRegistered: string;
  status: 'Active' | 'Approved' | 'In Review';
}
