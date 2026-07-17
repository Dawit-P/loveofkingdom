import { useState, FormEvent, useEffect } from 'react';
import { Language, PartnerTier, MinistryArea, Partner, Member } from '../types';
import { Heart, Users, ShieldCheck, CheckCircle, Sparkles, Send, Award, MapPin, Phone, Mail, Building2, BookOpen, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MembershipTabProps {
  lang: Language;
  addPartner: (partner: Omit<Partner, 'id' | 'dateRegistered' | 'status'>) => Partner;
  addMember: (member: Omit<Member, 'id' | 'dateRegistered' | 'status'>) => Member;
  initialMode?: 'partner' | 'member';
  partners?: Partner[];
  members?: Member[];
  onNavigateHome?: () => void;
}

type RegistrationMode = 'partner' | 'member';

export default function MembershipTab({
  lang,
  addPartner,
  addMember,
  initialMode = 'partner',
  partners = [],
  members = [],
  onNavigateHome,
}: MembershipTabProps) {
  const [activeMode, setActiveMode] = useState<RegistrationMode>(initialMode);
  const [splashOverlay, setSplashOverlay] = useState<{ type: 'partner' | 'member'; name: string } | null>(null);
  const [regError, setRegError] = useState<string | null>(null);

  useEffect(() => {
    if (initialMode) {
      setActiveMode(initialMode);
    }
  }, [initialMode]);

  // Partner Form State
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerCity, setPartnerCity] = useState('');
  const [selectedTier, setSelectedTier] = useState<PartnerTier>('Diamond');
  const [paymentBank, setPaymentBank] = useState<'CBE' | 'Dashen' | 'Telebirr' | 'Other'>('CBE');
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState(false);

  // Member Form State
  const [memberName, setMemberName] = useState('');
  const [memberPhone, setMemberPhone] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberCity, setMemberCity] = useState('');
  const [ministryArea, setMinistryArea] = useState<MinistryArea>('Evangelism & Preaching');
  const [memberStatement, setMemberStatement] = useState('');
  const [memberSubmitting, setMemberSubmitting] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);

  const tiers: { id: PartnerTier; name: { en: string; am: string }; range: string; desc: { en: string; am: string }; color: string; badge: string }[] = [
    {
      id: 'Silver',
      name: { en: 'Silver Partner', am: 'የብር አጋር' },
      range: '500 - 900 ETB / month',
      desc: { en: 'Supports weekly outreach and gospel literature distribution across local towns.', am: 'ለሳምንታዊ የወንጌል ስርጭትና ለትራክት አገልግሎት ይውላል።' },
      color: 'border-slate-300 hover:border-slate-400 bg-gradient-to-br from-slate-50 to-slate-100/60 text-slate-800',
      badge: 'bg-slate-200 text-slate-700',
    },
    {
      id: 'Gold',
      name: { en: 'Gold Partner', am: 'የወርቅ አጋር' },
      range: '1,000 - 4,900 ETB / month',
      desc: { en: 'Empowers our national prayer altars and digital sermon broadcast production.', am: 'ለብሔራዊ የጸሎት መሠዊያዎችና ለዲጂታል ስብከት ሥርጭት ይውላል።' },
      color: 'border-amber-300 hover:border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50/60 text-amber-900',
      badge: 'bg-amber-200 text-amber-800',
    },
    {
      id: 'Diamond',
      name: { en: 'Diamond Partner', am: 'የዳይመንድ አጋር' },
      range: '5,000 - 9,900 ETB / month',
      desc: { en: 'Directly funds city crusades, missionary church plants, and pastoral training.', am: 'ለከተማ ወንጌል ዘመቻዎች፣ ለአዳዲስ አብያተ ክርስቲያናት ተከላና ለፓስተሮች ሥልጠና።' },
      color: 'border-cyan-300 hover:border-cyan-400 bg-gradient-to-br from-cyan-50 to-blue-50/60 text-cyan-950',
      badge: 'bg-cyan-200 text-cyan-900',
    },
    {
      id: 'Platinum',
      name: { en: 'Platinum Partner', am: 'የፕላቲነም አጋር' },
      range: '10,000 - 100,000+ ETB / month',
      desc: { en: 'Foundation pillar supporting nationwide media network, humanitarian aid, and church building altars.', am: 'ለብሔራዊ ሚዲያ ኔትወርክ፣ ለሰብዓዊ እርዳታና ለአብያተ ክርስቲያናት ሕንፃ መሠዊያ ዋነኛ አምድ።' },
      color: 'border-indigo-300 hover:border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50/60 text-indigo-950',
      badge: 'bg-indigo-200 text-indigo-900',
    },
  ];

  const ministryOptions: { id: MinistryArea; en: string; am: string }[] = [
    { id: 'Evangelism & Preaching', en: 'Evangelism & Preaching across Cities', am: 'ወንጌላዊነትና ስብከት በየከተማው' },
    { id: 'Intercessory Prayer', en: 'Global & Local Intercessory Prayer Shield', am: 'አለም አቀፍና አጥቢያ የጸሎት ጋሻ' },
    { id: 'Worship & Choir', en: 'Worship Leading & Choir Ministry', am: 'የአምልኮ መሪነትና የዘማሪዎች ቡድን' },
    { id: 'Youth & Children', en: 'Youth & Children Spiritual Mentorship', am: 'የወጣቶችና ህፃናት መንፈሳዊ አገልግሎት' },
    { id: 'Community Outreach', en: 'Community Humanitarian Aid & Outreach', am: 'የማህበረሰብ ረድኤትና እርዳታ አገልግሎት' },
  ];

  const handlePartnerSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim() || !partnerPhone.trim()) return;

    // 1. Cooldown Rate-Limit Check (Prevent spamming multiple registrations)
    const lastTime = localStorage.getItem('kohl_last_reg_time');
    if (lastTime && Date.now() - Number(lastTime) < 12 * 60 * 60 * 1000) {
      setRegError(
        lang === 'en'
          ? 'You have already submitted a registration recently. To protect our database from duplicate entries, please wait before registering again or contact our leadership directly.'
          : 'በቅርቡ የምዝገባ ቅጽ አስገብተዋል። የውሂብ አዳራሻችንን ከድግግሞሽ ለመጠበቅ፣ እባክዎ ትንሽ ቆይተው ይሞክሩ።'
      );
      return;
    }

    // 2. Duplicate Phone Check
    const cleanPhone = partnerPhone.trim().replace(/\s+/g, '');
    if (partners && partners.some((p) => p.phone.replace(/\s+/g, '') === cleanPhone)) {
      setRegError(
        lang === 'en'
          ? 'This phone number is already registered inside our Kingdom Partner records! You do not need to register again.'
          : 'ይህ ስልክ ቁጥር ከዚህ ቀደም በስርዓታችን እንደ አጋር ተመዝግቧል! እንደገና መመዝገብ አያስፈልገዎትም።'
      );
      return;
    }

    setRegError(null);
    setPartnerSubmitting(true);
    setTimeout(() => {
      const selectedTierObj = tiers.find((t) => t.id === selectedTier) || tiers[2];
      addPartner({
        fullName: partnerName.trim(),
        phone: partnerPhone.trim(),
        email: partnerEmail.trim() || undefined,
        city: partnerCity.trim() || 'Addis Ababa',
        tier: selectedTier,
        monthlyAmountRange: selectedTierObj.range,
        paymentMethod: paymentBank,
      });

      localStorage.setItem('kohl_last_reg_time', Date.now().toString());
      setPartnerSubmitting(false);
      setPartnerSuccess(true);
      setSplashOverlay({ type: 'partner', name: partnerName.trim() });
      setPartnerName('');
      setPartnerPhone('');
      setPartnerEmail('');
      setPartnerCity('');

      setTimeout(() => setPartnerSuccess(false), 7000);
    }, 800);
  };

  const handleMemberSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberPhone.trim() || !memberCity.trim()) return;

    // 1. Cooldown Rate-Limit Check
    const lastTime = localStorage.getItem('kohl_last_reg_time');
    if (lastTime && Date.now() - Number(lastTime) < 12 * 60 * 60 * 1000) {
      setRegError(
        lang === 'en'
          ? 'You have already submitted a registration recently. To protect our database from duplicate entries, please wait before registering again or contact our leadership directly.'
          : 'በቅርቡ የምዝገባ ቅጽ አስገብተዋል። የውሂብ አዳራሻችንን ከድግግሞሽ ለመጠበቅ፣ እባክዎ ትንሽ ቆይተው ይሞክሩ።'
      );
      return;
    }

    // 2. Duplicate Phone Check
    const cleanPhone = memberPhone.trim().replace(/\s+/g, '');
    if (members && members.some((m) => m.phone.replace(/\s+/g, '') === cleanPhone)) {
      setRegError(
        lang === 'en'
          ? 'This phone number is already registered inside our Kingdom Member records! You do not need to register again.'
          : 'ይህ ስልክ ቁጥር ከዚህ ቀደም በስርዓታችን እንደ አባል ተመዝግቧል! እንደገና መመዝገብ አያስፈልገዎትም።'
      );
      return;
    }

    setRegError(null);
    setMemberSubmitting(true);
    setTimeout(() => {
      addMember({
        fullName: memberName.trim(),
        phone: memberPhone.trim(),
        email: memberEmail.trim() || undefined,
        city: memberCity.trim(),
        ministryArea: ministryArea,
        statement: memberStatement.trim() || (lang === 'en' ? 'Eager to serve and preach the Kingdom of His Love Gospel.' : 'የፍቅሩን መንግስት ወንጌል ለመስበክና ለማገልገል።'),
      });

      localStorage.setItem('kohl_last_reg_time', Date.now().toString());
      setMemberSubmitting(false);
      setMemberSuccess(true);
      setSplashOverlay({ type: 'member', name: memberName.trim() });
      setMemberName('');
      setMemberPhone('');
      setMemberEmail('');
      setMemberCity('');
      setMemberStatement('');

      setTimeout(() => setMemberSuccess(false), 7000);
    }, 800);
  };

  const t = {
    en: {
      heading: 'Kingdom Partners & Ministry Members',
      tagline: 'Join hands with Kingdom of His Love Gospel Ministry. Whether supporting the altars monthly or preaching in cities, your covenant makes eternal impact.',
      partnerTab: 'Become a Monthly Partner',
      memberTab: 'Join Ministry Membership',
      selectTier: 'Select Your Monthly Partnership Covenant',
      partnerFormTitle: 'Partner Registration Details',
      memberFormTitle: 'Evangelist & Ministry Member Registration',
      fullName: 'Full Name *',
      phone: 'Phone Number (For pastoral update) *',
      email: 'Email Address (Optional)',
      city: 'City / Town of Residence *',
      cityMember: 'City / Town You Will Preach & Serve In *',
      bank: 'Preferred Monthly Transfer Bank',
      ministryAreaLbl: 'Your Area of Calling & Ministry *',
      statementLbl: 'Brief Statement / Testimony (Optional)',
      statementPlace: 'Tell us why you feel called to serve across your city...',
      submitPartner: 'Register as Kingdom Partner',
      submitMember: 'Submit Member Application',
      submitting: 'Registering...',
      successPartnerTitle: 'Covenant Partnership Registered!',
      successPartnerDesc: 'Thank you for standing as a covenant partner. Our pastoral office will reach out to you via your phone number with your official partner blessing and bank details.',
      successMemberTitle: 'Ministry Application Received!',
      successMemberDesc: 'Welcome to the Kingdom of His Love family! Our regional mission directors will review your application and contact you via your phone number to coordinate city ministry.',
    },
    am: {
      heading: 'የፍቅሩ መንግስት አጋሮችና አባላት',
      tagline: 'ከፍቅሩ መንግስት ወንጌል አገልግሎት ጋር እጅ ለእጅ ይያያዙ። በወር አጋርነት መሠዊያውን በመደገፍ ወይም በየከተማው ወንጌልን በመስበክ ዘላለማዊ አሻራ ያኑሩ።',
      partnerTab: 'የወር አጋር ይሁኑ',
      memberTab: 'የአገልግሎቱ አባልና ወንጌላዊ ይሁኑ',
      selectTier: 'የወርሃዊ አጋርነት ደረጃዎን ይምረጡ',
      partnerFormTitle: 'የአጋርነት መመዝገቢያ ቅጽ',
      memberFormTitle: 'የወንጌላውያንና አባላት መመዝገቢያ ቅጽ',
      fullName: 'ሙሉ ስም *',
      phone: 'የስልክ ቁጥር (ለአገልግሎት ግንኙነት) *',
      email: 'የኢሜይል አድራሻ (ካለዎት)',
      city: 'የሚኖሩበት ከተማ *',
      cityMember: 'ወንጌል የሚሰብኩበትና የሚያገለግሉበት ከተማ *',
      bank: 'የሚመርጡት የክፍያ ባንክ',
      ministryAreaLbl: 'የአገልግሎት ጥሪዎና ዘርፍ *',
      statementLbl: 'አጭር ምስክርነት / የአገልግሎት ፍላጎት (ካለዎት)',
      statementPlace: 'በከተማዎ ወንጌልን ለማገልገል ስላሎት ራዕይ ይጻፉልን...',
      submitPartner: 'እንደ ፍቅሩ መንግስት አጋር ይመዝገቡ',
      submitMember: 'የአባልነት ማመልከቻ ይላኩ',
      submitting: 'እየተመዘገበ ነው...',
      successPartnerTitle: 'የአጋርነት ቃል ኪዳንዎ ተመዝግቧል!',
      successPartnerDesc: 'ስለ አጋርነትዎ ጌታ ይባርክዎት! የቤተ ክርስቲያናችን ፓስተሮች በስልክ ቁጥርዎ አግኝተው የአጋርነት በረከትንና የባንክ ሂሳብ መረጃዎችን ያሳውቁዎታል።',
      successMemberTitle: 'የአባልነት ማመልከቻዎ ደርሷል!',
      successMemberDesc: 'ወደ ፍቅሩ መንግስት ቤተሰብ እንኳን በደህና መጡ! የአገልግሎታችን አስተባባሪዎች ማመልከቻዎን አይተው በከተማዎ ወንጌልን ለማገልገል በስልክ ቁጥርዎ ያገኟችኋል።',
    },
  }[lang];

  return (
    <div id="membership-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto space-y-12 animate-fade-up relative">
      {/* Celebration Splash Overlay Modal in front of screen */}
      <AnimatePresence>
        {splashOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              className="bg-white rounded-[40px] p-8 sm:p-14 max-w-lg w-full shadow-2xl border border-primary/20 text-center relative overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary via-secondary to-tertiary h-3 w-full absolute top-0 left-0" />
              <button
                onClick={() => {
                  setSplashOverlay(null);
                  if (onNavigateHome) onNavigateHome();
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-green-600 animate-bounce">
                <CheckCircle className="w-14 h-14" />
              </div>

              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest inline-block mb-3">
                {lang === 'en' ? 'Registration Complete' : 'ምዝገባው ተጠናቋል'}
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-3">
                {lang === 'en' ? 'Welcome to the Kingdom Family!' : 'እንኳን ወደ ፍቅሩ መንግስት ቤተሰብ በደህና መጡ!'}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {lang === 'en'
                  ? `Thank you, ${splashOverlay.name}! Your ${splashOverlay.type === 'partner' ? 'partnership covenant' : 'ministry membership application'} has been securely recorded in our global Neon database. Our leadership team and pastoral intercessors will review your details and connect with you shortly.`
                  : `እናመሰግናለን, ${splashOverlay.name}! የ${splashOverlay.type === 'partner' ? 'አጋርነት' : 'አባልነት'} ምዝገባዎ በስርዓታችን በትክክል ተመዝግቧል። የአገልግሎታችን መሪዎችና የጸሎት አስተባባሪዎች መረጃዎን አይተው በተመዘገበው ስልክ ቁጥርዎ በቅርቡ ያገኙዎታል።`}
              </p>

              <button
                onClick={() => {
                  setSplashOverlay(null);
                  if (onNavigateHome) onNavigateHome();
                  else window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-primary via-secondary to-primary text-white font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-tertiary" />
                <span>{lang === 'en' ? 'Close & Return to Home Page' : 'ዘግተው ወደ ዋና ገጽ ይመለሱ'}</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flood Error Alert Banner */}
      <AnimatePresence>
        {regError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-3xl mx-auto p-5 bg-red-50 border border-red-200 rounded-3xl flex items-center justify-between gap-4 text-red-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
              <p className="text-sm font-bold leading-relaxed">{regError}</p>
            </div>
            <button onClick={() => setRegError(null)} className="p-1 hover:bg-red-100 rounded-full text-red-600 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-tertiary" />
          <span>{lang === 'en' ? 'Kingdom Covenant Altar' : 'የመንግስቱ ቃል ኪዳን መሠዊያ'}</span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>

      {/* Dual Mode Switcher */}
      <div className="flex justify-center">
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm inline-flex flex-col sm:flex-row gap-2 max-w-2xl w-full">
          <button
            onClick={() => setActiveMode('partner')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-sans font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
              activeMode === 'partner'
                ? 'bg-primary text-white shadow-md scale-[1.01]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award className="w-5 h-5 fill-current opacity-80" />
            <span>{t.partnerTab}</span>
          </button>
          <button
            onClick={() => setActiveMode('member')}
            className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-sans font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
              activeMode === 'member'
                ? 'bg-primary text-white shadow-md scale-[1.01]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 opacity-80" />
            <span>{t.memberTab}</span>
          </button>
        </div>
      </div>

      {/* Content Mode: Partner */}
      {activeMode === 'partner' && (
        <div className="space-y-12 animate-fade-in">
          {/* Tiers Grid */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-primary text-center">{t.selectTier}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    tier.color
                  } ${
                    selectedTier === tier.id ? 'ring-4 ring-primary shadow-xl scale-105' : 'opacity-90 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-sans font-extrabold uppercase tracking-widest ${tier.badge}`}>
                        {tier.id}
                      </span>
                      {selectedTier === tier.id && (
                        <CheckCircle className="w-6 h-6 text-primary fill-current" />
                      )}
                    </div>
                    <h3 className="font-serif text-xl font-bold">{lang === 'en' ? tier.name.en : tier.name.am}</h3>
                    <div className="text-lg font-sans font-extrabold text-primary bg-white/70 px-3 py-1.5 rounded-xl border border-white/50">
                      {tier.range}
                    </div>
                    <p className="text-xs leading-relaxed opacity-85">{lang === 'en' ? tier.desc.en : tier.desc.am}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-black/5 text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
                    <span>{lang === 'en' ? 'Click to Select' : 'ለመምረጥ ይጫኑ'}</span>
                    <span>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Registration Form */}
          <div className="max-w-3xl mx-auto bg-white rounded-[36px] p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
            <div className="border-b border-gray-100 pb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary">{t.partnerFormTitle}</h3>
                <p className="font-sans text-xs text-gray-500 mt-0.5">
                  Selected Tier: <strong className="text-tertiary">{selectedTier} Partner ({tiers.find(t=>t.id===selectedTier)?.range})</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handlePartnerSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.fullName}</label>
                  <input
                    type="text"
                    required
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Abebe Kebede' : 'ምሳሌ፡ አበበ ከበደ'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.phone}</label>
                  <input
                    type="tel"
                    required
                    value={partnerPhone}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="+251 911 ..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.city}</label>
                  <input
                    type="text"
                    value={partnerCity}
                    onChange={(e) => setPartnerCity(e.target.value)}
                    placeholder={lang === 'en' ? 'Addis Ababa / Hawassa' : 'አዲስ አበባ / ሀዋሳ'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.email}</label>
                  <input
                    type="email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-gray-700 block">{t.bank}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['CBE', 'Dashen', 'Telebirr', 'Other'] as const).map((bank) => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setPaymentBank(bank)}
                      className={`py-3 rounded-xl border font-sans font-bold text-xs transition-all ${
                        paymentBank === bank
                          ? 'border-primary bg-primary/10 text-primary shadow-sm'
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {bank === 'CBE' ? 'Commercial Bank (CBE)' : bank === 'Dashen' ? 'Dashen Bank' : bank === 'Telebirr' ? 'Telebirr / E-birr' : 'Other Banks'}
                    </button>
                  ))}
                </div>

                {/* Official Transfer Account Display */}
                <div className="mt-3 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <div className="font-bold text-amber-900 font-serif">
                      {paymentBank === 'Telebirr' 
                        ? (lang === 'en' ? 'Official Telebirr Transfer Account:' : 'የቴሌብር ማስተላለፊያ ሂሳብ፡')
                        : (lang === 'en' ? 'Official CBE Transfer Account:' : 'የኢትዮጵያ ንግድ ባንክ (CBE) ሂሳብ፡')}
                    </div>
                    <div className="text-amber-800 font-sans">
                      {paymentBank === 'Telebirr' ? 'Selam Sedik (ሰላም ሳዲቅ)' : 'Firaol Tesfahun (ፊራኦል ተስፋሁን)'}
                    </div>
                  </div>
                  <div className="font-mono font-extrabold text-sm sm:text-base text-amber-950 bg-white px-3 py-1.5 rounded-xl border border-amber-300 shadow-sm shrink-0 flex items-center justify-between gap-3">
                    <span>{paymentBank === 'Telebirr' ? '0923359640' : '1000709675021'}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={partnerSubmitting}
                className="w-full py-4 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-primary/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {partnerSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.submitPartner} ({selectedTier} - {tiers.find(t=>t.id===selectedTier)?.range})</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Feedback */}
            <AnimatePresence>
              {partnerSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 bg-green-50 border border-green-200 rounded-3xl flex items-start gap-4 mt-6"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-bold text-green-900">{t.successPartnerTitle}</h4>
                    <p className="text-xs md:text-sm text-green-800 leading-relaxed mt-1">{t.successPartnerDesc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Content Mode: Member */}
      {activeMode === 'member' && (
        <div className="space-y-12 animate-fade-in">
          <div className="max-w-3xl mx-auto bg-white rounded-[36px] p-8 md:p-12 shadow-sm border border-gray-100 space-y-8">
            <div className="border-b border-gray-100 pb-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary">{t.memberFormTitle}</h3>
                <p className="font-sans text-xs text-gray-500 mt-0.5">
                  {lang === 'en' ? 'Register to join and preach the Gospel across towns and cities.' : 'በየከተማው ወንጌልን ለማብሰርና እንደ ቤተሰብ ለማገልገል ይመዝገቡ።'}
                </p>
              </div>
            </div>

            <form onSubmit={handleMemberSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.fullName}</label>
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder={lang === 'en' ? 'e.g. Ev. Yosef Kebede' : 'ምሳሌ፡ ወንጌላዊ ዮሴፍ ከበደ'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.phone}</label>
                  <input
                    type="tel"
                    required
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    placeholder="+251 911 ..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.cityMember}</label>
                  <input
                    type="text"
                    required
                    value={memberCity}
                    onChange={(e) => setMemberCity(e.target.value)}
                    placeholder={lang === 'en' ? 'Addis Ababa / Bahir Dar / Adama' : 'አዲስ አበባ / ባህር ዳር / አዳማ'}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.email}</label>
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-gray-700 block">{t.ministryAreaLbl}</label>
                <select
                  value={ministryArea}
                  onChange={(e) => setMinistryArea(e.target.value as MinistryArea)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white cursor-pointer"
                >
                  {ministryOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {lang === 'en' ? opt.en : opt.am}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-sans font-bold text-gray-700 block">{t.statementLbl}</label>
                <textarea
                  rows={4}
                  value={memberStatement}
                  onChange={(e) => setMemberStatement(e.target.value)}
                  placeholder={t.statementPlace}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={memberSubmitting}
                className="w-full py-4 bg-tertiary hover:bg-tertiary-container text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-tertiary/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {memberSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Users className="w-4 h-4" />
                    <span>{t.submitMember}</span>
                  </>
                )}
              </button>
            </form>

            {/* Success Feedback */}
            <AnimatePresence>
              {memberSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 bg-green-50 border border-green-200 rounded-3xl flex items-start gap-4 mt-6"
                >
                  <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-base font-bold text-green-900">{t.successMemberTitle}</h4>
                    <p className="text-xs md:text-sm text-green-800 leading-relaxed mt-1">{t.successMemberDesc}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
