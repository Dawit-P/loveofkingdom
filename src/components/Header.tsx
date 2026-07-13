import { Language } from '../types';
import { Menu, X, Globe, Heart, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export default function Header({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  drawerOpen,
  setDrawerOpen,
}: HeaderProps) {
  const tabs = [
    { id: 'home', en: 'Home', am: 'ዋና ገጽ' },
    { id: 'about', en: 'About Us', am: 'ስለ እኛ' },
    { id: 'sermons', en: 'Sermons', am: 'ስብከቶች' },
    { id: 'gallery', en: 'Gallery', am: 'ማዕከለ-ስዕላት' },
    { id: 'prayer', en: 'Prayer Requests', am: 'የጸሎት ጥያቄ' },
    { id: 'donate', en: 'Donate', am: 'ይደግፉ' },
    { id: 'membership', en: 'Partners & Members', am: 'አጋርና አባል' },
    { id: 'contact', en: 'Contact Us', am: 'ያግኙን' },
  ];

  return (
    <>
      {/* Top Header */}
      <header id="top-header" className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl shadow-sm shadow-primary/5 flex justify-between items-center px-6 md:px-12 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button
            id="drawer-toggle-btn"
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="p-2 hover:bg-gray-100 rounded-full md:hidden text-primary transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex flex-col cursor-pointer group"
          >
            <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-wide group-hover:text-tertiary transition-colors">
              የፍቅሩ መንግሥት
            </span>
            <span className="font-sans text-[10px] tracking-[0.15em] font-bold text-tertiary uppercase hidden sm:block">
              Kingdom of His Love
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-6 lg:gap-8">
          {tabs.map((tab) => (
            <button
              id={`nav-tab-${tab.id}`}
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`text-xs font-sans font-bold tracking-widest uppercase transition-all py-1.5 border-b-2 hover:text-tertiary ${
                currentTab === tab.id
                  ? 'border-tertiary text-tertiary'
                  : 'border-transparent text-gray-500 hover:border-gray-200'
              }`}
            >
              {lang === 'en' ? tab.en : tab.am}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            id="language-switch-btn"
            onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 text-primary font-sans font-bold text-xs hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'አማ' : 'EN'}</span>
          </button>

          {/* Quick Donate Button */}
          <button
            id="header-donate-btn"
            onClick={() => setCurrentTab('donate')}
            className={`hidden sm:flex items-center gap-2 bg-primary text-white hover:bg-primary-container px-5 py-2 rounded-full font-sans font-bold text-xs shadow-md hover:shadow-primary/20 transition-all duration-300 ${
              currentTab === 'donate' ? 'ring-2 ring-tertiary bg-primary-container' : ''
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>{lang === 'en' ? 'Donate' : 'ይደግፉ'}</span>
          </button>
        </div>
      </header>

      {/* Side Navigation Drawer (Mobile) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay background */}
            <motion.div
              id="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 z-[99] md:hidden transition-opacity"
            />

            {/* Slide-out drawer content */}
            <motion.div
              id="drawer-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-[100] w-72 bg-white shadow-2xl flex flex-col md:hidden border-r border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="font-serif text-lg font-bold text-primary leading-tight">የፍቅሩ መንግሥት</h2>
                  <p className="font-sans text-[9px] text-tertiary font-bold uppercase tracking-wider">Kingdom of His Love</p>
                </div>
                <button
                  id="drawer-close-btn"
                  onClick={() => setDrawerOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links inside Drawer */}
              <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
                {tabs.map((tab) => (
                  <button
                    id={`drawer-tab-${tab.id}`}
                    key={tab.id}
                    onClick={() => {
                      setCurrentTab(tab.id);
                      setDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-sans font-bold text-sm tracking-wide transition-all ${
                      currentTab === tab.id
                        ? 'bg-secondary-container text-on-secondary-container font-extrabold shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <span>{lang === 'en' ? tab.en : tab.am}</span>
                    <span className="text-[10px] opacity-40 uppercase font-mono">{tab.id}</span>
                  </button>
                ))}
              </nav>

              {/* Bottom Quick Actions inside Drawer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-3">
                <button
                  id="drawer-lang-btn"
                  onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200 text-xs font-bold text-primary hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-tertiary" />
                    <span>Language / ቋንቋ</span>
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px]">
                    {lang === 'en' ? 'አማርኛ' : 'English'}
                  </span>
                </button>

                <button
                  id="drawer-donate-btn"
                  onClick={() => {
                    setCurrentTab('donate');
                    setDrawerOpen(false);
                  }}
                  className="w-full py-3 bg-primary text-white hover:bg-primary-container rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-primary/10 transition-all duration-300"
                >
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>{lang === 'en' ? 'Donate / Give' : 'መዋጮ / ይደግፉ'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
