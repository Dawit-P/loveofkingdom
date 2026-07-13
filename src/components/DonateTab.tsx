import { Language } from '../types';
import { Copy, Check, Heart, Shield, Gift, Sparkles } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DonateTabProps {
  lang: Language;
}

export default function DonateTab({ lang }: DonateTabProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [donorAmount, setDonorAmount] = useState('1000');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedProject, setSelectedProject] = useState('General');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const bankAccounts = [
    {
      id: 'cbe',
      bankName: { en: 'Commercial Bank of Ethiopia (CBE)', am: 'የኢትዮጵያ ንግድ ባንክ (ንግድ ባንክ)' },
      accountName: { en: 'Firaol Tesfahun', am: 'ፊራኦል ተስፋሁን' },
      accountNo: '1000709675021',
      logo: '/gallery/media__1783860205220.jpg'
    },
    {
      id: 'telebirr',
      bankName: { en: 'Telebirr (Mobile Wallet)', am: 'ቴሌብር' },
      accountName: { en: 'Selam Sedik', am: 'ሰላም ሳዲቅ' },
      accountNo: '0923359640',
      logo: '/gallery/media__1783860205227.jpg'
    }
  ];

  const handleCopy = (id: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 3000);
  };

  const handleDonateSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  const finalAmount = donorAmount === 'custom' ? customAmount : donorAmount;

  const t = {
    en: {
      heading: 'Partnership in Grace',
      tagline: 'Your seed of support expands the physical and digital reach of the Gospel. Partner with us to build a legacy of divine love.',
      bankHeader: 'Direct Bank Transfers',
      bankDesc: 'Click on any account number to copy it instantly for your bank app.',
      accNameLabel: 'Account Name:',
      copiedText: 'Copied!',
      simulateHeader: 'Declare Your Support',
      simulateDesc: 'Specify your details to pledge/simulated contribution to specific kingdom projects.',
      lblDonorName: 'Your Full Name (Optional)',
      lblProject: 'Kingdom Project Focus',
      lblAmount: 'Support Amount (Birr)',
      lblCustomAmount: 'Custom Amount (Birr)',
      projGen: 'General Ministry Fund',
      projHall: 'New Worship Sanctuary Building',
      projChar: 'Outreach, Orphans & Elder Care',
      btnSupport: 'Submit Support Pledge',
      successTitle: 'Heavenly Gratitude!',
      successDesc: `We have prepared a customized prayer of gratitude in your honor. Thank you, ${donorName || 'Beloved Partner'}, for pledging ${finalAmount} Birr to the ${selectedProject} project. May the windows of heaven pour out boundless blessings upon your life!`,
      successClose: 'Register Another Support',
      infoTitle: 'Sovereign Stewardship',
      infoDesc: 'All offerings are handled with utmost transparency, oversight from the church council, and dedicated purely to spiritual stewardship.',
    },
    am: {
      heading: 'በጸጋው መጋቢነት መተባበር',
      tagline: 'የደገፉት ዘር የወንጌልን አካላዊ እና ዲጂታል ተደራሽነት ያስፋፋል። የዘላለም የመለኮታዊ ፍቅር አሻራ ለመተው ከእኛ ጋር አብረው ይሥሩ።',
      bankHeader: 'ቀጥታ የባንክ ሂሳቦች',
      bankDesc: 'የባንክ መተግበሪያዎን ለመጠቀም ማንኛውንም የሂሳብ ቁጥር ሲጫኑ ወዲያውኑ ኮፒ ይደረጋል።',
      accNameLabel: 'የሂሳብ ስም፡',
      copiedText: 'ኮፒ ተደርጓል!',
      simulateHeader: 'የድጋፍዎን አይነት ይምረጡ',
      simulateDesc: 'የተወሰኑ የመንግሥቱን ፕሮጀክቶች ለመደገፍ ዝርዝሮችዎን እዚህ ያስገቡ።',
      lblDonorName: 'ሙሉ ስምዎ (ካለዎት)',
      lblProject: 'የመንግሥቱ ፕሮጀክት ዘርፍ',
      lblAmount: 'የድጋፍ መጠን (በብር)',
      lblCustomAmount: 'የተለየ የብር መጠን',
      projGen: 'ለአጠቃላይ አገልግሎት ፈንድ',
      projHall: 'ለአዲሱ ቤተ-መቅደስ ግንባታ',
      projChar: 'ለረድኤት፣ ወላጅ አልባ እና አረጋውያን እንክብካቤ',
      btnSupport: 'የድጋፍ ቃልኪዳን አስገባ',
      successTitle: 'የሰማይ በረከት ይብዛልዎ!',
      successDesc: `በስምዎ ልዩ የምስጋና የጸሎት መዝገብ አዘጋጅተናል። ${donorName || 'የተከበሩ አጋራችን'}፣ ለ${selectedProject} ፕሮጀክት ${finalAmount} ብር ለመደገፍ ቃል ስለገቡ እናመሰግናለን። የሰማይ መስኮቶች በማያልቅ በረከት በሕይወትዎ ላይ ይከፈቱ!`,
      successClose: 'ሌላ ድጋፍ ይመዝግቡ',
      infoTitle: 'ታማኝ መጋቢነት',
      infoDesc: 'ማንኛውም መዋጮ በከፍተኛ ግልጽነት፣ በቤተክርስቲያኑ ምክር ቤት ቁጥጥር ስር እና ለመንፈሳዊ አገልግሎቶች ብቻ የሚውል ነው።',
    }
  }[lang];

  return (
    <div id="donate-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-fade-up">
      {/* Header */}
      <div className="lg:col-span-12 text-center max-w-3xl mx-auto space-y-4 mb-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>

      {/* Bank details list (Left 6 Columns) */}
      <div className="lg:col-span-6 space-y-6">
        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold text-primary">{t.bankHeader}</h2>
          <p className="text-gray-400 font-sans text-xs">{t.bankDesc}</p>
        </div>

        <div className="space-y-6">
          {bankAccounts.map((acc) => (
            <div
              key={acc.id}
              onClick={() => handleCopy(acc.id, acc.accountNo)}
              className="bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 hover:border-primary/30 cursor-pointer transition-all duration-300 group relative overflow-hidden flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                  <img
                    src={acc.logo}
                    referrerPolicy="no-referrer"
                    alt={acc.id}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="font-serif text-sm font-bold text-primary">
                    {lang === 'en' ? acc.bankName.en : acc.bankName.am}
                  </h4>
                  <p className="text-[11px] text-gray-400 font-sans">
                    <span className="font-semibold">{t.accNameLabel}</span>{' '}
                    {lang === 'en' ? acc.accountName.en : acc.accountName.am}
                  </p>
                  <p className="font-mono text-sm font-bold text-gray-700 tracking-wider">
                    {acc.accountNo}
                  </p>
                </div>
              </div>

              {/* Copy indicator */}
              <button
                id={`copy-btn-${acc.id}`}
                className="p-2 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer"
                aria-label="Copy account number"
              >
                {copiedId === acc.id ? (
                  <span className="text-[9px] font-sans font-extrabold tracking-wider uppercase px-1 text-green-500 group-hover:text-white flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{t.copiedText}</span>
                  </span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Stewardship Note */}
        <div className="bg-primary/5 rounded-[32px] p-6 flex gap-4 items-start border border-primary/10">
          <Shield className="w-6 h-6 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif text-sm font-bold text-primary">{t.infoTitle}</h4>
            <p className="text-gray-500 font-sans text-xs leading-relaxed">{t.infoDesc}</p>
          </div>
        </div>
      </div>

      {/* Interactive simulation form (Right 6 Columns) */}
      <div className="lg:col-span-6">
        <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 space-y-6">
          {!success ? (
            <form onSubmit={handleDonateSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <h2 className="font-serif text-xl font-bold text-primary">{t.simulateHeader}</h2>
                <p className="text-gray-400 font-sans text-xs">{t.simulateDesc}</p>
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblDonorName}</label>
                  <input
                    id="donate-donor-name"
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                  />
                </div>

                {/* Project Focus */}
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblProject}</label>
                  <select
                    id="donate-project-select"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white cursor-pointer"
                  >
                    <option value={t.projGen}>{t.projGen}</option>
                    <option value={t.projHall}>{t.projHall}</option>
                    <option value={t.projChar}>{t.projChar}</option>
                  </select>
                </div>

                {/* Amount Select Grid */}
                <div className="space-y-2">
                  <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblAmount}</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['200', '500', '1000', '5000'].map((amount) => (
                      <button
                        id={`amount-preset-${amount}`}
                        type="button"
                        key={amount}
                        onClick={() => {
                          setDonorAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`py-3 rounded-xl font-sans font-extrabold text-xs transition-all cursor-pointer ${
                          donorAmount === amount
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        {amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom Option Toggle */}
                  <button
                    id="amount-preset-custom"
                    type="button"
                    onClick={() => setDonorAmount('custom')}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold font-sans border cursor-pointer mt-2 ${
                      donorAmount === 'custom'
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-dashed border-gray-300 text-gray-400 hover:border-gray-400'
                    }`}
                  >
                    + Custom / ሌላ መጠን
                  </button>
                </div>

                {/* Custom Amount Input */}
                <AnimatePresence>
                  {donorAmount === 'custom' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="text-xs font-sans font-bold text-gray-700 block">{t.lblCustomAmount}</label>
                      <input
                        id="donate-custom-amount"
                        type="number"
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <button
                id="donate-submit-btn"
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-tertiary hover:bg-tertiary/90 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    <span>{t.btnSupport}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-tertiary-container/20 text-tertiary rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">
                  {t.successTitle}
                </h3>
                <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed p-2 bg-gray-50 rounded-2xl italic border-l-4 border-tertiary">
                  {t.successDesc}
                </p>
              </div>
              <button
                id="donate-success-close-btn"
                onClick={() => {
                  setSuccess(false);
                  setDonorName('');
                  setDonorAmount('1000');
                  setCustomAmount('');
                }}
                className="w-full py-3 bg-primary text-white hover:bg-primary-container rounded-xl font-bold text-xs shadow-md cursor-pointer transition-colors"
              >
                <Heart className="w-4 h-4 fill-current inline-block mr-1" />
                <span>{t.successClose}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
