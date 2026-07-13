import { Language, Sermon } from '../types';
import { Play, ArrowRight, CheckCircle2, Award, Users, Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, FormEvent } from 'react';
import { GALLERY_ITEMS } from '../data';

interface HomeTabProps {
  lang: Language;
  setCurrentTab: (tab: string) => void;
  sermons: Sermon[];
  onPlaySermon: (sermon: Sermon) => void;
  onNavigateToMembership?: (mode: 'partner' | 'member') => void;
}

export default function HomeTab({
  lang,
  setCurrentTab,
  sermons,
  onPlaySermon,
  onNavigateToMembership,
}: HomeTabProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter home-specific sermons
  const homeSermons = sermons.filter(s => s.id.startsWith('sermon-home'));

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const t = {
    en: {
      subName: 'የፍቅሩ መንግስት',
      fullName: 'Kingdom of His Love Gospel Ministry',
      heroDesc: 'Bridging traditional spiritual values with contemporary excellence for a global Ethiopian community.',
      watchLatest: 'Watch Latest Sermon',
      exploreMinistries: 'Explore Ministries',
      verse: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
      verseRef: 'John 3:16 — Verse of the Day',
      watchListen: 'Watch & Listen',
      featuredSermons: 'Featured Sermons',
      viewAll: 'View All',
      upcomingGatherings: 'Upcoming Gatherings',
      gatheringsDesc: 'Join us in fellowship as we celebrate the Kingdom of His Love through various events and community gatherings.',
      lifeAtMinistry: 'Life at the Ministry',
      galleryDesc: 'Capturing sacred moments of worship and fellowship.',
      exploreFullGallery: 'Explore Full Gallery',
      weAreHereToPray: 'We are here to pray for you',
      prayerDesc: 'Whatever you are going through, our prayer warriors are standing by to lift you up in faith. Your request is sacred and will be handled with divine care.',
      submitRequest: 'Submit Prayer Request',
      stayConnected: 'Stay Connected to the Kingdom',
      newsDesc: 'Receive weekly spiritual encouragement, ministry updates, and event notifications directly in your inbox.',
      emailPlaceholder: 'Your email address',
      subscribeBtn: 'Subscribe Now',
      successSub: 'Thank you for subscribing!',
      privacyNote: 'We respect your privacy. Unsubscribe at any time.',
      rsvp: 'RSVP Now',
      volunteer: 'Volunteer',
      latestTag: 'LATEST',
      morningGlory: 'Morning Glory Service',
      prayerCircle: 'Virtual Prayer Circle',
    },
    am: {
      subName: 'የፍቅሩ መንግስት',
      fullName: 'የፍቅሩ መንግሥት ወንጌል አገልግሎት',
      heroDesc: 'ለዓለም አቀፍ የኢትዮጵያ ማህበረሰብ ጥንታዊ መንፈሳዊ እሴቶችን ከዘመናዊ የላቀ ብቃት ጋር ማገናኘት።',
      watchLatest: 'የቅርብ ጊዜ ስብከትን ይመልከቱ',
      exploreMinistries: 'አገልግሎቶችን ይረዱ',
      verse: '«በእርሱ የሚያምን ሁሉ የዘላለም ሕይወት እንዲኖረው እንጂ እንዳይጠፋ እግዚአብሔር አንድያ ልጁን እስኪሰጥ ድረስ ዓለሙን እንዲሁ ወዶአልና።»',
      verseRef: 'ዮሐንስ 3:16 — የዕለቱ ጥቅስ',
      watchListen: 'ይመልከቱ እና ያዳምጡ',
      featuredSermons: 'ተለይተው የቀረቡ ስብከቶች',
      viewAll: 'ሁሉንም ይመልከቱ',
      upcomingGatherings: 'ቀጣይ ስብሰባዎች',
      gatheringsDesc: 'በተለያዩ ዝግጅቶች እና የማህበረሰብ ስብሰባዎች የፍቅሩን መንግስት ስናከብር በህብረት ይቀላቀሉን።',
      lifeAtMinistry: 'የአገልግሎቱ ሕይወት',
      galleryDesc: 'የአምልኮ እና የህብረት ቅዱሳን ጊዜያትን ማንጸባረቅ።',
      exploreFullGallery: 'ሙሉውን ማዕከለ-ስዕላት ይመልከቱ',
      weAreHereToPray: 'እኛ ለእርስዎ ለመጸለይ እዚህ ነን',
      prayerDesc: 'በማንኛውም ሁኔታ ውስጥ እያለፉ ቢሆንም፣ የጸሎት አርበኞቻችን በእምነት ሊያነሱዎት በተጠንቀቅ ላይ ናቸው። ጥያቄዎ የተቀደሰ ነው፣ በታላቅ ጥንቃቄም ይያዛል።',
      submitRequest: 'የጸሎት ጥያቄ ያቅርቡ',
      stayConnected: 'ከመንግስቱ ጋር እንደተገናኙ ይቆዩ',
      newsDesc: 'ሳምንታዊ መንፈሳዊ ማበረታቻዎችን፣ የአገልግሎት ዝመናዎችን እና የዝግጅት ማሳወቂያዎችን በቀጥታ በኢሜልዎ ያግኙ።',
      emailPlaceholder: 'የኢሜል አድራሻዎ',
      subscribeBtn: 'አሁን ይመዝገቡ',
      successSub: 'ስለተመዘገቡ እናመሰግናለን!',
      privacyNote: 'የግል መረጃዎን እንጠብቃለን። በማንኛውም ጊዜ መውጣት ይችላሉ።',
      rsvp: 'አሁን ይመዝገቡ',
      volunteer: 'ይሳተፉ / ይርዱ',
      latestTag: 'የቅርብ ጊዜ',
      morningGlory: 'የማለዳ ክብር አገልግሎት',
      prayerCircle: 'የበይነመረብ ጸሎት ህብረት',
    }
  }[lang];

  return (
    <div id="home-view" className="animate-fade-up">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/20 to-background z-10"></div>
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ 
              backgroundImage: `url('/gallery/IMG_1518.JPG')` 
            }}
          ></div>
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-16">
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white mb-4 drop-shadow-2xl font-bold">
            {t.subName}
          </h2>
          <h1 className="font-serif text-xl md:text-3xl text-white/95 mb-8 max-w-3xl mx-auto tracking-wide font-semibold">
            {t.fullName}
          </h1>
          <p className="font-sans text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.heroDesc}
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button 
              id="hero-watch-btn"
              onClick={() => onPlaySermon(sermons[0])}
              className="bg-primary text-white hover:bg-primary-container px-8 py-4 rounded-full font-bold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t.watchLatest}</span> 
              <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            </button>
            
            <button 
              id="hero-join-partner-btn"
              onClick={() => {
                if (onNavigateToMembership) onNavigateToMembership('partner');
                else setCurrentTab('membership');
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 px-8 py-4 rounded-full font-extrabold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-amber-300/40"
            >
              <Award className="w-4 h-4" />
              <span>{lang === 'en' ? 'Join as Partner' : 'የወር አጋር ይሁኑ'}</span>
            </button>

            <button 
              id="hero-join-member-btn"
              onClick={() => {
                if (onNavigateToMembership) onNavigateToMembership('member');
                else setCurrentTab('membership');
              }}
              className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-700 hover:to-blue-800 px-8 py-4 rounded-full font-extrabold text-sm shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-cyan-300/40"
            >
              <Users className="w-4 h-4" />
              <span>{lang === 'en' ? 'Join as Member' : 'ወንጌላዊ አባል ይሁኑ'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bible Verse Section */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="glass-card rounded-3xl p-8 md:p-16 text-center habesha-pattern relative overflow-hidden ambient-glow">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary-container via-primary to-tertiary-container"></div>
            <span className="font-serif text-tertiary text-5xl mb-4 block leading-none">“</span>
            <h3 className="font-serif text-xl md:text-2xl text-primary mb-6 italic leading-relaxed max-w-3xl mx-auto">
              {t.verse}
            </h3>
            <p className="font-sans text-xs font-bold tracking-widest text-tertiary uppercase">
              {t.verseRef}
            </p>
          </div>
        </div>
      </section>

      {/* Answer Your Kingdom Calling & Partnership Section */}
      <section className="py-16 bg-gradient-to-b from-background via-slate-50/50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold uppercase tracking-widest border border-primary/20">
              {lang === 'en' ? 'Direct Mission Registration' : 'የአገልግሎትና የቃል ኪዳን ምዝገባ'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-primary tracking-wide">
              {lang === 'en' ? 'Answer Your Kingdom Calling' : 'የአገልግሎት ጥሪዎን ይመልሱ'}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {lang === 'en'
                ? 'Whether you are called to stand in the gap through monthly financial partnership or called to join as an evangelist spreading the gospel across towns and cities, take your direct step right here.'
                : 'በየወሩ በገንዘብና በጸሎት ከጎናችን በመቆም በቃል ኪዳን አጋርነት ለመደገፍ፣ ወይም ደግሞ በየከተማው ወንጌልን ለማብሰርና ለማገልገል አባል ሆነው ለመቀላቀል ከታች ያለውን አዝራር ይምረጡ።'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Join as Partner */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-amber-200/80 shadow-xl shadow-amber-500/5 flex flex-col justify-between space-y-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-amber-400/10 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-md">
                    <Award className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'Monthly Support' : 'የወር ቃል ኪዳን'}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-amber-700 transition-colors">
                    {lang === 'en' ? 'Join as Covenant Partner' : 'የወር ቃል ኪዳን አጋር ይሁኑ'}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {lang === 'en'
                      ? 'Select from Silver, Gold, Diamond, or Platinum covenant support tiers (`500 - 100,000+ ETB/month`). Your faithful pledge directly fuels nationwide media broadcasts, regional evangelism crusades, and missionary church plants across Ethiopia.'
                      : 'ከ 500 እስከ 100,000 ብር በሚደርስ የወር ቃል ኪዳን በመደገፍ ለብሔራዊ የቴሌቪዥን ሥርጭት፣ ለከተማ ወንጌል ዘመቻዎችና ለአዳዲስ አብያተ ክርስቲያናት ተከላ የክብሩ ተካፋይ ይሁኑ።'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                  <span className="text-xs text-amber-950 font-bold font-sans">
                    {lang === 'en' ? 'Includes instant registration form with CBE, Dashen, and Telebirr verification.' : 'የኢትዮጵያ ንግድ ባንክ፣ ዳሸን እና ቴሌብር ማስተላለፊያ አማራጮችን ያካተተ።'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onNavigateToMembership) onNavigateToMembership('partner');
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Become a Partner Right Now' : 'አሁኑኑ የወር አጋር ይሁኑ'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 2: Join as Evangelist / Member */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white rounded-[32px] p-8 sm:p-10 border-2 border-cyan-200/80 shadow-xl shadow-cyan-500/5 flex flex-col justify-between space-y-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-md">
                    <Users className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 text-xs font-bold uppercase tracking-wider font-mono">
                    {lang === 'en' ? 'Active Evangelism' : 'ወንጌልን ለማብሰር'}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">
                    {lang === 'en' ? 'Join as Evangelist / Member' : 'ወንጌላዊ ወይም አባል ይሁኑ'}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mt-2.5">
                    {lang === 'en'
                      ? 'Register your mission city (`Addis Ababa`, `Hawassa`, `Adama`, etc.), full contact details, and your specific ministry calling (`Preaching & Evangelism`, `Intercessory Prayer`, `Worship & Choir`, `Youth Ministry`).'
                      : 'በሚኖሩበት ከተማ ወንጌልን ለማብሰር፣ በጸሎት ጋሻነት ለመቆም፣ እንዲሁም በዘማሪነትና በወጣቶች አገልግሎት ለመሳተፍ ሙሉ መረጃዎን በመሙላት ይመዝገቡ።'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-100 flex items-center gap-3">
                  <Heart className="w-5 h-5 text-cyan-600 shrink-0 fill-current" />
                  <span className="text-xs text-cyan-950 font-bold font-sans">
                    {lang === 'en' ? 'Directly connects you with regional outreach coordinators and fellowship altars.' : 'ከአጥቢያና ከክልል ወንጌል አስተባባሪዎች ጋር ቀጥታ ያገናኛል።'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onNavigateToMembership) onNavigateToMembership('member');
                }}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'en' ? 'Register as Member Right Now' : 'አሁኑኑ ወንጌላዊ አባል ይሁኑ'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sermons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
            <div>
              <p className="text-tertiary font-sans font-bold text-xs uppercase tracking-widest mb-1">{t.watchListen}</p>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t.featuredSermons}</h2>
            </div>
            <button 
              id="sermons-view-all-btn"
              onClick={() => setCurrentTab('sermons')}
              className="text-primary font-bold text-xs flex items-center gap-2 group hover:text-tertiary transition-colors"
            >
              <span>{t.viewAll}</span> 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeSermons.map((sermon) => (
              <div key={sermon.id} className="flex flex-col group">
                <div className="relative rounded-2xl overflow-hidden mb-4 group cursor-pointer aspect-video shadow-md overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                    style={{ backgroundImage: `url('${sermon.coverUrl}')` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button 
                      id={`play-home-sermon-${sermon.id}`}
                      onClick={() => onPlaySermon(sermon)}
                      className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white group-hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>
                  </div>
                  {sermon.id === 'sermon-home-1' && (
                    <div className="absolute top-4 left-4 bg-tertiary text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      {t.latestTag}
                    </div>
                  )}
                </div>
                <h4 className="font-serif text-lg font-bold text-primary mb-1 hover:text-tertiary transition-colors cursor-pointer" onClick={() => onPlaySermon(sermon)}>
                  {lang === 'en' ? sermon.title.en : sermon.title.am}
                </h4>
                <p className="text-gray-500 text-xs font-sans font-medium">
                  {lang === 'en' ? sermon.speaker.en : sermon.speaker.am} • {lang === 'en' ? sermon.date.en : sermon.date.am}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">{t.lifeAtMinistry}</h2>
            <p className="text-gray-600 text-sm font-sans">{t.galleryDesc}</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {GALLERY_ITEMS.slice(6).map((item) => (
              <div 
                key={item.id} 
                className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-md block break-inside-avoid border border-gray-100/30"
                onClick={() => setCurrentTab('gallery')}
              >
                <img 
                  className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700" 
                  src={item.coverUrl} 
                  referrerPolicy="no-referrer"
                  alt={lang === 'en' ? item.title.en : item.title.am} 
                />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-[9px] font-sans font-bold tracking-widest uppercase text-tertiary-fixed mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-sm font-bold leading-snug">
                    {lang === 'en' ? item.title.en : item.title.am}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button 
              id="gallery-explore-full-btn"
              onClick={() => setCurrentTab('gallery')}
              className="px-8 py-3 rounded-full border border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
            >
              {t.exploreFullGallery}
            </button>
          </div>
        </div>
      </section>

      {/* Prayer Request CTA Section */}
      <section className="py-16 relative overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center blur-md opacity-40" 
            style={{ 
              backgroundImage: `url('/gallery/IMG_3649.JPG')` 
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="glass-card rounded-[32px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-xl border border-white/40">
            <div className="max-w-xl">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">{t.weAreHereToPray}</h2>
              <p className="text-gray-700 text-sm font-sans leading-relaxed">
                {t.prayerDesc}
              </p>
            </div>
            
            <button 
              id="submit-prayer-cta-btn"
              onClick={() => setCurrentTab('prayer')}
              className="w-full lg:w-auto bg-tertiary text-white px-10 py-5 rounded-full font-sans font-bold text-base shadow-2xl hover:bg-tertiary/90 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.submitRequest}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 habesha-pattern pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6">{t.stayConnected}</h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
            {t.newsDesc}
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="flex-grow bg-white/10 border border-white/20 rounded-full px-6 py-4 text-white text-sm placeholder:text-white/40 focus:outline-none focus:bg-white/20 focus:ring-1 focus:ring-tertiary-fixed transition-all"
            />
            <button 
              id="newsletter-subscribe-btn"
              type="submit" 
              className="bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim px-10 py-4 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer shadow-md"
            >
              {t.subscribeBtn}
            </button>
          </form>

          {subscribed && (
            <div className="flex items-center gap-2 text-green-300 font-bold text-xs justify-center mt-6 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.successSub}</span>
            </div>
          )}

          <p className="mt-6 text-white/50 text-xs font-sans">{t.privacyNote}</p>
        </div>
      </section>
    </div>
  );
}
