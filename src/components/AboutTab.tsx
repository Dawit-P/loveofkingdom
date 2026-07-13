import { Language } from '../types';
import { Eye, Shield, Award, Sparkles, BookOpen, CheckCircle2, Heart, Activity, Globe, BarChart3, Users, TrendingUp } from 'lucide-react';

interface AboutTabProps {
  lang: Language;
}

export default function AboutTab({ lang }: AboutTabProps) {
  const t = {
    en: {
      title: 'Kingdom of His Love Gospel Ministry',
      subtitle: 'Introduction',
      desc1: 'Kingdom of His Love Gospel Ministry is established to deliver the Gospel of our Lord Jesus Christ to all people through love, truth, and the power of the Holy Spirit.',
      desc2: 'Our purpose is to see lives transformed in Christ and to manifest the Kingdom of God on earth.',
      
      vision: 'Our Vision',
      visionDesc: 'To raise and strengthen generations filled with love and truth, sanctified by the Holy Spirit, and reflecting the character of Christ.',
      bibleVerseLabel: 'Bible Verse:',
      visionVerse: '“God is love.”',
      visionVerseRef: '— 1 John 4:8',

      mission: 'Our Mission',
      missionItems: [
        'Deliver the Gospel of Christ to all creation.',
        'Make and nurture disciples.',
        'Touch lives through love and ministry.',
        'Provide spiritual and social support to those in need.'
      ],
      missionVerse: '“Go and make disciples of all nations.”',
      missionVerseRef: '— Matthew 28:19',

      objectives: 'Our Objectives',
      objectivesItems: [
        'Bring people to Christ.',
        'Encourage spiritual growth.',
        'Strengthen the life of worship and prayer.',
        'Demonstrate God\'s love in action.'
      ],

      values: 'Core Values',
      val1Title: 'Love',
      val1Desc: '“Love one another.” (John 13:34)',
      val2Title: 'Faith',
      val2Desc: '“Without faith it is impossible to please God.” (Hebrews 11:6)',
      val3Title: 'Holiness',
      val3Desc: '“Be holy, for I am holy.” (1 Peter 1:16)',
      val4Title: 'Unity',
      val4Desc: '“That they may be one.” (John 17:21)',
      val5Title: 'Service',
      val5Desc: '“Let the greatest among you be your servant.” (Matthew 20:26)',
      val6Title: 'Truth',
      val6Desc: '“You will know the truth, and the truth will set you free.” (John 8:32)',

      dashboardTitle: 'World Religious Demographics & Population Share',
      dashboardSubtitle: 'Global Harvest Field Overview',
      dashboardDesc: 'A comprehensive statistical breakdown of estimated followers and global population shares across major world religions and belief systems.',
      top5Title: 'Top 5 Largest Religions by Followers',
      top5Subtitle: 'The five most widely practiced religious traditions across the globe.',
      tableTitle: 'Complete Global Religious Distribution',
      tableSubtitle: 'Detailed estimates of followers and percentage of world population.',
      colReligion: 'Religion',
      colFollowers: 'Estimated Followers',
      colShare: 'World Population Share',
      colDistribution: 'Proportion',
      relChristianity: 'Christianity',
      relIslam: 'Islam',
      relHinduism: 'Hinduism',
      relBuddhism: 'Buddhism',
      relTraditional: 'Traditional / Indigenous Religions',
      relSikhism: 'Sikhism',
      relJudaism: 'Judaism',
      relBahai: 'Baháʼí Faith',
      relOther: 'Other Religions',
      relNonReligious: 'Non-Religious (Atheist, Agnostic, etc.)',
      folChristianity: '2.4 Billion',
      folIslam: '2.0 Billion',
      folHinduism: '1.2 Billion',
      folBuddhism: '500 Million',
      folTraditional: '430 Million',
      folSikhism: '30 Million',
      folJudaism: '15–16 Million',
      folBahai: '8 Million',
      folOther: '60 Million',
      folNonReligious: '1.9 Billion',
      top5Traditional: 'Traditional Religions',
    },
    am: {
      title: 'የፍቅሩ መንግስት የወንጌል ሚኒስትሪ',
      subtitle: 'መግቢያ',
      desc1: 'የፍቅሩ መንግስት የወንጌል ሚኒስትሪ የጌታችን የኢየሱስ ክርስቶስን ወንጌል በፍቅር፣ በእውነት እና በመንፈስ ቅዱስ ኃይል ለሰዎች ለማድረስ የተቋቋመ አገልግሎት ነው።',
      desc2: 'ዓላማው ሰዎች በክርስቶስ የተለወጠ ሕይወት እንዲኖራቸው እና የእግዚአብሔርን መንግስት በምድር ላይ እንዲገልጹ ማድረግ ነው።',
      
      vision: 'ራዕይው',
      visionDesc: 'በፍቅር እና በእውነት የተሞሉ፣ በመንፈስ ቅዱስ የተቀደሱ፣ የክርስቶስን ባህርይ የሚያንጸባርቁ ትውልዶችን ማንጠናከር።',
      bibleVerseLabel: 'የመጽሐፍ ቅዱስ ጥቅስ:',
      visionVerse: '“እግዚአብሔር ፍቅር ነው።”',
      visionVerseRef: '— ፩ ዮሐንስ ፬፥፰',

      mission: 'ተልዕኮው',
      missionItems: [
        'የክርስቶስን ወንጌል ለሁሉም ፍጥረት ማድረስ።',
        'ደቀመዛሙርትን ማፍራት እና ማሳደግ።',
        'በፍቅር እና በአገልግሎት ሕይወትን መንካት።',
        'ለተቸገሩ ሰዎች መንፈሳዊና ማህበራዊ ድጋፍ መስጠት።'
      ],
      missionVerse: '“ሂዱና ሕዝቦችን ሁሉ ደቀመዛሙርት አድርጉ።”',
      missionVerseRef: '— ማቴዎስ ፳፰፥፲፱',

      objectives: 'አላማው',
      objectivesItems: [
        'ሰዎችን ወደ ክርስቶስ ማምጣት።',
        'የመንፈሳዊ እድገትን ማበረታታት።',
        'የአምልኮ እና የጸሎት ሕይወትን ማጠናከር።',
        'የእግዚአብሔርን ፍቅር በተግባር ማሳየት።'
      ],

      values: 'እሴቶች',
      val1Title: 'ፍቅር',
      val1Desc: '“እርስ በርሳችሁ ተዋደዱ።” (ዮሐንስ ፲፫፥፴፬)',
      val2Title: 'እምነት',
      val2Desc: '“ያለ እምነት እግዚአብሔርን ደስ ማሰኘት አይቻልም።” (ዕብራውያን ፲፩፥፮)',
      val3Title: 'ቅድስና',
      val3Desc: '“እኔ ቅዱስ ነኝና እናንተም ቅዱሳን ሁኑ።” (፩ ጴጥሮስ ፩፥፲፮)',
      val4Title: 'አንድነት',
      val4Desc: '“እንዲያንድ ይሁኑ።” (ዮሐንስ ፲ይ፥፳፩)',
      val5Title: 'አገልግሎት',
      val5Desc: '“ከእናንተ ታላቅ የሚሆን አገልጋይ ይሁን።” (ማቴዎስ ፳፥፳፮)',
      val6Title: 'እውነት',
      val6Desc: '“እውነትን ታውቃላችሁ፤ እውነትም ነጻ ታወጣችኋለች።” (ዮሐንስ ፰፥፴፪)',

      dashboardTitle: 'የዓለም ሃይማኖቶች ስታቲስቲክስ እና የሕዝብ ድርሻ',
      dashboardSubtitle: 'አጠቃላይ የሃይማኖት ተከታዮች መረጃና የዓለም ሁኔታ',
      dashboardDesc: 'በዓለም ዙሪያ ያሉ ዋና ዋና ሃይማኖቶች እና እምነቶች ግምታዊ የተከታዮች ብዛት እና ከዓለም አጠቃላይ ሕዝብ ያላቸውን የድርሻ መጠን የሚያሳይ መረጃ።',
      top5Title: 'በብዛት የሚከተሉት 5 ሃይማኖቶች',
      top5Subtitle: 'በዓለም አቀፍ ደረጃ ከፍተኛ የተከታዮች ቁጥር ያላቸው አምስት ዋና ዋና ሃይማኖቶች።',
      tableTitle: 'ሙሉ የሃይማኖት ተከታዮች ስርጭት ዝርዝር',
      tableSubtitle: 'የእያንዳንዱ ሃይማኖት ግምታዊ የተከታዮች ብዛት እና ከዓለም ሕዝብ ድርሻ።',
      colReligion: 'ሃይማኖት',
      colFollowers: 'ግምታዊ የተከታዮች ብዛት',
      colShare: 'ከዓለም ሕዝብ ድርሻ',
      colDistribution: 'የድርሻ መጠን',
      relChristianity: 'ክርስትና',
      relIslam: 'እስልምና',
      relHinduism: 'ሂንዱይዝም',
      relBuddhism: 'ቡድሂዝም',
      relTraditional: 'ባህላዊ/የአገር በቀል ሃይማኖቶች',
      relSikhism: 'ሲክ ሃይማኖት',
      relJudaism: 'ይሁዲነት',
      relBahai: 'ባሃኢ',
      relOther: 'ሌሎች ሃይማኖቶች',
      relNonReligious: 'ሃይማኖት የሌላቸው (አቴይስት፣ አግኖስቲክ ወዘተ)',
      folChristianity: '2.4 ቢሊዮን',
      folIslam: '2.0 ቢሊዮን',
      folHinduism: '1.2 ቢሊዮን',
      folBuddhism: '500 ሚሊዮን',
      folTraditional: '430 ሚሊዮን',
      folSikhism: '30 ሚሊዮን',
      folJudaism: '15–16 ሚሊዮን',
      folBahai: '8 ሚሊዮን',
      folOther: '60 ሚሊዮን',
      folNonReligious: '1.9 ቢሊዮን',
      top5Traditional: 'ባህላዊ ሃይማኖቶች',
    }
  }[lang];

  const valueList = [
    { title: t.val1Title, desc: t.val1Desc, icon: Heart, color: 'bg-red-500/10 text-red-600 border border-red-500/20' },
    { title: t.val2Title, desc: t.val2Desc, icon: Sparkles, color: 'bg-amber-500/10 text-amber-600 border border-amber-500/20' },
    { title: t.val3Title, desc: t.val3Desc, icon: Shield, color: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' },
    { title: t.val4Title, desc: t.val4Desc, icon: Activity, color: 'bg-blue-500/10 text-blue-600 border border-blue-500/20' },
    { title: t.val5Title, desc: t.val5Desc, icon: Award, color: 'bg-purple-500/10 text-purple-600 border border-purple-500/20' },
    { title: t.val6Title, desc: t.val6Desc, icon: Eye, color: 'bg-teal-500/10 text-teal-600 border border-teal-500/20' },
  ];

  const religionData = [
    { name: t.relChristianity, followers: t.folChristianity, share: '~29%', percentage: 29, color: 'bg-emerald-600', textAccent: 'text-emerald-700 dark:text-emerald-400', badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/30', isTop: true },
    { name: t.relIslam, followers: t.folIslam, share: '~25%', percentage: 25, color: 'bg-blue-600', textAccent: 'text-blue-600', badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/30' },
    { name: t.relHinduism, followers: t.folHinduism, share: '~15%', percentage: 15, color: 'bg-amber-500', textAccent: 'text-amber-600', badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-500/30' },
    { name: t.relBuddhism, followers: t.folBuddhism, share: '~6%', percentage: 6, color: 'bg-purple-600', textAccent: 'text-purple-600', badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/30' },
    { name: t.relTraditional, followers: t.folTraditional, share: '~5%', percentage: 5, color: 'bg-rose-500', textAccent: 'text-rose-600', badgeColor: 'bg-rose-500/10 text-rose-700 border-rose-500/30' },
    { name: t.relSikhism, followers: t.folSikhism, share: '~0.4%', percentage: 0.4, color: 'bg-indigo-500', textAccent: 'text-indigo-600', badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/30' },
    { name: t.relJudaism, followers: t.folJudaism, share: '~0.2%', percentage: 0.2, color: 'bg-sky-500', textAccent: 'text-sky-600', badgeColor: 'bg-sky-500/10 text-sky-700 border-sky-500/30' },
    { name: t.relBahai, followers: t.folBahai, share: '~0.1%', percentage: 0.1, color: 'bg-teal-500', textAccent: 'text-teal-600', badgeColor: 'bg-teal-500/10 text-teal-700 border-teal-500/30' },
    { name: t.relOther, followers: t.folOther, share: '~0.7%', percentage: 0.7, color: 'bg-gray-500', textAccent: 'text-gray-600', badgeColor: 'bg-gray-500/10 text-gray-700 border-gray-500/30' },
    { name: t.relNonReligious, followers: t.folNonReligious, share: '~23%', percentage: 23, color: 'bg-slate-600', textAccent: 'text-slate-600', badgeColor: 'bg-slate-500/10 text-slate-700 border-slate-500/30' },
  ];

  const top5List = [
    { rank: 1, name: t.relChristianity, followers: t.folChristianity, share: '~29%', percentage: 29, color: 'from-emerald-500 to-teal-700', bg: 'bg-emerald-50/90 border-emerald-500/30 text-emerald-900', bar: 'bg-emerald-600' },
    { rank: 2, name: t.relIslam, followers: t.folIslam, share: '~25%', percentage: 25, color: 'from-blue-500 to-indigo-700', bg: 'bg-blue-50/90 border-blue-500/30 text-blue-900', bar: 'bg-blue-600' },
    { rank: 3, name: t.relHinduism, followers: t.folHinduism, share: '~15%', percentage: 15, color: 'from-amber-500 to-orange-600', bg: 'bg-amber-50/90 border-amber-500/30 text-amber-900', bar: 'bg-amber-500' },
    { rank: 4, name: t.relBuddhism, followers: t.folBuddhism, share: '~6%', percentage: 6, color: 'from-purple-500 to-violet-600', bg: 'bg-purple-50/90 border-purple-500/30 text-purple-900', bar: 'bg-purple-600' },
    { rank: 5, name: t.top5Traditional, followers: t.folTraditional, share: '~5%', percentage: 5, color: 'from-rose-500 to-pink-600', bg: 'bg-rose-50/90 border-rose-500/30 text-rose-900', bar: 'bg-rose-500' },
  ];

  return (
    <div id="about-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto space-y-24 animate-fade-up">
      {/* Introduction / Story Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <p className="text-tertiary font-sans font-bold text-xs uppercase tracking-widest">{t.subtitle}</p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
            {t.title}
          </h1>
          <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed">
            {t.desc1}
          </p>
          <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed">
            {t.desc2}
          </p>
        </div>
        <div className="relative aspect-video lg:aspect-square rounded-[32px] overflow-hidden shadow-2xl group">
          <div 
            className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-1000" 
            style={{ backgroundImage: `url('/gallery/IMG_1518.JPG')` }}
          ></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Vision, Mission & Objectives Bento layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vision Card (Left col-span-5) */}
        <div className="lg:col-span-5 glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">{t.vision}</h2>
            <p className="text-gray-700 font-sans text-sm leading-relaxed">
              {t.visionDesc}
            </p>
          </div>

          {/* Vision Verse Callout */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-primary uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-tertiary" />
              <span>{t.bibleVerseLabel}</span>
            </div>
            <p className="text-base font-serif font-bold text-primary italic leading-relaxed">
              {t.visionVerse}
            </p>
            <p className="text-xs font-sans font-semibold text-gray-500 text-right">
              {t.visionVerseRef}
            </p>
          </div>
        </div>

        {/* Mission Card (Middle col-span-7) */}
        <div className="lg:col-span-7 glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">{t.mission}</h2>
            
            <ul className="space-y-3">
              {t.missionItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-sans text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mission Verse Callout */}
          <div className="bg-secondary/5 rounded-2xl p-5 border border-secondary/10 space-y-2 mt-4">
            <div className="flex items-center gap-2 text-xs font-sans font-bold text-secondary uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-tertiary" />
              <span>{t.bibleVerseLabel}</span>
            </div>
            <p className="text-base font-serif font-bold text-primary italic leading-relaxed">
              {t.missionVerse}
            </p>
            <p className="text-xs font-sans font-semibold text-gray-500 text-right">
              {t.missionVerseRef}
            </p>
          </div>
        </div>

        {/* Objectives Card (Bottom col-span-12) */}
        <div className="lg:col-span-12 glass-card rounded-[32px] p-8 md:p-10 relative overflow-hidden shadow-sm border border-gray-100 bg-white space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">{t.objectives}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.objectivesItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-sans font-bold shrink-0">
                  {idx + 1}
                </span>
                <span className="text-gray-700 font-sans text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t.values}</h2>
          <div className="w-16 h-1 bg-tertiary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueList.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-all duration-300">
                <div className={`w-10 h-10 rounded-xl ${val.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-primary">{val.title}</h3>
                <p className="text-gray-600 font-sans text-xs leading-relaxed font-semibold">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* World Religions Demographics Dashboard Section */}
      <section className="space-y-12">
        {/* Dashboard Hero Header */}
        <div className="bg-gradient-to-br from-gray-900 via-primary to-gray-900 text-white rounded-[32px] p-8 md:p-14 shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 opacity-10 habesha-pattern pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-xs font-sans font-bold uppercase tracking-widest text-tertiary-fixed">
              <Globe className="w-4 h-4 text-tertiary-fixed animate-pulse" />
              <span>{t.dashboardSubtitle}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {t.dashboardTitle}
            </h2>
            <p className="text-gray-300 font-sans text-sm md:text-base leading-relaxed max-w-2xl">
              {t.dashboardDesc}
            </p>
          </div>
        </div>

        {/* Top 5 Largest Religions Spotlight Bento */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-2">
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-secondary" />
                <span>{t.top5Title}</span>
              </h3>
              <p className="text-gray-500 font-sans text-xs md:text-sm mt-1">{t.top5Subtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {top5List.map((item) => (
              <div 
                key={item.rank} 
                className={`relative rounded-[28px] p-6 shadow-sm border transition-all duration-300 hover:shadow-lg flex flex-col justify-between overflow-hidden bg-white ${
                  item.rank === 1 ? 'ring-2 ring-emerald-500/30 border-emerald-500/40 bg-gradient-to-b from-emerald-50/50 to-white' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`w-9 h-9 rounded-2xl flex items-center justify-center font-sans font-bold text-sm text-white shadow-sm bg-gradient-to-br ${item.color}`}>
                      #{item.rank}
                    </span>
                    <span className="font-sans font-extrabold text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200/60">
                      {item.share}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-primary pt-1 leading-snug">
                    {item.name}
                  </h4>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                      {item.followers}
                    </span>
                  </div>
                  {/* Miniature Relative Progress Bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`${item.bar} h-full rounded-full transition-all duration-1000`}
                      style={{ width: `${Math.min(100, Math.max(10, (item.percentage / 30) * 100))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Table & Data Distribution */}
        <div className="glass-card bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="space-y-1">
              <h3 className="font-serif text-2xl font-bold text-primary flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-tertiary" />
                <span>{t.tableTitle}</span>
              </h3>
              <p className="text-gray-500 font-sans text-xs md:text-sm">{t.tableSubtitle}</p>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 text-xs font-sans font-semibold text-gray-600 shrink-0">
              <Users className="w-4 h-4 text-primary" />
              <span>{lang === 'en' ? 'Global Population Base: ~8.1+ Billion' : 'የዓለም ጠቅላላ ሕዝብ፦ ~8.1+ ቢሊዮን'}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200/80 text-[11px] md:text-xs font-sans font-extrabold uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">{t.colReligion}</th>
                  <th className="py-4 px-4">{t.colFollowers}</th>
                  <th className="py-4 px-4">{t.colShare}</th>
                  <th className="py-4 px-4 min-w-[160px] md:min-w-[220px]">{t.colDistribution}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-sans">
                {religionData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="py-4 px-4 font-semibold text-gray-800 flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`}></span>
                      <span className="font-serif font-bold text-base text-primary">{item.name}</span>
                      {item.isTop && (
                        <span className="text-[10px] font-sans font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          #1
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-extrabold text-gray-900 whitespace-nowrap">
                      {item.followers}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`font-bold text-xs px-3 py-1 rounded-full border ${item.badgeColor}`}>
                        {item.share}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div 
                            className={`${item.color} h-full rounded-full transition-all duration-1000 group-hover:opacity-90`}
                            style={{ width: `${Math.min(100, Math.max(4, (item.percentage / 30) * 100))}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-gray-400 w-12 text-right">{item.share}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
