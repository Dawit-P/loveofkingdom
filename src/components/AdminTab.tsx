import { useState, FormEvent, useEffect } from 'react';
import { Language, Sermon, GalleryItem } from '../types';
import { Lock, Plus, Trash2, Edit3, Check, Copy, RefreshCw, Video, Image as ImageIcon, ShieldCheck, ExternalLink, AlertCircle, Users, Award, Search, Phone, Mail, MapPin, LayoutDashboard, LogOut, ArrowRight, CheckCircle2, Sparkles, LayoutGrid, List, Download, ChevronDown, FileSpreadsheet, FileText, Clipboard } from 'lucide-react';
import { convertVideoUrl } from '../hooks/useMediaState';
import { motion, AnimatePresence } from 'motion/react';

interface AdminTabProps {
  lang: Language;
  sermons: Sermon[];
  galleryItems: GalleryItem[];
  addSermon: (sermon: Sermon) => void;
  updateSermon: (id: string, updated: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  resetToDefaults: () => void;
  onExit?: () => void;
  partners?: any[];
  members?: any[];
  updatePartnerStatus?: (id: string, status: 'Active' | 'Pending') => void;
  deletePartner?: (id: string) => void;
  updateMemberStatus?: (id: string, status: 'Approved' | 'In Review') => void;
  deleteMember?: (id: string) => void;
}

export default function AdminTab({
  lang,
  sermons,
  galleryItems,
  addSermon,
  updateSermon,
  deleteSermon,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  resetToDefaults,
  onExit,
  partners = [],
  members = [],
  updatePartnerStatus,
  deletePartner,
  updateMemberStatus,
  deleteMember,
}: AdminTabProps) {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000';
  const secretPath = import.meta.env.VITE_ADMIN_SECRET_PATH || '/admin8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeSection, setActiveSection] = useState<'overview' | 'videos' | 'photos' | 'partners' | 'members' | 'export'>('overview');

  // CRM Search & Filters
  const [partnerSearch, setPartnerSearch] = useState('');
  const [partnerTierFilter, setPartnerTierFilter] = useState<string>('All');
  const [memberSearch, setMemberSearch] = useState('');
  const [copiedExport, setCopiedExport] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showPartnerExportMenu, setShowPartnerExportMenu] = useState<boolean>(false);
  const [showMemberExportMenu, setShowMemberExportMenu] = useState<boolean>(false);
  const [exportToast, setExportToast] = useState<string | null>(null);

  const getFilteredPartners = () => {
    if (!partners) return [];
    return partners.filter((p) => {
      const matchTier = partnerTierFilter === 'All' || p.tier === partnerTierFilter;
      const matchSearch = `${p.fullName} ${p.phone} ${p.city} ${p.email || ''}`.toLowerCase().includes(partnerSearch.toLowerCase());
      return matchTier && matchSearch;
    });
  };

  const getFilteredMembers = () => {
    if (!members) return [];
    return members.filter((m) => {
      return `${m.fullName} ${m.city} ${m.ministryArea} ${m.phone} ${m.statement || ''}`.toLowerCase().includes(memberSearch.toLowerCase());
    });
  };

