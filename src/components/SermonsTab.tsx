import { Language, Sermon } from '../types';
import { Search, Play, BookOpen, Clock, User, Calendar } from 'lucide-react';
import { useState } from 'react';

interface SermonsTabProps {
  lang: Language;
  sermons: Sermon[];
  onPlaySermon: (sermon: Sermon) => void;
}

export default function SermonsTab({ lang, sermons, onPlaySermon }: SermonsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering sermons based on search input only
  const filteredSermons = sermons.filter((sermon) => {
    const searchString = `${sermon.title.en} ${sermon.title.am} ${sermon.speaker.en} ${sermon.speaker.am} ${sermon.summary.en} ${sermon.summary.am}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const t = {
    en: {
      heading: 'Divine Teachings',
      tagline: 'Deepen your roots in the Word through our library of sermons and spiritual disclosures.',
      searchPlaceholder: 'Search teachings, speakers, or scriptures...',
      noResults: 'No teachings match your search. Try adjusting your filters.',
      author: 'Delivered by',
      watchTeach: 'Watch Teaching',
      duration: 'Duration',
      scripture: 'Scripture Focus',
    },
    am: {
      heading: 'መንፈሳዊ ትምህርቶች',
      tagline: 'በስብከቶቻችን እና በመንፈሳዊ መግለጫዎቻችን በኩል በቃሉ ውስጥ ስርዎን ያጠናክሩ።',
      searchPlaceholder: 'ስብከቶችን፣ ሰባኪዎችን ወይም ጥቅሶችን ይፈልጉ...',
      noResults: 'ከፍለጋዎ ጋር የሚዛመዱ ትምህርቶች አልተገኙም። እባክዎ ፍለጋዎን ያስተካክሉ።',
      author: 'ሰባኪ፡',
      watchTeach: 'ትምህርቱን ይመልከቱ',
      duration: 'የጊዜ ርዝማኔ',
      scripture: 'የመጽሐፍ ቅዱስ ክፍል',
    }
  }[lang];

  return (
    <div id="sermons-view" className="py-24 bg-background px-6 md:px-12 max-w-7xl mx-auto space-y-12 animate-fade-up">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary">{t.heading}</h1>
        <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed">{t.tagline}</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-6 md:gap-8 items-center border-b border-gray-100 pb-8">
        {/* Search Bar */}
        <div className="relative w-full max-w-2xl shadow-sm rounded-full">
          <input
            id="sermons-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-white border border-gray-200 text-gray-800 rounded-full py-4 pl-12 pr-6 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-sm"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Single All Teachings Badge */}
        <div className="flex justify-center w-full pb-2">
          <div className="px-6 py-2.5 rounded-full bg-primary text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md select-none">
            {lang === 'en' ? 'All Teachings' : 'ሁሉም ትምህርቶች'}
          </div>
        </div>
      </div>

      {/* Sermons Grid */}
      {filteredSermons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredSermons.map((sermon) => (
            <div
              key={sermon.id}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 flex flex-col md:flex-row transition-all duration-300 group"
            >
              {/* Cover Image Side */}
              <div className="w-full md:w-2/5 relative h-56 md:h-auto bg-gray-100">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${sermon.coverUrl}')` }}
                ></div>
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                  <button
                    id={`play-sermon-${sermon.id}`}
                    onClick={() => onPlaySermon(sermon)}
                    className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white group-hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Text / Details Side */}
              <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-sans font-medium">
                    <span className="bg-primary/5 text-primary px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider">
                      {sermon.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{sermon.duration}</span>
                    </span>
                  </div>

                  <h3
                    onClick={() => onPlaySermon(sermon)}
                    className="font-serif text-lg md:text-xl font-bold text-primary group-hover:text-tertiary transition-colors cursor-pointer"
                  >
                    {lang === 'en' ? sermon.title.en : sermon.title.am}
                  </h3>

                  <p className="text-gray-600 font-sans text-xs leading-relaxed line-clamp-3">
                    {lang === 'en' ? sermon.summary.en : sermon.summary.am}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-bold">
                      {t.author}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-tertiary" />
                      <p className="text-xs font-serif font-bold text-primary">
                        {lang === 'en' ? sermon.speaker.en : sermon.speaker.am}
                      </p>
                    </div>
                  </div>

                  {sermon.scripture && (
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-sans font-bold">
                        {t.scripture}
                      </p>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-secondary" />
                        <p className="text-xs font-sans font-bold text-gray-700">
                          {lang === 'en' ? sermon.scripture.en : sermon.scripture.am}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          <p className="text-gray-400 text-sm font-sans mb-4">{t.noResults}</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setActiveCategory('All');
            }}
            className="text-primary font-bold text-xs underline"
          >
            Clear Filters / ሁሉንም አሳይ
          </button>
        </div>
      )}
    </div>
  );
}
