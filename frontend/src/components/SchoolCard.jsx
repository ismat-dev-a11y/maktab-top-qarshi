import { Link } from 'react-router-dom';
import { formatPrice, gradeRange } from '../api/client';

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

// ── Telegram SVG icon (ko'k paper plane) ──
function TelegramIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-[#229ED9]`} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.667l-2.95-.924c-.64-.203-.657-.64.136-.954l11.57-4.461c.537-.194 1.006.131.968.893z"/>
    </svg>
  );
}

// ── Instagram SVG icon (gradient kamera) ──
// Gradient ID noyob bo'lishi kerak — har bir card uchun unikal id
function InstagramIcon({ className = 'w-4 h-4', gradId = 'ig-card-grad' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="25%" stopColor="#e6683c"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="75%" stopColor="#cc2366"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path fill={`url(#${gradId})`} d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export default function SchoolCard({ school }) {
  const {
    id, slug, name, short_description, school_type, district, address,
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
      to={`/maktablar/${slug}`}
      className="group bg-white rounded-2xl shadow-soft hover:shadow-card border border-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Cover image */}
      <div className="relative h-40 bg-gradient-to-br from-brand-100 to-brand-300 overflow-hidden">
        {cover_image ? (
          <img src={cover_image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-brand-600/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={`badge ${TYPE_COLORS[school_type] || 'bg-slate-100 text-slate-700'}`}>
            {TYPE_LABELS[school_type] || school_type}
          </span>
          {is_featured && (
            <span className="badge bg-accent-500 text-white">⭐ Top</span>
          )}
        </div>

        {is_verified && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md" title="Tasdiqlangan">
            <svg className="w-5 h-5 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-sm font-bold text-slate-800">{Number(rating).toFixed(1)}</span>
          </div>
        </div>

        {short_description && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {short_description}
          </p>
        )}

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0L6.343 16.657A8 8 0 1117.657 16.657zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span className="truncate">{district || 'Toshkent'}, {address}</span>
        </div>

        {top_features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {top_features.slice(0, 3).map((f, i) => (
              <span key={i} className="badge bg-slate-100 text-slate-600">{f}</span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
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
                <TelegramIcon className="w-5 h-5"/>
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
                <InstagramIcon className="w-5 h-5" gradId={`ig-card-${id || slug}`}/>
              </a>
            )}
            <span className="text-xs text-slate-500 ml-1 whitespace-nowrap">
              {reviews_count} sharh
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}