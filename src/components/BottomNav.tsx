import { Language } from '../types';
import { Home, PlaySquare, Info, Heart } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
}

export default function BottomNav({ currentTab, setCurrentTab, lang }: BottomNavProps) {
  const tabs = [
    { id: 'home', en: 'Home', am: 'ቤት', icon: Home },
    { id: 'sermons', en: 'Sermons', am: 'ስብከቶች', icon: PlaySquare },
    { id: 'about', en: 'About Us', am: 'ስለ እኛ', icon: Info },
    { id: 'donate', en: 'Donate', am: 'ይደግፉ', icon: Heart },
  ];

  return (
    <nav 
      id="bottom-mobile-nav" 
      className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,32,69,0.05)] rounded-t-2xl pb-safe"
    >
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            id={`bottom-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'bg-primary text-white scale-105 px-4 font-bold'
                : 'text-gray-500 hover:text-primary active:scale-95'
            }`}
          >
            <IconComponent className={`w-5 h-5 ${isActive ? 'fill-current text-white' : ''}`} />
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider mt-1">
              {lang === 'en' ? tab.en : tab.am}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
