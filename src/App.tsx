import { useState, useEffect } from 'react';
import { Language, Sermon } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import AboutTab from './components/AboutTab';
import SermonsTab from './components/SermonsTab';
import GalleryTab from './components/GalleryTab';
import PrayerRequestsTab from './components/PrayerRequestsTab';
import DonateTab from './components/DonateTab';
import ContactTab from './components/ContactTab';
import MembershipTab from './components/MembershipTab';
import AdminTab from './components/AdminTab';
import { useMediaState } from './hooks/useMediaState';
import { useMembershipState } from './hooks/useMembershipState';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, BookOpen, Clock, Calendar, User } from 'lucide-react';

export default function App() {
  const secretPath = import.meta.env.VITE_ADMIN_SECRET_PATH || '/adminsecretfiraol';

  const [currentTab, setCurrentTab] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes(secretPath.toLowerCase())) {
      return 'admin';
    }
    return 'home';
  });
  const [lang, setLang] = useState<Language>('en');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);
  const [membershipMode, setMembershipMode] = useState<'partner' | 'member'>('partner');

  const handleNavigateToMembership = (mode: 'partner' | 'member') => {
    setMembershipMode(mode);
    setCurrentTab('membership');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const {
    sermons,
    galleryItems,
    addSermon,
    updateSermon,
    deleteSermon,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    resetToDefaults,
  } = useMediaState();

  const {
    partners,
    members,
    addPartner,
    updatePartnerStatus,
    deletePartner,
    addMember,
    updateMemberStatus,
    deleteMember,
  } = useMembershipState();

  // Scroll to top on tab change for a seamless SPA experience
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  useEffect(() => {
    const handleUrlCheck = () => {
      if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().includes(secretPath.toLowerCase())) {
        setCurrentTab('admin');
      }
    };
    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    return () => window.removeEventListener('popstate', handleUrlCheck);
  }, [secretPath]);

  const handlePlaySermon = (sermon: Sermon) => {
    setActiveSermon(sermon);
  };

  // Render the correct tab content
  const renderTabContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeTab
            lang={lang}
            setCurrentTab={setCurrentTab}
            sermons={sermons}
            onPlaySermon={handlePlaySermon}
            onNavigateToMembership={handleNavigateToMembership}
          />
        );
      case 'about':
        return <AboutTab lang={lang} />;
      case 'sermons':
        return (
          <SermonsTab
            lang={lang}
            sermons={sermons}
            onPlaySermon={handlePlaySermon}
          />
        );
      case 'gallery':
        return <GalleryTab lang={lang} galleryItems={galleryItems} />;
      case 'prayer':
        return <PrayerRequestsTab lang={lang} />;
      case 'donate':
        return <DonateTab lang={lang} />;
      case 'membership':
        return <MembershipTab lang={lang} addPartner={addPartner} addMember={addMember} initialMode={membershipMode} />;
      case 'contact':
        return <ContactTab lang={lang} />;
      case 'admin':
        return (
          <AdminTab
            lang={lang}
            sermons={sermons}
            galleryItems={galleryItems}
            addSermon={addSermon}
            updateSermon={updateSermon}
            deleteSermon={deleteSermon}
            addGalleryItem={addGalleryItem}
            updateGalleryItem={updateGalleryItem}
            deleteGalleryItem={deleteGalleryItem}
            resetToDefaults={resetToDefaults}
            onExit={() => {
              if (typeof window !== 'undefined') {
                window.history.pushState({}, '', '/');
              }
              setCurrentTab('home');
            }}
            partners={partners}
            members={members}
            updatePartnerStatus={updatePartnerStatus}
            deletePartner={deletePartner}
            updateMemberStatus={updateMemberStatus}
            deleteMember={deleteMember}
          />
        );
      default:
        return (
          <HomeTab
            lang={lang}
            setCurrentTab={setCurrentTab}
            sermons={sermons}
            onPlaySermon={handlePlaySermon}
          />
        );
    }
  };

  const t = {
    en: {
      transcriptLabel: 'Scripture Transcript & Contemplation',
      readFocus: 'Read Scripture Focus',
      closeModal: 'Close media player',
    },
    am: {
      transcriptLabel: 'የቅዱሳት መጻሕፍት ትርጉም እና ማሰላሰያ',
      readFocus: 'የመጽሐፍ ቅዱስ ጥቅስን ያንብቡ',
      closeModal: 'ማጫወቻውን ዝጋ',
    }
  }[lang];

  if (currentTab === 'admin') {
    return (
      <div id="admin-isolated-root" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-none antialiased">
        <AdminTab
          lang={lang}
          sermons={sermons}
          galleryItems={galleryItems}
          addSermon={addSermon}
          updateSermon={updateSermon}
          deleteSermon={deleteSermon}
          addGalleryItem={addGalleryItem}
          updateGalleryItem={updateGalleryItem}
          deleteGalleryItem={deleteGalleryItem}
          resetToDefaults={resetToDefaults}
          onExit={() => {
            if (typeof window !== 'undefined') {
              window.history.pushState({}, '', '/');
            }
            setCurrentTab('home');
          }}
          partners={partners}
          members={members}
          updatePartnerStatus={updatePartnerStatus}
          deletePartner={deletePartner}
          updateMemberStatus={updateMemberStatus}
          deleteMember={deleteMember}
        />
      </div>
    );
  }

  return (
    <div id="app-root" className="min-h-screen bg-background flex flex-col font-sans select-none antialiased text-gray-800">
      
      {/* Universal Sticky Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />

      {/* Main Page Area */}
      <main id="main-content" className="flex-grow pt-16 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Footer */}
      <Footer setCurrentTab={setCurrentTab} lang={lang} />

      {/* Universal Mobile Bottom Tab Navigation */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} lang={lang} />

      {/* Sermon Media Lightbox & Study Guide Modal */}
      <AnimatePresence>
        {activeSermon && (
          <motion.div
            id="sermon-player-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 z-[210] flex items-center justify-center p-4 md:p-6 backdrop-blur-md"
          >
            <motion.div
              id="sermon-player-modal"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative border border-gray-100"
            >
              {/* Close Button top corner */}
              <button
                id="sermon-modal-close-btn"
                onClick={() => setActiveSermon(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 transition-colors z-20 cursor-pointer"
                aria-label={t.closeModal}
              >
                <X className="w-5 h-5" />
              </button>

               {/* Scrollable container for video & transcripts */}
              <div className="overflow-y-auto flex-1 pr-1 scrollbar-thin">
                {/* 1. Video Player Slot */}
                <div className={`${activeSermon.videoUrl?.includes('tiktok.com') ? 'bg-black/95 py-6 flex justify-center' : 'aspect-video w-full bg-black relative'}`}>
                  {activeSermon.videoUrl ? (
                    activeSermon.videoUrl.includes('tiktok.com') ? (
                      <div className="aspect-[9/16] w-[325px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                        <iframe
                          id="sermon-video-iframe"
                          src={activeSermon.videoUrl}
                          title="Sermon Video Player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <iframe
                        id="sermon-video-iframe"
                        src={activeSermon.videoUrl}
                        title="Sermon Video Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/40 font-sans gap-2 p-10 text-center">
                      <Play className="w-12 h-12 stroke-1 animate-pulse" />
                      <p className="text-sm">Video feed preparing in local archives...</p>
                    </div>
                  )}
                </div>

                {/* 2. Text / Scripture / Reflection area */}
                <div className="p-6 md:p-10 space-y-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 font-sans font-medium">
                      <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
                        {activeSermon.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-tertiary" />
                        <span className="font-bold text-gray-600">
                          {lang === 'en' ? activeSermon.speaker.en : activeSermon.speaker.am}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? activeSermon.date.en : activeSermon.date.am}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{activeSermon.duration}</span>
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                      {lang === 'en' ? activeSermon.title.en : activeSermon.title.am}
                    </h2>
                  </div>

                  {/* Scripture focus callout */}
                  {activeSermon.scripture && (
                    <div className="bg-secondary/5 rounded-2xl p-4 border border-secondary/15 flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-secondary uppercase tracking-wider font-sans">
                          {t.readFocus}
                        </h4>
                        <p className="text-sm font-serif font-bold text-primary italic">
                          {lang === 'en' ? activeSermon.scripture.en : activeSermon.scripture.am}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Sermon transcription content */}
                  <div className="space-y-3 border-t border-gray-100 pt-6">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-tertiary">
                      {t.transcriptLabel}
                    </h4>
                    <p className="text-gray-700 font-sans text-xs md:text-sm leading-relaxed p-4 bg-gray-50 rounded-2xl">
                      {activeSermon.content
                        ? (lang === 'en' ? activeSermon.content.en : activeSermon.content.am)
                        : (lang === 'en' ? activeSermon.summary.en : activeSermon.summary.am)
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Quick close action footer inside modal */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                <button
                  id="sermon-modal-close-footer-btn"
                  onClick={() => setActiveSermon(null)}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-sans font-bold cursor-pointer transition-colors"
                >
                  Close Media Room
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
