import { Link } from 'react-router-dom';
import { gradeRange } from '../api/client';
import { BadgeCheck, Building2, Camera, MapPin, MessageCircle, Send, Star } from 'lucide-react';

const TYPE_LABELS = {
  private: 'Xususiy',
  international: 'Xalqaro',
  bilingual: 'Bilingual',
  specialized: 'Ixtisoslashgan',
};

const TYPE_COLORS = {
  private: 'bg-blue-100 text-blue-700',
  international: 'bg-purple-100 text-purple-700',
  bilingual: 'bg-emerald-100 text-emerald-700',
  specialized: 'bg-amber-100 text-amber-700',
};

// ── Telegram URL: @username yoki to'liq URL ni qo'llab-quvvatlaydi ──
function telegramUrl(value) {
  if (!value) return '';
  const v = value.trim();
  if (v.startsWith('http')) return v;
  return `https://t.me/${v.replace(/^@/, '')}`;
}

// ── Instagram URL: @username yoki to'liq URL ni qo'llab-quvvatlaydi ──
function instagramUrl(value) {
  if (!value) return '';
  const v = value.trim();
  if (v.startsWith('http')) return v;
  return `https://instagram.com/${v.replace(/^@/, '')}`;
}


export default function SchoolCard({ school }) {
  const {
    slug, name, short_description, school_type, district, address,
    monthly_price_uzs, min_grade, max_grade, rating, reviews_count,
    logo, cover_image, languages, top_features, is_verified, is_featured,
    telegram, instagram,
  } = school;

  // Card ichidagi link bosilganida cardning ustki Link'i ham trigger bo'lmasligi uchun
  const stop = (e) => {
    e.stopPropagation();
  };

  return (
    <Link
      to={`/schools/${slug}`}
      className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-44 bg-brand-100 overflow-hidden">
        {cover_image ? (
          <img src={cover_image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building2 className="w-16 h-16 text-brand-600/30" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={`badge ${TYPE_COLORS[school_type] || 'bg-slate-100 text-slate-700'}`}>
            {TYPE_LABELS[school_type] || school_type}
          </span>
          {is_featured && (
            <span className="badge bg-accent-500 text-white"><Star className="mr-1 h-3.5 w-3.5" /> Top</span>
          )}
        </div>

        {is_verified && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-soft" title="Tasdiqlangan">
            <BadgeCheck className="w-5 h-5 text-brand-600" />
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0 border border-amber-100">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-slate-800">{Number(rating).toFixed(1)}</span>
          </div>
        </div>

        {short_description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {short_description}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{district || 'Toshkent'}, {address}</span>
        </div>

        {top_features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {top_features.slice(0, 3).map((f, i) => (
              <span key={i} className="badge bg-slate-100 text-slate-600">{f}</span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100/90 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-xs text-slate-500">{gradeRange(min_grade, max_grade)}</div>
            <div className="font-bold text-brand-600 text-sm truncate">
              {monthly_price_uzs
                ? new Intl.NumberFormat('uz-UZ').format(monthly_price_uzs) + " so'm"
                : 'Narx ko\'rsatilmagan'}
              {monthly_price_uzs && <span className="text-xs text-slate-400 font-normal"> /oy</span>}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {telegram && (
              <a
                href={telegramUrl(telegram)}
                target="_blank"
                rel="noreferrer"
                onClick={stop}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-50 hover:bg-sky-100 transition"
                title={`Telegram: ${telegram}`}
              >
                <Send className="w-4 h-4 text-sky-600" />
              </a>
            )}
            {instagram && (
              <a
                href={instagramUrl(instagram)}
                target="_blank"
                rel="noreferrer"
                onClick={stop}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-pink-50 hover:bg-pink-100 transition"
                title={`Instagram: ${instagram}`}
              >
                <Camera className="w-4 h-4 text-pink-600" />
              </a>
            )}
            <span className="text-xs text-slate-500 ml-1 whitespace-nowrap flex items-center gap-1">
              <MessageCircle className="h-3.5 w-3.5" /> {reviews_count} sharh
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}