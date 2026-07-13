import { Language, PrayerRequest } from '../types';
import { Heart, Send, CheckCircle, ShieldCheck, MessageSquareHeart } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PrayerRequestsTabProps {
  lang: Language;
}

export default function PrayerRequestsTab({ lang }: PrayerRequestsTabProps) {
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRequest, setFormRequest] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Initialize and load prayers from LocalStorage
  useEffect(() => {
    const savedPrayers = localStorage.getItem('khl_prayers');
    if (savedPrayers) {
      setPrayers(JSON.parse(savedPrayers));
    } else {
      // Default initial seed data for a beautiful community feed experience
      const initialPrayers: PrayerRequest[] = [
        {
          id: 'prayer-seed-1',
          name: 'Anonymous',
          phone: '',
          request: 'I am asking for prayers for my mother who is undergoing surgery in Addis Ababa next week. We are standing in faith for complete healing and restoration.',
          date: 'October 24, 2024',
          isApproved: true,
          likes: 42,
          replies: ['Praying with you!', 'Jehovah Rapha is on the scene. Stay strong.', 'We stand in faith with your family.']
        },
        {
          id: 'prayer-seed-2',
          name: 'Yared T.',
          phone: '',
          request: 'Seeking divine guidance and wisdom for a new professional path. Praying for doors to open in alignment with God\'s perfect purpose for my life.',
          date: 'October 18, 2024',
          isApproved: true,
          likes: 28,
          replies: ['The Lord will make a way. Proverbs 3:5-6.', 'Standing in agreement with you.']
        }
      ];
      setPrayers(initialPrayers);
      localStorage.setItem('khl_prayers', JSON.stringify(initialPrayers));
    }
  }, []);

  const handlePrayerSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmittedSuccess(true);

      setTimeout(() => {
        setSubmittedSuccess(false);
      }, 5000);
    }, 500);
  };

  const handlePrayWithThem = (id: string) => {
    const updated = prayers.map((p) => {
      if (p.id === id) {
        return { ...p, likes: (p.likes || 0) + 1 };
      }
      return p;
    });
    setPrayers(updated);
    localStorage.setItem('khl_prayers', JSON.stringify(updated));
  };

  const t = {
    en: {
      heading: 'Altar of Prayer',
      tagline: 'We are here to stand in the gap. Place your requests on the altar, and let our global prayer shield lift you up.',
      formHeader: 'Submit Prayer Request',
      formDesc: 'Submit your request. If you toggle confidential, your name will be hidden from the feed, seen only by the elders.',
      lblName: 'Your Name (Optional)',
      lblPhone: 'Phone Number (For Pastoral follow-up)',
      lblRequest: 'Prayer Details & Supplication',
      lblConf: 'Keep Request Confidential (Hide name)',
      btnSubmit: 'Coming Soon',
      successTitle: 'Coming Soon!',
      successDesc: 'Online prayer request submission is currently coming soon. For urgent prayers, please visit our ministry altar or call our pastoral office directly.',
      feedHeader: 'Active Prayer Shield / Prayers Sent with Love',
      feedDesc: 'Join hands with other believers. Click the heart to let them know you are praying, or write words of comfort.',
      prayWithThem: 'Pray with Us',
      prayingState: 'Prayed!',
      supportIndicator: 'believers praying',
      noRequestPlaceholder: 'Please type details of your request.',
    },
    am: {
      heading: 'የጸሎት መሠዊያ',
      tagline: 'እኛ ለእርስዎ ለመጸለይ እዚህ ነን። የጸሎት ጥያቄዎችዎን በመሠዊያው ላይ ያስቀምጡ፣ የጸሎት ጋሻዎቻችን በእምነት ያነሱዎታል።',
      formHeader: 'የጸሎት ጥያቄ ያቅርቡ',
      formDesc: 'ጥያቄዎን ያቅርቡ። ሚስጥራዊነትን ከመረጡ፣ ስምዎ ከምግቡ ላይ ይደበቃል፣ የሚታየውም ለአገልግሎቱ ሽማግሌዎች ብቻ ይሆናል።',
      lblName: 'ስምዎ (ካለዎት)',
      lblPhone: 'የስልክ ቁጥር (ለፓስተር ክትትል)',
      lblRequest: 'የጸሎት ዝርዝር እና ልመና',
      lblConf: 'ጥያቄውን በሚስጥር ያቆዩት (ስሜ ይደበቅ)',
      btnSubmit: 'በቅርብ ቀን',
      successTitle: 'በቅርብ ቀን!',
      successDesc: 'የጸሎት ጥያቄ በመስመር ላይ መላክ በቅርቡ ይጀመራል። ለአስቸኳይ ጸሎት እባክዎ በስልክ ያግኙን ወይም በአካል በአገልግሎቱ ይገኙ።',
      feedHeader: 'የቅዱሳን የጸሎት ጋሻ / በፍቅር የተላኩ ጸሎቶች',
      feedDesc: 'ከሌሎች አማኞች ጋር እጅ ለእጅ ይያያዙ። አብረዋቸው እንደሚጸልዩ ለማሳወቅ ልቡን ይጫኑ ወይም የማጽናኛ ቃላትን ይጻፉ።',
      prayWithThem: 'አብረን እንጸልይ',
      prayingState: 'ተጸለየ!',
      supportIndicator: 'አማኞች እየጸለዩ ነው',
      noRequestPlaceholder: 'እባክዎ የጸሎት ጥያቄዎን ዝርዝር ይጻፉ።',
    }
  }[lang];

  return (
    <div id="prayer-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-up">
      {/* Altar Header Span 12 */}
      <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-4 mb-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>

      {/* Submission Form (Left 5 Columns) */}
      <div className="lg:col-span-5">
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          <div className="space-y-1.5">
            <h2 className="font-serif text-xl font-bold text-primary">{t.formHeader}</h2>
            <p className="text-gray-400 font-sans text-xs">{t.formDesc}</p>
          </div>

          <form onSubmit={handlePrayerSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblName}</label>
              <input
                id="prayer-form-name"
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblPhone}</label>
              <input
                id="prayer-form-phone"
                type="tel"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            </div>

            {/* Request Textarea */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblRequest}</label>
              <textarea
                id="prayer-form-request"
                required
                rows={4}
                value={formRequest}
                onChange={(e) => setFormRequest(e.target.value)}
                placeholder={t.noRequestPlaceholder}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white resize-none"
              />
            </div>

            {/* Confidential Toggle */}
            <label className="flex items-center gap-3 py-1 cursor-pointer select-none">
              <input
                id="prayer-form-confidential"
                type="checkbox"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="rounded text-primary focus:ring-primary w-4.5 h-4.5 border-gray-300 accent-primary"
              />
              <span className="text-xs font-sans font-semibold text-gray-600 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>{t.lblConf}</span>
              </span>
            </label>

            {/* Submit Button */}
            <button
              id="prayer-form-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.btnSubmit}</span>
                </>
              )}
            </button>
          </form>

          {/* Success toast */}
          <AnimatePresence>
            {submittedSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3 mt-4"
              >
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-green-800">{t.successTitle}</h4>
                  <p className="text-xs text-green-700 leading-relaxed mt-1">{t.successDesc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Community Prayers Feed (Right 7 Columns) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold text-primary">{t.feedHeader}</h2>
          <p className="text-gray-500 font-sans text-xs leading-relaxed">{t.feedDesc}</p>
        </div>

        <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              id={`prayer-card-${prayer.id}`}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-sans">
                  <span className="font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                    {prayer.name}
                  </span>
                  <span className="text-gray-400 font-medium">{prayer.date}</span>
                </div>
                <p className="text-gray-700 font-sans text-xs leading-relaxed italic">
                  “{prayer.request}”
                </p>
              </div>

              {/* Replies/Comments feed inside prayer */}
              {prayer.replies && prayer.replies.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                  <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-secondary flex items-center gap-1">
                    <MessageSquareHeart className="w-3.5 h-3.5" />
                    <span>Believers Encouragement</span>
                  </span>
                  <div className="space-y-2">
                    {prayer.replies.map((reply, rIdx) => (
                      <p key={rIdx} className="text-xs text-gray-600 font-sans pl-2 border-l-2 border-secondary/20">
                        {reply}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Action and Praying support indicator */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-sans">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>
                    <strong>{prayer.likes}</strong> {t.supportIndicator}
                  </span>
                </div>

                <button
                  id={`pray-with-them-btn-${prayer.id}`}
                  onClick={() => handlePrayWithThem(prayer.id)}
                  className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-xs font-sans font-bold hover:bg-primary hover:text-white transition-all cursor-pointer text-gray-500 hover:border-primary active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{t.prayWithThem}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
