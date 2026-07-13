import { Language } from '../types';
import { Eye, Shield, Award, Sparkles, BookOpen, CheckCircle2, Heart, Activity } from 'lucide-react';

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

      leadership: 'Spiritual Leadership Team',
      leadDesc: 'Dedicated shepherds, teachers, and intercessors committed to your spiritual growth and well-being.',
      pastorAmare: 'Pastor Amare Tekle',
      pastorAmareTitle: 'Founder & Lead Pastor',
      pastorAmareBio: 'Pastor Amare is a visionary leader with a deep apostolic call to restore the foundations of faith and raise up strong kingdom leaders globally.',
      pastorYohannes: 'Pastor Yohannes Belay',
      pastorYohannesTitle: 'Associate Pastor',
      drMartha: 'Dr. Martha Tadesse',
      drMarthaTitle: 'Family & Women Ministries',
      evangelistSamuel: 'Evangelist Samuel Alemu',
      evangelistSamuelTitle: 'Outreach Coordinator',
      messageTitle: 'A Message from the Lead Pastor',
      messageDesc: '"Welcome to the Kingdom of His Love! We are honored to walk beside you in your journey of faith. No matter your background or past struggles, there is a place of grace, healing, and absolute restoration awaiting you here."',
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

      leadership: 'መንፈሳዊ መሪዎች ቡድን',
      leadDesc: 'ለእርስዎ መንፈሳዊ እድገት እና ደህንነት የተሰጡ እረኞች፣ መጋቢዎች እና አማላጆች።',
      pastorAmare: 'ፓስተር አማረ ተክሌ',
      pastorAmareTitle: 'መስራች እና ዋና ፓስተር',
      pastorAmareBio: 'ፓስተር አማረ የእምነት መሠረቶችን ለመመለስ እና ጠንካራ የመንግሥት መሪዎችን በዓለም አቀፍ ደረጃ ለማፍራት ጥልቅ ሐዋርያዊ ጥሪ ያላቸው ባለራዕይ መሪ ናቸው።',
      pastorYohannes: 'ፓስተር ዮሐንስ በላይ',
      pastorYohannesTitle: 'ረዳት ፓስተር',
      drMartha: 'ዶ/ር ማርታ ታደሰ',
      drMarthaTitle: 'የቤተሰብ እና የሴቶች አገልግሎት',
      evangelistSamuel: 'ወንጌላዊ ሳሙኤል ዓለሙ',
      evangelistSamuelTitle: 'የወንጌል ስርጭት አስተባባሪ',
      messageTitle: 'ከዋናው ፓስተር የተላለፈ መልእክት',
      messageDesc: '«ወደ ፍቅሩ መንግስት እንኳን በደህና መጡ! በእምነት ጉዞዎ ከጎንዎ ለመሆን ታላቅ ክብር ይሰማናል። የአሁኑ ማንነትዎ ወይም ያለፉት ትግሎቻችሁ ምንም ይሁኑ ምን፣ እዚህ የጸጋ, የፈውስ እና የፍጹም መታደስ ስፍራ ይጠብቆታል።»',
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

      {/* Pastor Message Callout */}
      <section className="bg-primary text-white rounded-[32px] overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 opacity-10 habesha-pattern pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 relative h-72 lg:h-auto min-h-[350px] bg-gray-900">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('/gallery/IMG_0776.JPG')` }}
            ></div>
          </div>
          <div className="lg:col-span-2 p-8 md:p-16 flex flex-col justify-center space-y-6 relative z-10">
            <h3 className="font-serif text-2xl font-bold text-white tracking-wide">{t.messageTitle}</h3>
            <p className="font-serif text-lg italic text-gray-200 leading-relaxed font-light">
              {t.messageDesc}
            </p>
            <div className="pt-4 border-t border-white/10">
              <p className="font-serif text-base font-bold text-white">{t.pastorAmare}</p>
              <p className="font-sans text-[11px] tracking-widest text-tertiary-fixed uppercase font-bold">{t.pastorAmareTitle}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">{t.leadership}</h2>
          <p className="text-gray-500 font-sans text-sm">{t.leadDesc}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: t.pastorAmare, title: t.pastorAmareTitle, img: '/gallery/IMG_1507.JPG' },
            { name: t.pastorYohannes, title: t.pastorYohannesTitle, img: '/gallery/IMG_1517.JPG' },
            { name: t.drMartha, title: t.drMarthaTitle, img: '/gallery/IMG_1503.JPG' },
            { name: t.evangelistSamuel, title: t.evangelistSamuelTitle, img: '/gallery/IMG_2430 (1).JPG' }
          ].map((leader, i) => (
            <div key={i} className="flex flex-col group text-center bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative bg-gray-100">
                <div 
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                  style={{ backgroundImage: `url('${leader.img}')` }}
                ></div>
                <div className="absolute inset-0 bg-primary/5"></div>
              </div>
              <h3 className="font-serif text-base font-bold text-primary group-hover:text-tertiary transition-colors">{leader.name}</h3>
              <p className="text-gray-400 font-sans text-[10px] tracking-wider uppercase font-bold mt-1">{leader.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
