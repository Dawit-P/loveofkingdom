import { Language } from '../types';
import { Mail, Phone, Globe, ChevronRight } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  lang: Language;
}

export default function Footer({ setCurrentTab, lang }: FooterProps) {
  const translations = {
    en: {
      aboutDesc: 'Spreading the message of divine love and grace to the ends of the earth. Dedicated to spiritual growth and community empowerment.',
      ministries: 'Ministries',
      youth: 'Youth Ministry',
      worship: 'Worship Team',
      outreach: 'Outreach Program',
      bible: 'Bible Studies',
      quickLinks: 'Quick Links',
      privacy: 'Privacy Policy',
      contact: 'Contact Us',
      faq: 'FAQ',
      donate: 'Donate',
      copyright: '© 2024 Kingdom of His Love Gospel Ministry. All Rights Reserved.',
    },
    am: {
      aboutDesc: 'የመለኮታዊ ፍቅር እና ጸጋን መልእክት እስከ ምድር ዳርቻ ማድረስ። ለልብ መንፈሳዊ እድገት እና ለማህበረሰብ ማብቃት የተሰጠ አገልግሎት።',
      ministries: 'አገልግሎቶች',
      youth: 'የወጣቶች አገልግሎት',
      worship: 'የአምልኮ ቡድን',
      outreach: 'የረድኤት ፕሮግራም',
      bible: 'የመጽሐፍ ቅዱስ ጥናት',
      quickLinks: 'አቋራጭ ሊንኮች',
      privacy: 'የግላዊነት ፖሊሲ',
      contact: 'ያግኙን',
      faq: 'ተደጋጋሚ ጥያቄዎች',
      donate: 'ይደግፉ',
      copyright: '© 2024 የፍቅሩ መንግስት ወንጌል አገልግሎት። መብቱ በሕግ የተጠበቀ ነው።',
    }
  };

  const text = translations[lang];

  return (
    <footer id="main-footer" className="bg-primary text-white w-full px-6 md:px-12 py-16 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* About Column */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-serif text-2xl font-bold mb-6 text-white tracking-wide">
            የፍቅሩ መንግስት
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-md mb-8">
            {text.aboutDesc}
          </p>
          <div className="flex gap-3">
            <a 
              href="#" 
              aria-label="Website Link"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-tertiary-container transition-all"
            >
              <Globe className="w-4 h-4 text-white" />
            </a>
            <a 
              href="mailto:Firaoltesfahun50@gmail.com" 
              aria-label="Email Address Link"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-tertiary-container transition-all"
            >
              <Mail className="w-4 h-4 text-white" />
            </a>
            <a 
              href="tel:+251923359640" 
              aria-label="Phone Number Link"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 hover:text-tertiary-container transition-all"
            >
              <Phone className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Ministries Column */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-tertiary-fixed mb-6">
            {text.ministries}
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {[text.youth, text.worship, text.outreach, text.bible].map((ministry, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); setCurrentTab('about'); }}
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{ministry}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-tertiary-fixed mb-6">
            {text.quickLinks}
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { label: text.privacy, tab: 'about' },
              { label: text.contact, tab: 'contact' },
              { label: text.faq, tab: 'contact' },
              { label: text.donate, tab: 'donate' }
            ].map((link, i) => (
              <li key={i}>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(link.tab);
                  }}
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full pt-8 border-t border-white/10 text-center">
        <p className="text-gray-400 text-xs">
          {text.copyright}
        </p>
      </div>
    </footer>
  );
}
