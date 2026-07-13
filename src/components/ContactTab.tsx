import { Language } from '../types';
import { Mail, Phone, Send, CheckCircle2, Youtube, Video, Share2, ExternalLink } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactTabProps {
  lang: Language;
}

export default function ContactTab({ lang }: ContactTabProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const t = {
    en: {
      heading: 'Reach Out to Us',
      tagline: 'Whether you have a query about services, leadership training, or desire direct pastoral care, our gates are wide open.',
      formHeader: 'Send a Message',
      formDesc: 'Our administrative coordinators will review and route your message to the appropriate ministry coordinator.',
      lblName: 'Your Full Name',
      lblEmail: 'Email Address',
      lblSubject: 'Subject / Focus',
      lblMessage: 'Your Message',
      btnSubmit: 'Deliver Message',
      successTitle: 'Message Dispatched!',
      successDesc: 'We have received your message. Our pastoral office will reach out within 24-48 business hours. Stay blessed!',
      successClose: 'Send Another Message',
      detailsHeader: 'Connect With Our Social Channels',
      phoneLabel: 'Pastoral & Office Phone:',
      phoneVal: '+251 923359640',
      emailLabel: 'Official Email:',
      emailVal: 'Firaoltesfahun50@gmail.com',
      telegramLabel: 'Telegram Channel:',
      telegramVal: 'https://t.me/firaoltesfahun',
      youtubeLabel: 'YouTube Channel:',
      youtubeVal: '@FiraolTesfahun-k3t',
      tiktokLabel: 'TikTok Username:',
      tiktokVal: 'firaol366',
      communityBanner: 'Kingdom of His Love Gospel Ministry • Global Online Fellowship',
    },
    am: {
      heading: 'ያግኙን',
      tagline: 'ስለ አገልግሎቶች፣ ስለ መሪዎች ስልጠና ወይም ስለ ፓስተር ክትትል ማንኛውም ጥያቄ ቢኖርዎት በደስታ ለመቀበል በራችን ክፍት ነው።',
      formHeader: 'መልእክት ይላኩ',
      formDesc: 'የአስተዳደር አስተባባሪዎቻችን መልእክትዎን ገምግመው ለሚመለከተው የአገልግሎት ክፍል ያስተላልፋሉ።',
      lblName: 'ሙሉ ስምዎ',
      lblEmail: 'የኢሜል አድራሻ',
      lblSubject: 'ጉዳዩ / ርዕስ',
      lblMessage: 'የመልእክትዎ ዝርዝር',
      btnSubmit: 'መልእክቱን ላክ',
      successTitle: 'መልእክትዎ ተልኳል!',
      successDesc: 'መልእክትዎ ደርሶናል። የፓስተር ጽሕፈት ቤታችን በ24-48 የሥራ ሰዓታት ውስጥ ያነጋግርዎታል። ተባረኩ!',
      successClose: 'ሌላ መልእክት ላክ',
      detailsHeader: 'የማህበራዊ ሚዲያ እና የመገናኛ አድራሻዎቻችን',
      phoneLabel: 'የስልክ ቁጥር፡',
      phoneVal: '+251 923359640',
      emailLabel: 'የኢሜል አድራሻ፡',
      emailVal: 'Firaoltesfahun50@gmail.com',
      telegramLabel: 'የቴሌግራም ቻናል፡',
      telegramVal: 'https://t.me/firaoltesfahun',
      youtubeLabel: 'የዩቲዩብ ቻናል፡',
      youtubeVal: '@FiraolTesfahun-k3t',
      tiktokLabel: 'የቲክቶክ አድራሻ፡',
      tiktokVal: 'firaol366',
      communityBanner: 'የፍቅሩ መንግሥት ወንጌል አገልግሎት • የዓለም አቀፍ የመስመር ላይ ሕብረት',
    }
  }[lang];

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSentSuccess(false);
  };

  return (
    <div id="contact-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-up">
      {/* Header Span 12 */}
      <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-4 mb-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>

      {/* Contact Form (Left 6 Columns) */}
      <div className="lg:col-span-6">
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          {!sentSuccess ? (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-serif text-xl font-bold text-primary">{t.formHeader}</h2>
                <p className="text-gray-400 font-sans text-xs">{t.formDesc}</p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblName}</label>
                  <input
                    id="contact-input-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblEmail}</label>
                  <input
                    id="contact-input-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblSubject}</label>
                  <input
                    id="contact-input-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblMessage}</label>
                  <textarea
                    id="contact-input-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                id="contact-submit-btn"
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {sending ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.btnSubmit}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">
                  {t.successTitle}
                </h3>
                <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                  {t.successDesc}
                </p>
              </div>
              <button
                id="contact-success-close-btn"
                onClick={resetForm}
                className="w-full py-3 bg-primary text-white hover:bg-primary-container rounded-xl font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                {t.successClose}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info & Social Channels Display (Right 6 Columns) */}
      <div className="lg:col-span-6 space-y-8 text-left">
        <div className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-primary">{t.detailsHeader}</h2>

          <div className="space-y-4 text-sm font-sans">
            {/* Phone */}
            <a
              href="tel:+251923359640"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.phoneLabel}</div>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5">{t.phoneVal}</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 transition-colors" />
            </a>

            {/* Email */}
            <a
              href="mailto:Firaoltesfahun50@gmail.com"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.emailLabel}</div>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5 break-all">Firaoltesfahun50@gmail.com</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
            </a>

            {/* Telegram Channel */}
            <a
              href="https://t.me/firaoltesfahun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.telegramLabel}</div>
                  <div className="font-extrabold text-sky-600 text-base mt-0.5 break-all">https://t.me/firaoltesfahun</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-sky-600 transition-colors" />
            </a>

            {/* YouTube Channel */}
            <a
              href="https://youtube.com/@FiraolTesfahun-k3t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.youtubeLabel}</div>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5">@FiraolTesfahun-k3t</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors" />
            </a>

            {/* TikTok Username */}
            <a
              href="https://tiktok.com/@firaol366"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t.tiktokLabel}</div>
                  <div className="font-extrabold text-gray-900 text-base mt-0.5">firaol366</div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-600 transition-colors" />
            </a>
          </div>
        </div>

        {/* Beautiful Ministry Graphic Block (Without Bole/Google Map text) */}
        <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-md relative group bg-gray-900 mt-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
          <img
            src="/gallery/IMG_1507.JPG"
            referrerPolicy="no-referrer"
            alt="Kingdom of His Love Fellowship & Ministry"
            className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="p-5 bg-white/95 backdrop-blur-md flex justify-between items-center relative z-20 border-t border-gray-100">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-serif text-sm font-bold text-primary">{t.communityBanner}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
