import { Language } from '../types';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
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
      detailsHeader: 'Headquarters Location',
      addressLabel: 'Address:',
      addressVal: 'Bole District, Behind Cameroon Street, Addis Ababa, Ethiopia',
      phoneLabel: 'Pastoral Office:',
      phoneVal: '+251 11 661 0000',
      emailLabel: 'General Inquiries:',
      emailVal: 'info@kingdomofhislove.org',
      hoursLabel: 'Administrative Hours:',
      hoursVal: 'Monday - Friday, 09:00 - 17:00 (EAT)',
      mapCta: 'Open Directions in Google Maps',
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
      detailsHeader: 'የአገልግሎቱ ዋና መስሪያ ቤት',
      addressLabel: 'አድራሻ፡',
      addressVal: 'ቦሌ ክፍለ ከተማ፣ ከካሜሩን መንገድ ጀርባ፣ አዲስ አበባ፣ ኢትዮጵያ',
      phoneLabel: 'የፓስተር ቢሮ፡',
      phoneVal: '+251 11 661 0000',
      emailLabel: 'አጠቃላይ መጠይቆች፡',
      emailVal: 'info@kingdomofhislove.org',
      hoursLabel: 'የቢሮ የሥራ ሰዓታት፡',
      hoursVal: 'ከሰኞ - አርብ፣ ከጠዋቱ 3:00 - 11:00 (በኢትዮጵያ ሰዓት)',
      mapCta: 'የአቅጣጫ ካርታውን በጎግል ማፕ ክፈት',
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

      {/* Info & Map Display (Right 6 Columns) */}
      <div className="lg:col-span-6 space-y-8 text-left">
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-primary">{t.detailsHeader}</h2>

          <div className="space-y-4 text-sm font-sans text-gray-600">
            {/* Address */}
            <div className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <strong>{t.addressLabel}</strong>
                <p className="mt-0.5">{t.addressVal}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3 items-start">
              <Phone className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div>
                <strong>{t.phoneLabel}</strong>
                <p className="mt-0.5">{t.phoneVal}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-3 items-start">
              <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>{t.emailLabel}</strong>
                <p className="mt-0.5">{t.emailVal}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-3 items-start">
              <Clock className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <strong>{t.hoursLabel}</strong>
                <p className="mt-0.5">{t.hoursVal}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Beautiful Map Graphic Block */}
        <div className="rounded-[32px] overflow-hidden border border-gray-200 shadow-sm relative group bg-gray-100">
          <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          <img
            src="/gallery/IMG_1507.JPG"
            referrerPolicy="no-referrer"
            alt="Bole District Map Layout"
            className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="p-4 bg-white flex justify-between items-center relative z-20">
            <span className="font-serif text-xs font-bold text-primary">Bole District, Addis Ababa</span>
            <a
              id="google-maps-directions-link"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans font-bold text-tertiary hover:text-primary transition-colors flex items-center gap-1"
            >
              <span>{t.mapCta}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