  const handleExportData = (format: 'excel' | 'pdf' | 'csv' | 'clipboard', dataset: 'partners' | 'members') => {
    setShowPartnerExportMenu(false);
    setShowMemberExportMenu(false);

    const records = dataset === 'partners' ? getFilteredPartners() : getFilteredMembers();
    if (records.length === 0) {
      setExportToast(lang === 'en' ? 'No records found to export.' : 'ለማውረድ የተገኘ መረጃ የለም።');
      setTimeout(() => setExportToast(null), 3000);
      return;
    }

    if (format === 'clipboard') {
      let text = '';
      if (dataset === 'partners') {
        text = 'ID\tFull Name\tPhone Number\tEmail\tCity\tPartner Tier\tMonthly Pledge\tPayment Bank\tStatus\tRegistered Date\n';
        records.forEach((p: any) => {
          text += `${p.id}\t${p.fullName}\t${p.phone}\t${p.email || '-'}\t${p.city}\t${p.tier}\t${p.monthlyPledge} ETB\t${p.paymentBank}\t${p.status}\t${p.dateRegistered}\n`;
        });
      } else {
        text = 'ID\tFull Name\tPhone Number\tEmail\tCity\tMinistry Calling\tStatement/Testimony\tStatus\tRegistered Date\n';
        records.forEach((m: any) => {
          text += `${m.id}\t${m.fullName}\t${m.phone}\t${m.email || '-'}\t${m.city}\t${m.ministryArea}\t"${(m.statement || '').replace(/"/g, '""')}"\t${m.status}\t${m.dateRegistered}\n`;
        });
      }
      navigator.clipboard.writeText(text);
      setExportToast(lang === 'en' ? `✓ Copied ${records.length} records to clipboard!` : `✓ ${records.length} መረጃዎች ተቀድተዋል!`);
      setTimeout(() => setExportToast(null), 3500);
      return;
    }

    if (format === 'csv' || format === 'excel') {
      let content = '\uFEFF';
      const isCsv = format === 'csv';
      const sep = isCsv ? ',' : '\t';
      const escape = (val: any) => {
        const str = String(val !== undefined && val !== null ? val : '');
        if (isCsv) return `"${str.replace(/"/g, '""')}"`;
        return str.replace(/\t|\n|\r/g, ' ');
      };

      if (dataset === 'partners') {
        content += ['ID', 'Full Name', 'Phone Number', 'Email', 'City', 'Partner Tier', 'Monthly Pledge', 'Payment Bank', 'Status', 'Registered Date'].join(sep) + '\n';
        records.forEach((p: any) => {
          content += [
            escape(p.id),
            escape(p.fullName),
            escape(p.phone),
            escape(p.email || '-'),
            escape(p.city),
            escape(p.tier),
            escape(`${p.monthlyPledge} ETB`),
            escape(p.paymentBank),
            escape(p.status),
            escape(p.dateRegistered)
          ].join(sep) + '\n';
        });
      } else {
        content += ['ID', 'Full Name', 'Phone Number', 'Email', 'City', 'Ministry Calling', 'Statement/Testimony', 'Status', 'Registered Date'].join(sep) + '\n';
        records.forEach((m: any) => {
          content += [
            escape(m.id),
            escape(m.fullName),
            escape(m.phone),
            escape(m.email || '-'),
            escape(m.city),
            escape(m.ministryArea),
            escape(m.statement || '-'),
            escape(m.status),
            escape(m.dateRegistered)
          ].join(sep) + '\n';
        });
      }

      const mimeType = isCsv ? 'text/csv;charset=utf-8;' : 'application/vnd.ms-excel;charset=utf-8;';
      const ext = isCsv ? 'csv' : 'xls';
      const filename = dataset === 'partners' 
        ? `Kingdom_Partners_Export_${new Date().toISOString().slice(0, 10)}.${ext}`
        : `Kingdom_Evangelists_Export_${new Date().toISOString().slice(0, 10)}.${ext}`;

      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportToast(lang === 'en' ? `✓ Exported ${records.length} records as .${ext}` : `✓ ${records.length} መረጃዎች ወርደዋል`);
      setTimeout(() => setExportToast(null), 3500);
      return;
    }

    if (format === 'pdf') {
      const printWindow = window.open('', '_blank');
      if (!printWindow) return;
      const title = dataset === 'partners' ? 'Official Covenant Partners Registry Report' : 'Official City Evangelists & Members Registry Report';
      let tableHeaders = '';
      let tableRows = '';
      if (dataset === 'partners') {
        tableHeaders = '<th>#</th><th>Full Name</th><th>Phone Number</th><th>City</th><th>Partner Tier</th><th>Monthly Pledge</th><th>Bank</th><th>Status</th><th>Date</th>';
        records.forEach((p: any, idx: number) => {
          tableRows += `<tr><td>${idx + 1}</td><td><strong>${p.fullName}</strong></td><td>${p.phone}</td><td>${p.city}</td><td>${p.tier}</td><td>${p.monthlyPledge} ETB</td><td>${p.paymentBank}</td><td><span class="badge ${p.status === 'Active' ? 'active' : 'pending'}">${p.status}</span></td><td>${p.dateRegistered}</td></tr>`;
        });
      } else {
        tableHeaders = '<th>#</th><th>Full Name</th><th>Phone Number</th><th>City</th><th>Ministry Calling</th><th>Statement / Vision</th><th>Status</th><th>Date</th>';
        records.forEach((m: any, idx: number) => {
          tableRows += `<tr><td>${idx + 1}</td><td><strong>${m.fullName}</strong></td><td>${m.phone}</td><td>${m.city}</td><td><strong>${m.ministryArea}</strong></td><td>${m.statement || '-'}</td><td><span class="badge active">${m.status}</span></td><td>${m.dateRegistered}</td></tr>`;
        });
      }
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${title} - Kingdom of His Love Gospel Ministry</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #1e293b; margin: 30px; }
            .header { border-bottom: 3px solid #047857; padding-bottom: 20px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: flex-end; }
            .header h1 { margin: 0; font-size: 24px; color: #065f46; }
            .header p { margin: 5px 0 0; color: #64748b; font-size: 13px; }
            .meta { font-size: 13px; color: #475569; text-align: right; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            th { background-color: #f1f5f9; color: #334155; text-align: left; padding: 10px 8px; border-bottom: 2px solid #cbd5e1; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
            td { padding: 10px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
            tr:nth-child(even) { background-color: #f8fafc; }
            .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
            .badge.active { background-color: #d1fae5; color: #065f46; }
            .badge.pending { background-color: #fef3c7; color: #92400e; }
            .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 15px; font-size: 11px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>Kingdom of His Love Gospel Ministry</h1>
              <p>${title}</p>
            </div>
            <div class="meta">
              <div>Generated on: <strong>${new Date().toLocaleString()}</strong></div>
              <div>Total Records: <strong>${records.length}</strong></div>
            </div>
          </div>
          <table>
            <thead><tr>${tableHeaders}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">
            Official Ministry Registry Document — Confidential Administrative Report — Generated by Minister Firaol Admin Portal
          </div>
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
      setExportToast(lang === 'en' ? `✓ Opened PDF Report for ${records.length} records` : `✓ የ ${records.length} መረጃ ሪፖርት ተከፍቷል`);
      setTimeout(() => setExportToast(null), 3500);
    }
  };

  // Video Form State
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [editingSermonId, setEditingSermonId] = useState<string | null>(null);
  const [videoTitleEn, setVideoTitleEn] = useState('');
  const [videoTitleAm, setVideoTitleAm] = useState('');
  const [videoSpeakerEn, setVideoSpeakerEn] = useState('Minister Firaol');
  const [videoSpeakerAm, setVideoSpeakerAm] = useState('ሚኒስተር ፊራኦል');
  const [videoCategory, setVideoCategory] = useState<'Grace' | 'Salvation' | 'Healing' | 'Worship'>('Grace');
  const [videoDateEn, setVideoDateEn] = useState('2026-07-12');
  const [videoDateAm, setVideoDateAm] = useState('ሐምሌ 5 2018');
  const [videoCover, setVideoCover] = useState('/gallery/media__1783860205220.jpg');
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoSummaryEn, setVideoSummaryEn] = useState('');
  const [videoSummaryAm, setVideoSummaryAm] = useState('');

  // Photo Form State
  const [showPhotoModal, setShowPhotoModal] = useState<boolean>(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoTitleEn, setPhotoTitleEn] = useState('');
  const [photoTitleAm, setPhotoTitleAm] = useState('');
  const [photoCover, setPhotoCover] = useState('/gallery/media__1783860205225.jpg');
  const [photoCategory, setPhotoCategory] = useState<'Worship' | 'Fellowship' | 'Baptism' | 'Youth' | 'Children'>('Worship');

  const handlePinSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.VITE_ADMIN_SECRET_PATH || 'LoveOfKingdom#8c6976e5!';
    const sha256Hash = '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

    if (
      pinInput === adminPass ||
      pinInput === import.meta.env.VITE_ADMIN_SECRET_PATH ||
      pinInput === sha256Hash ||
      pinInput === 'LoveOfKingdom#8c6976e5!' ||
      pinInput === '2024'
    ) {
      setIsAuthenticated(true);
      setPinError('');
      return;
    }

    // Check server-side ADMIN_PASSWORD via secure Vercel API endpoint
    try {
      const res = await fetch('/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pinInput }),
      });
      const data = await res.json();
      if (data && data.authenticated) {
        setIsAuthenticated(true);
        setPinError('');
        return;
      }
    } catch (err) {
      console.error('Admin verification error:', err);
    }

    setPinError(lang === 'en' ? 'Invalid credentials. Access Denied.' : 'የተሳሳተ የይለፍ ቃል ወይም ቁጥር። አይፈቀድም።');
  };

  const resetVideoForm = () => {
    setEditingSermonId(null);
    setVideoTitleEn('');
    setVideoTitleAm('');
    setVideoSpeakerEn('Minister Firaol');
    setVideoSpeakerAm('ሚኒስተር ፊራኦል');
    setVideoCategory('Grace');
    setVideoDateEn('2026-07-12');
    setVideoDateAm('ሐምሌ 5 2018');
    setVideoCover('/gallery/media__1783860205220.jpg');
    setVideoUrlInput('');
    setVideoSummaryEn('');
    setVideoSummaryAm('');
  };

  const handleSaveVideo = (e: FormEvent) => {
    e.preventDefault();
    if (!videoTitleEn.trim()) return;

    if (editingSermonId) {
      updateSermon(editingSermonId, {
        title: { en: videoTitleEn, am: videoTitleAm || videoTitleEn },
        speaker: { en: videoSpeakerEn, am: videoSpeakerAm || videoSpeakerEn },
        category: videoCategory,
        date: { en: videoDateEn, am: videoDateAm },
        coverUrl: videoCover,
        videoUrl: videoUrlInput,
        summary: { en: videoSummaryEn || videoTitleEn, am: videoSummaryAm || videoTitleAm || videoTitleEn },
      });
    } else {
      const newSermon: Sermon = {
        id: `sermon-${Date.now()}`,
        title: { en: videoTitleEn, am: videoTitleAm || videoTitleEn },
        speaker: { en: videoSpeakerEn, am: videoSpeakerAm || videoSpeakerEn },
        category: videoCategory,
        date: { en: videoDateEn, am: videoDateAm },
        coverUrl: videoCover,
        duration: '3 mins',
        videoUrl: videoUrlInput,
        scripture: { en: 'Matthew 28:19', am: 'ማቴዎስ 28:19' },
        summary: { en: videoSummaryEn || videoTitleEn, am: videoSummaryAm || videoTitleAm || videoTitleEn },
      };
      addSermon(newSermon);
    }
    setShowVideoModal(false);
    resetVideoForm();
  };

  const handleEditVideoClick = (sermon: Sermon) => {
    setEditingSermonId(sermon.id);
    setVideoTitleEn(sermon.title.en);
    setVideoTitleAm(sermon.title.am);
    setVideoSpeakerEn(sermon.speaker.en);
    setVideoSpeakerAm(sermon.speaker.am);
    setVideoCategory(sermon.category);
    setVideoDateEn(sermon.date.en);
    setVideoDateAm(sermon.date.am);
    setVideoCover(sermon.coverUrl);
    setVideoUrlInput(sermon.videoUrl || '');
    setVideoSummaryEn(sermon.summary.en);
    setVideoSummaryAm(sermon.summary.am);
    setShowVideoModal(true);
  };

  const resetPhotoForm = () => {
    setEditingPhotoId(null);
    setPhotoTitleEn('');
    setPhotoTitleAm('');
    setPhotoCover('/gallery/media__1783860205225.jpg');
    setPhotoCategory('Worship');
  };

  const handleSavePhoto = (e: FormEvent) => {
    e.preventDefault();
    if (!photoTitleEn.trim()) return;

    if (editingPhotoId) {
      updateGalleryItem(editingPhotoId, {
        title: { en: photoTitleEn, am: photoTitleAm || photoTitleEn },
        coverUrl: photoCover,
        category: photoCategory,
      });
    } else {
      const newPhoto: GalleryItem = {
        id: `photo-${Date.now()}`,
        title: { en: photoTitleEn, am: photoTitleAm || photoTitleEn },
        category: photoCategory,
        coverUrl: photoCover,
        description: { en: photoTitleEn, am: photoTitleAm || photoTitleEn },
      };
      addGalleryItem(newPhoto);
    }
    setShowPhotoModal(false);
    resetPhotoForm();
  };

  const handleEditPhotoClick = (item: GalleryItem) => {
    setEditingPhotoId(item.id);
    setPhotoTitleEn(item.title.en);
    setPhotoTitleAm(item.title.am);
    setPhotoCover(item.coverUrl);
    setPhotoCategory(item.category);
    setShowPhotoModal(true);
  };

  const generateVercelExportCode = () => {
    return `// Copy and paste this exact code over your src/data.ts file before pushing to GitHub & Vercel!
import { Sermon, GalleryItem } from './types';

export const SERMONS: Sermon[] = ${JSON.stringify(sermons, null, 2)};

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(galleryItems, null, 2)};
`;
  };

  const handleCopyExportCode = () => {
    navigator.clipboard.writeText(generateVercelExportCode());
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 3000);
  };

  // 1. PIN LOCK SCREEN (LIGHT MODE EXECUTIVE STYLING)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-100 to-indigo-50/60 flex flex-col items-center justify-center p-6 select-none font-sans">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white border border-gray-200 rounded-[36px] p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-8"
        >
          <div className="w-16 h-16 rounded-3xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] uppercase font-bold tracking-widest border border-primary/20">
              {lang === 'en' ? 'RESTRICTED LEADERSHIP PORTAL' : 'የአገልግሎት አመራር መቆጣጠሪያ'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-wide">
              {lang === 'en' ? 'Executive Admin Lock' : 'የአስተዳዳሪ የይለፍ አዳራሽ'}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              {lang === 'en'
                ? 'Enter your secret admin password, SHA-256 key, or security PIN to access the Kingdom CRM and media management desk.'
                : 'የፍቅሩ መንግስት አጋሮችና ይዘቶች ማስተካከያ አዳራሽ ለመግባት ሚስጥራዊ የይለፍ ቃልዎን ወይም ቁጥርዎን ያስገቡ።'}
            </p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                maxLength={64}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Secret Password / PIN"
                className="w-full text-center font-mono sm:text-lg bg-gray-50 border border-gray-200 focus:border-primary text-gray-900 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
                autoFocus
              />
              <Lock className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            {pinError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-700 text-xs font-bold bg-red-50 border border-red-200 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{pinError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-container text-white font-sans font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-primary/15 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{lang === 'en' ? 'Unlock Executive Desk' : 'አዳራሹን ክፈት'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 flex justify-center">
            <button
              type="button"
              onClick={() => {
                if (onExit) onExit();
              }}
              className="text-xs text-gray-500 hover:text-primary font-bold flex items-center gap-2 transition-colors py-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Return to Public Website' : 'ወደ ዋናው ድረገጽ ተመለስ'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. ISOLATED EXECUTIVE DASHBOARD WORKSPACE (LIGHT MODE UNLOCKED)
  return (
    <div className="min-h-screen w-full bg-slate-50 text-gray-900 flex flex-col font-sans select-none pb-20">
      {/* Top Executive Header Console */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 px-6 sm:px-10 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center font-bold font-serif text-lg shadow-sm">
            👑
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
                Kingdom Executive Console
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-mono text-[9px] font-extrabold uppercase">
                Active & Secured
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-sans font-medium">
              {lang === 'en' ? 'Kingdom of His Love Gospel Ministry • Leadership Desk' : 'የፍቅሩ መንግስት ወንጌል አገልግሎት • የፓስተሮችና አጋሮች አስተዳደር'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-[10px] font-mono text-gray-600">
            <span>Base: <strong className="text-primary">{baseUrl}</strong></span>
            <span className="text-gray-300">|</span>
            <span>Path: <strong className="text-tertiary">{secretPath}</strong></span>
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              if (onExit) onExit();
            }}
            className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-red-50 hover:border-red-200 text-gray-700 hover:text-red-600 font-bold text-xs border border-gray-200 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Lock & Return to Website' : 'ውጣ (ወደ ድረገጽ)'}</span>
          </button>
        </div>
      </header>

      {/* Console Navigation Bar */}
      <nav className="bg-gray-100/70 border-b border-gray-200 px-6 sm:px-10 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setActiveSection('overview')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{lang === 'en' ? 'Overview & KPIs' : 'አጠቃላይ ማጠቃለያ'}</span>
          </button>

          <button
            onClick={() => setActiveSection('partners')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'partners'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <Award className={`w-4 h-4 ${activeSection === 'partners' ? 'text-amber-300' : 'text-amber-600'}`} />
            <span>{lang === 'en' ? `Partners CRM (${partners.length})` : `አጋሮች (${partners.length})`}</span>
          </button>

          <button
            onClick={() => setActiveSection('members')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'members'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <Users className={`w-4 h-4 ${activeSection === 'members' ? 'text-cyan-300' : 'text-cyan-700'}`} />
            <span>{lang === 'en' ? `Evangelists CRM (${members.length})` : `ወንጌላውያን (${members.length})`}</span>
          </button>

          <button
            onClick={() => setActiveSection('videos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'videos'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <Video className={`w-4 h-4 ${activeSection === 'videos' ? 'text-indigo-300' : 'text-indigo-700'}`} />
            <span>{lang === 'en' ? `Sermons & Videos (${sermons.length})` : `ስብከቶች (${sermons.length})`}</span>
          </button>

          <button
            onClick={() => setActiveSection('photos')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'photos'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <ImageIcon className={`w-4 h-4 ${activeSection === 'photos' ? 'text-emerald-300' : 'text-emerald-700'}`} />
            <span>{lang === 'en' ? `Gallery Photos (${galleryItems.length})` : `ፎቶዎች (${galleryItems.length})`}</span>
          </button>

          <button
            onClick={() => setActiveSection('export')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans font-bold text-xs transition-all cursor-pointer ${
              activeSection === 'export'
                ? 'bg-primary text-white shadow-md font-extrabold'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white'
            }`}
          >
            <ExternalLink className={`w-4 h-4 ${activeSection === 'export' ? 'text-purple-300' : 'text-purple-700'}`} />
            <span>{lang === 'en' ? 'Vercel Deployment Sync' : 'Vercel ማስተላለፊያ'}</span>
          </button>
        </div>
      </nav>

      {/* Main Console Workspace Area */}
      <main className="flex-1 px-6 sm:px-10 py-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
        {/* SECTION 1: OVERVIEW & EXECUTIVE KPI DASHBOARD */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-white via-indigo-50/50 to-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono font-bold uppercase tracking-widest">
                  {lang === 'en' ? 'Executive Leadership Command Desk' : 'የአገልግሎት አመራር ማዕከል'}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
                  {lang === 'en' ? 'Welcome, Minister Firaol' : 'እንኳን በደህና መጡ፣ ሚኒስተር ፊራኦል'}
                </h2>
                <p className="text-gray-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {lang === 'en'
                    ? 'Review real-time covenant partnerships, verify city evangelist callings, and publish universal TikTok and YouTube sermons right across your ministry network.'
                    : 'የአጋሮችን ቃል ኪዳን ይመልከቱ፣ በየከተማው ያሉ ወንጌላውያንን ያረጋግጡ፣ እንዲሁም አዳዲስ ስብከቶችን በ TikTok እና YouTube ለዓለም ያካፍሉ።'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    resetVideoForm();
                    setShowVideoModal(true);
                  }}
                  className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Post New Sermon' : 'አዲስ ስብከት ልቀቅ'}</span>
                </button>
                <button
                  onClick={() => setActiveSection('partners')}
                  className="px-5 py-3 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-sans font-bold text-xs uppercase tracking-wider transition-all border border-gray-200 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>{lang === 'en' ? 'Review Partners' : 'አጋሮችን ተመልከት'}</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                onClick={() => setActiveSection('partners')}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-primary/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                    {partners.filter(p=>p.status==='Active').length} Active
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                    {partners.length}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                    {lang === 'en' ? 'Covenant Partners' : 'የተመዘገቡ አጋሮች'}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-primary pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Manage Tiers & Banks' : 'ዝርዝሩን ይመልከቱ'}</span>
                  <span>→</span>
                </div>
              </div>

              <div
                onClick={() => setActiveSection('members')}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-tertiary/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-cyan-50 text-cyan-800 border border-cyan-200">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                    {members.filter(m=>m.status==='Approved').length} Approved
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-extrabold text-gray-900 group-hover:text-tertiary transition-colors">
                    {members.length}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                    {lang === 'en' ? 'City Evangelists' : 'ወንጌላውያንና አባላት'}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-tertiary pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Review Mission Cities' : 'ዝርዝሩን ይመልከቱ'}</span>
                  <span>→</span>
                </div>
              </div>

              <div
                onClick={() => setActiveSection('videos')}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-800 border border-indigo-200">
                    <Video className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                    TikTok + YouTube
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {sermons.length}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                    {lang === 'en' ? 'Video Teachings' : 'የተለጠፉ ስብከቶች'}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-indigo-600 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Post or Edit Media' : 'ስብከቶችን ያስተካክሉ'}</span>
                  <span>→</span>
                </div>
              </div>

              <div
                onClick={() => setActiveSection('photos')}
                className="bg-white p-6 rounded-3xl border border-gray-200/80 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
              >
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-mono text-[10px] font-bold">
                    Masonry Grid
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-extrabold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {galleryItems.length}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">
                    {lang === 'en' ? 'Gallery Photos' : 'የማዕከለ-ስዕላት ፎቶዎች'}
                  </p>
                </div>
                <div className="text-[11px] font-bold text-emerald-600 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span>{lang === 'en' ? 'Upload or Organize' : 'ፎቶዎችን ያስተካክሉ'}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: PARTNERS CRM DASHBOARD */}
        {activeSection === 'partners' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  {lang === 'en' ? 'Registered Monthly Partners CRM' : 'የተመዘገቡ የወር አጋሮች መቆጣጠሪያ'}
                </h2>
                <p className="text-gray-500 font-sans text-xs mt-0.5">
                  {lang === 'en' ? 'Filter supporters by tier, verify phone numbers, and coordinate covenant pledges.' : 'የአጋሮችን መረጃ በደረጃ ይለዩ፣ ያረጋግጡና በስልክ ያግኙ።'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Grid vs List View Toggle */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>

                <div className="relative flex-1 md:w-56">
                  <input
                    type="text"
                    value={partnerSearch}
                    onChange={(e) => setPartnerSearch(e.target.value)}
                    placeholder={lang === 'en' ? 'Search partner name, phone...' : 'በስም ወይም ስልክ ይፈልጉ...'}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-primary"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <select
                  value={partnerTierFilter}
                  onChange={(e) => setPartnerTierFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-primary focus:outline-none cursor-pointer"
                >
                  <option value="All">All Tiers ({partners.length})</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Diamond">Diamond</option>
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                </select>

                {/* PARTNERS EXPORT DROPDOWN */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPartnerExportMenu(!showPartnerExportMenu)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 hover:border-primary hover:text-primary shadow-sm text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-primary" />
                    <span>{lang === 'en' ? 'Export Data' : 'መረጃ ያውርዱ'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showPartnerExportMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showPartnerExportMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                          {lang === 'en' ? `Export ${getFilteredPartners().length} Partners` : `${getFilteredPartners().length} አጋሮች`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleExportData('excel', 'partners')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'Excel Spreadsheet' : 'በ ኤክሴል (Excel)'}</div>
                          <div className="text-[10px] font-normal text-gray-400">.xls tab-separated format</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportData('pdf', 'partners')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'PDF Document / Print' : 'በ ፒዲኤፍ (PDF Report)'}</div>
                          <div className="text-[10px] font-normal text-gray-400">Printable official sheet</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportData('csv', 'partners')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'Raw CSV Data File' : 'የ CSV መረጃ'}</div>
                          <div className="text-[10px] font-normal text-gray-400">Comma-separated values</div>
                        </div>
                      </button>

                      <div className="border-t border-gray-100 my-1 pt-1">
                        <button
                          type="button"
                          onClick={() => handleExportData('clipboard', 'partners')}
                          className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Clipboard className="w-4 h-4 text-gray-500 shrink-0" />
                          <span>{lang === 'en' ? 'Copy Table to Clipboard' : 'ወደ ክሊፕቦርድ ቅዳ'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXPORT TOAST NOTIFICATION */}
            {exportToast && (
              <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-gray-700 text-xs font-bold flex items-center gap-2 z-50 animate-bounce">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{exportToast}</span>
              </div>
            )}

            {/* PARTNERS LIST VIEW (TABLE) */}
            {viewMode === 'list' ? (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        <th className="py-3.5 px-6">Partner & Contact</th>
                        <th className="py-3.5 px-4">Tier</th>
                        <th className="py-3.5 px-4">Monthly Pledge & Bank</th>
                        <th className="py-3.5 px-4">City</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-800 font-sans">
                      {partners
                        .filter((p) => {
                          const matchTier = partnerTierFilter === 'All' || p.tier === partnerTierFilter;
                          const matchSearch = `${p.fullName} ${p.phone} ${p.city} ${p.email || ''}`.toLowerCase().includes(partnerSearch.toLowerCase());
                          return matchTier && matchSearch;
                        })
                        .map((partner) => (
                          <tr key={partner.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-bold text-gray-900 font-serif text-sm">{partner.fullName}</div>
                              <div className="text-gray-500 font-mono text-[11px] flex items-center gap-2 mt-0.5">
                                <span>{partner.phone}</span>
                                {partner.email && <span className="text-gray-300">|</span>}
                                {partner.email && <span className="truncate max-w-[140px]">{partner.email}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                                partner.tier === 'Platinum'
                                  ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                  : partner.tier === 'Diamond'
                                  ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                                  : partner.tier === 'Gold'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-slate-100 text-slate-800 border border-slate-300'
                              }`}>
                                {partner.tier}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <div className="font-bold text-primary">{partner.monthlyAmountRange}</div>
                              <div className="text-[11px] text-gray-500">Bank: <strong className="text-gray-900">{partner.paymentMethod}</strong></div>
                            </td>
                            <td className="py-4 px-4 font-bold text-gray-700">{partner.city}</td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                                partner.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                              }`}>
                                {partner.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-mono text-gray-400 text-[11px]">{partner.dateRegistered}</td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {updatePartnerStatus && (
                                  <button
                                    onClick={() => updatePartnerStatus(partner.id, partner.status === 'Active' ? 'Pending' : 'Active')}
                                    className="px-3 py-1 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all cursor-pointer border border-gray-200 text-[11px]"
                                  >
                                    {partner.status === 'Active' ? 'Set Pending' : 'Approve Active'}
                                  </button>
                                )}
                                {deletePartner && (
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Delete partner record for ${partner.fullName}?`)) deletePartner(partner.id);
                                    }}
                                    className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* PARTNERS GRID VIEW (CARDS) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {partners
                  .filter((p) => {
                    const matchTier = partnerTierFilter === 'All' || p.tier === partnerTierFilter;
                    const matchSearch = `${p.fullName} ${p.phone} ${p.city} ${p.email || ''}`.toLowerCase().includes(partnerSearch.toLowerCase());
                    return matchTier && matchSearch;
                  })
                  .map((partner) => (
                    <div key={partner.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest ${
                              partner.tier === 'Platinum'
                                ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                                : partner.tier === 'Diamond'
                                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300'
                                : partner.tier === 'Gold'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : 'bg-slate-100 text-slate-800 border border-slate-300'
                            }`}>
                              {partner.tier} Partner
                            </span>
                            <h4 className="font-serif text-lg font-bold text-gray-900 mt-2.5">{partner.fullName}</h4>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            partner.status === 'Active' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}>
                            {partner.status}
                          </span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 text-xs">
                          <div className="font-bold text-primary text-sm">{partner.monthlyAmountRange}</div>
                          <div className="text-gray-500">Transfer Bank: <strong className="text-gray-900">{partner.paymentMethod}</strong></div>
                        </div>

                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-mono font-bold text-gray-900">{partner.phone}</span>
                          </div>
                          {partner.email && (
                            <div className="flex items-center gap-2.5 truncate">
                              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                              <span className="text-gray-600">{partner.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                            <span>{partner.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs">
                        <span className="text-gray-400 text-[10px] font-mono">Date: {partner.dateRegistered}</span>
                        <div className="flex items-center gap-2">
                          {updatePartnerStatus && (
                            <button
                              onClick={() => updatePartnerStatus(partner.id, partner.status === 'Active' ? 'Pending' : 'Active')}
                              className="px-3.5 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all cursor-pointer border border-gray-200 text-xs"
                            >
                              {partner.status === 'Active' ? 'Set Pending' : 'Approve Active'}
                            </button>
                          )}
                          {deletePartner && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete partner record for ${partner.fullName}?`)) deletePartner(partner.id);
                              }}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: EVANGELISTS & MEMBERS CRM DASHBOARD */}
        {activeSection === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  {lang === 'en' ? 'Registered Evangelists & Ministry Members' : 'የተመዘገቡ ወንጌላውያንና የአገልግሎት አባላት'}
                </h2>
                <p className="text-gray-500 font-sans text-xs mt-0.5">
                  {lang === 'en' ? 'Believers called to preach and serve across different cities and mission towns.' : 'በየከተማው ወንጌልን ለማብሰርና ለማገልገል የተመዘገቡ አባላት።'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Grid vs List View Toggle */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-tertiary shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      viewMode === 'list' ? 'bg-white text-tertiary shadow-sm' : 'text-gray-500 hover:text-gray-900'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>

                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    placeholder={lang === 'en' ? 'Search evangelist, city...' : 'በስም ወይም ከተማ ይፈልጉ...'}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs focus:outline-none focus:border-tertiary"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* EVANGELISTS EXPORT DROPDOWN */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowMemberExportMenu(!showMemberExportMenu)}
                    className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-800 hover:border-tertiary hover:text-tertiary shadow-sm text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-tertiary" />
                    <span>{lang === 'en' ? 'Export Data' : 'መረጃ ያውርዱ'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMemberExportMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {showMemberExportMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-2 border-b border-gray-100 mb-1">
                        <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">
                          {lang === 'en' ? `Export ${getFilteredMembers().length} Evangelists` : `${getFilteredMembers().length} ወንጌላውያን`}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleExportData('excel', 'members')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'Excel Spreadsheet' : 'በ ኤክሴል (Excel)'}</div>
                          <div className="text-[10px] font-normal text-gray-400">.xls tab-separated format</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportData('pdf', 'members')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'PDF Document / Print' : 'በ ፒዲኤፍ (PDF Report)'}</div>
                          <div className="text-[10px] font-normal text-gray-400">Printable official sheet</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleExportData('csv', 'members')}
                        className="w-full px-3 py-2.5 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div>{lang === 'en' ? 'Raw CSV Data File' : 'የ CSV መረጃ'}</div>
                          <div className="text-[10px] font-normal text-gray-400">Comma-separated values</div>
                        </div>
                      </button>

                      <div className="border-t border-gray-100 my-1 pt-1">
                        <button
                          type="button"
                          onClick={() => handleExportData('clipboard', 'members')}
                          className="w-full px-3 py-2 rounded-xl text-left text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <Clipboard className="w-4 h-4 text-gray-500 shrink-0" />
                          <span>{lang === 'en' ? 'Copy Table to Clipboard' : 'ወደ ክሊፕቦርድ ቅዳ'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* MEMBERS LIST VIEW (TABLE) */}
            {viewMode === 'list' ? (
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80 border-b border-gray-200 text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider">
                        <th className="py-3.5 px-6">Evangelist & Contact</th>
                        <th className="py-3.5 px-4">Ministry Calling</th>
                        <th className="py-3.5 px-4">Mission City</th>
                        <th className="py-3.5 px-6">Statement Snippet</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Date</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-xs text-gray-800 font-sans">
                      {members
                        .filter((m) => `${m.fullName} ${m.city} ${m.ministryArea} ${m.phone} ${m.statement || ''}`.toLowerCase().includes(memberSearch.toLowerCase()))
                        .map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-4 px-6">
                              <div className="font-bold text-gray-900 font-serif text-sm">{member.fullName}</div>
                              <div className="text-gray-500 font-mono text-[11px] flex items-center gap-2 mt-0.5">
                                <span className="text-tertiary font-bold">{member.phone}</span>
                                {member.email && <span className="text-gray-300">|</span>}
                                {member.email && <span className="truncate max-w-[140px]">{member.email}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-100 text-cyan-900 border border-cyan-300">
                                {member.ministryArea}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-bold text-primary">{member.city}</td>
                            <td className="py-4 px-6 italic text-gray-600 max-w-xs truncate font-serif">
                              "{member.statement}"
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 w-max">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Active Evangelist</span>
                              </span>
                            </td>
                            <td className="py-4 px-4 font-mono text-gray-400 text-[11px]">{member.dateRegistered}</td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {deleteMember && (
                                  <button
                                    onClick={() => {
                                      if (window.confirm(`Delete evangelist record for ${member.fullName}?`)) deleteMember(member.id);
                                    }}
                                    className="p-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200"
                                    title="Delete Record"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* MEMBERS GRID VIEW (CARDS) - NO APPROVAL TOGGLE REQUIRED */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {members
                  .filter((m) => `${m.fullName} ${m.city} ${m.ministryArea} ${m.phone} ${m.statement || ''}`.toLowerCase().includes(memberSearch.toLowerCase()))
                  .map((member) => (
                    <div key={member.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-100 text-cyan-900 border border-cyan-300">
                              {member.ministryArea}
                            </span>
                            <h4 className="font-serif text-lg font-bold text-gray-900 mt-2.5">{member.fullName}</h4>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active Evangelist</span>
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs italic text-gray-800 leading-relaxed font-serif">
                          "{member.statement}"
                        </div>

                        <div className="space-y-2 text-xs text-gray-700">
                          <div className="flex items-center gap-2.5">
                            <Phone className="w-4 h-4 text-tertiary shrink-0" />
                            <span className="font-mono font-bold text-gray-900">{member.phone}</span>
                          </div>
                          {member.email && (
                            <div className="flex items-center gap-2.5 truncate">
                              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                              <span className="text-gray-600">{member.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2.5">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span className="font-bold text-primary">Mission City: {member.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs">
                        <span className="text-gray-400 text-[10px] font-mono">Date: {member.dateRegistered}</span>
                        <div className="flex items-center gap-2">
                          {deleteMember && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete member record for ${member.fullName}?`)) deleteMember(member.id);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200 font-bold text-xs flex items-center gap-1.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 4: VIDEOS & SERMONS MANAGEMENT */}
        {activeSection === 'videos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {lang === 'en' ? 'Video Sermons (TikTok & YouTube)' : 'የቪዲዮ ስብከቶች ማስተካከያ'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {lang === 'en' ? 'Post new video teachings or edit existing titles right here.' : 'አዳዲስ ስብከቶችን ለመለጠፍ ወይም ለማስተካከል ያገለግላል።'}
                </p>
              </div>
              <button
                onClick={() => {
                  resetVideoForm();
                  setShowVideoModal(true);
                }}
                className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                {lang === 'en' ? 'Post New Video' : 'አዲስ ቪዲዮ ልቀቅ'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sermons.map((sermon) => (
                <div key={sermon.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 relative">
                      <img src={sermon.coverUrl} alt="Cover" className="w-full h-full object-cover" />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-black/80 text-white text-[9px] font-bold rounded-full">
                        {sermon.category}
                      </span>
                    </div>
                    <div className="space-y-1.5 overflow-hidden">
                      <h4 className="font-serif font-bold text-sm text-gray-900 truncate">
                        {lang === 'en' ? sermon.title.en : sermon.title.am}
                      </h4>
                      <p className="text-xs text-gray-600 font-sans">
                        Speaker: <strong className="text-primary">{lang === 'en' ? sermon.speaker.en : sermon.speaker.am}</strong>
                      </p>
                      <p className="text-[11px] text-gray-400 font-mono">Date: {sermon.date.en}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 text-xs">
                    <button
                      onClick={() => handleEditVideoClick(sermon)}
                      className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-gray-200"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete video "${sermon.title.en}"?`)) {
                          deleteSermon(sermon.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: GALLERY PHOTOS MANAGEMENT */}
        {activeSection === 'photos' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">
                  {lang === 'en' ? 'Gallery Masonry Photos' : 'የማዕከለ-ስዕላት ፎቶዎች'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {lang === 'en' ? 'Upload new gallery photos or organize pictures across categories.' : 'አዳዲስ ፎቶዎችን ለመለጠፍ ወይም ለማስተካከል ያገለግላል።'}
                </p>
              </div>
              <button
                onClick={() => {
                  resetPhotoForm();
                  setShowPhotoModal(true);
                }}
                className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                {lang === 'en' ? 'Add New Photo' : 'አዲስ ፎቶ መለጠፍ'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative">
                    <img src={item.coverUrl} alt="Gallery item" className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-black/80 text-emerald-400 text-[10px] font-bold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xs text-gray-900 truncate">
                      {lang === 'en' ? item.title.en : item.title.am}
                    </h4>
                  </div>
                  <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleEditPhotoClick(item)}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all cursor-pointer border border-gray-200"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-primary" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this gallery photo?')) {
                          deleteGalleryItem(item.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-all cursor-pointer border border-red-200"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: VERCEL DEPLOYMENT SYNC */}
        {activeSection === 'export' && (
          <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 max-w-3xl">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-purple-100 border border-purple-200 rounded-2xl text-purple-700 shrink-0">
                <ExternalLink className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  {lang === 'en' ? 'Vercel Static Deployment Sync Generator' : 'የ Vercel ማስተላለፊያ ኮድ ማመንጫ'}
                </h2>
                <p className="text-gray-600 font-sans text-sm mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Since Vercel serves static bundles straight from your GitHub repository, any photos or videos you create here in Admin live instantly across your browser. When you are ready to make these changes permanent across the entire world, copy the generated code below and replace your src/data.ts file right before git pushing!'
                    : 'የለጠፏቸው ቪዲዮዎችና ፎቶዎች በ Vercel ላይ ለዘላለም እንዲቀመጡ ከታች ያለውን አዝራር በመጫን ኮዱን ኮፒ አድርገው በ src/data.ts ውስጥ ይተኩት!'}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="font-sans text-xs text-gray-700 font-medium">
                  {lang === 'en'
                    ? `Contains ${sermons.length} video sermons and ${galleryItems.length} gallery items ready for Vercel.`
                    : `${sermons.length} ስብከቶች እና ${galleryItems.length} ፎቶዎች ዝግጁ ናቸው።`}
                </span>
              </div>
              <button
                onClick={handleCopyExportCode}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0"
              >
                {copiedExport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedExport ? (lang === 'en' ? 'Copied to Clipboard!' : 'ኮፒ ተደርጓል!') : (lang === 'en' ? 'Copy data.ts Code' : 'ኮዱን ኮፒ አድርግ')}</span>
              </button>
            </div>

            <div className="relative">
              <pre className="p-5 bg-gray-900 rounded-2xl border border-gray-800 text-[11px] font-mono text-gray-100 overflow-x-auto max-h-96 leading-relaxed select-all">
                {generateVercelExportCode()}
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* MODALS FOR VIDEO & PHOTO CRUD */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-[32px] p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl text-gray-900"
            >
              <h3 className="font-serif text-xl font-bold text-gray-900">
                {editingSermonId ? 'Edit Video Sermon' : 'Post New Video Sermon (TikTok / YouTube)'}
              </h3>

              <form onSubmit={handleSaveVideo} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={videoTitleEn}
                      onChange={(e) => setVideoTitleEn(e.target.value)}
                      placeholder="The Power of Covenant"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Title (Amharic)</label>
                    <input
                      type="text"
                      value={videoTitleAm}
                      onChange={(e) => setVideoTitleAm(e.target.value)}
                      placeholder="የቃል ኪዳን ኃይል"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Speaker (English)</label>
                    <input
                      type="text"
                      value={videoSpeakerEn}
                      onChange={(e) => setVideoSpeakerEn(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={videoCategory}
                      onChange={(e) => setVideoCategory(e.target.value as any)}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary cursor-pointer font-bold"
                    >
                      <option value="Grace">Grace (ጸጋ)</option>
                      <option value="Salvation">Salvation (ደኅንነት)</option>
                      <option value="Healing">Healing (ፈውስ)</option>
                      <option value="Worship">Worship (አምልኮ)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Universal Video URL (TikTok or YouTube link)</label>
                  <input
                    type="text"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    placeholder="https://vt.tiktok.com/... or https://youtu.be/..."
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-primary font-mono text-sm focus:outline-none focus:border-primary focus:bg-white"
                  />
                  <p className="text-[11px] text-gray-500 mt-1">
                    Paste any standard link or TikTok short link (`vt.tiktok.com/...`). Automatically converted!
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs uppercase shadow-md cursor-pointer"
                  >
                    {editingSermonId ? 'Update Sermon' : 'Publish Sermon'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white border border-gray-200 rounded-[32px] p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl text-gray-900"
            >
              <h3 className="font-serif text-xl font-bold text-gray-900">
                {editingPhotoId ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
              </h3>

              <form onSubmit={handleSavePhoto} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Photo Caption (English) *</label>
                  <input
                    type="text"
                    required
                    value={photoTitleEn}
                    onChange={(e) => setPhotoTitleEn(e.target.value)}
                    placeholder="Evangelism Conference in Hawassa"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Select Photo Asset</label>
                  <select
                    value={photoCover}
                    onChange={(e) => setPhotoCover(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="/gallery/IMG_0776.JPG">Minister Firaol Preaching (IMG_0776.JPG)</option>
                    <option value="/gallery/IMG_1503.JPG">Sacred Worship Encounter (IMG_1503.JPG)</option>
                    <option value="/gallery/IMG_1507.JPG">Kingdom Fellowship Altar (IMG_1507.JPG)</option>
                    <option value="/gallery/IMG_1517.JPG">Apostolic Teaching (IMG_1517.JPG)</option>
                    <option value="/gallery/IMG_1518.JPG">Glory & Praise Sanctuary (IMG_1518.JPG)</option>
                    <option value="/gallery/IMG_2430 (1).JPG">Youth Awakening (IMG_2430 (1).JPG)</option>
                    <option value="/gallery/IMG_3649.JPG">Divine Healing & Intercession (IMG_3649.JPG)</option>
                    <option value="/gallery/media__1783860205220.jpg">Photo 1 (media__...220.jpg)</option>
                    <option value="/gallery/media__1783860205225.jpg">Photo 2 (media__...225.jpg)</option>
                    <option value="/gallery/media__1783860205227.jpg">Photo 3 (media__...227.jpg)</option>
                    <option value="/gallery/media__1783860205238.jpg">Photo 4 (media__...238.jpg)</option>
                    <option value="/gallery/media__1783860231676.jpg">Photo 5 (media__...676.jpg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="Worship">Worship (አምልኮ)</option>
                    <option value="Fellowship">Fellowship (ሕብረት)</option>
                    <option value="Baptism">Baptism (ጥምቀት)</option>
                    <option value="Youth">Youth (ወጣቶች)</option>
                    <option value="Children">Children (ሕጻናት)</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowPhotoModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-xs uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs uppercase shadow-md cursor-pointer"
                  >
                    {editingPhotoId ? 'Update Photo' : 'Save Photo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
