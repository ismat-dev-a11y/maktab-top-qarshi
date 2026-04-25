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

export default function SchoolCard({ school }) {
  const {
    slug, name, short_description, school_type, district, address,
    monthly_price_uzs, min_grade, max_grade, rating, reviews_count,
    logo, cover_image, languages, top_features, is_verified, is_featured,
  } = school;

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
          <span className="truncate">{district || 'Qarshi'}, {address}</span>
        </div>

        {top_features?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {top_features.slice(0, 3).map((f, i) => (
              <span key={i} className="badge bg-slate-100 text-slate-600">{f}</span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">{gradeRange(min_grade, max_grade)}</div>
            <div className="font-bold text-brand-600 text-sm">
              {monthly_price_uzs
                ? new Intl.NumberFormat('uz-UZ').format(monthly_price_uzs) + " so'm"
                : 'Narx ko\'rsatilmagan'}
              {monthly_price_uzs && <span className="text-xs text-slate-400 font-normal"> /oy</span>}
            </div>
          </div>
          <div className="text-xs text-slate-500">
            {reviews_count} sharh
          </div>
        </div>
      </div>
    </Link>
  );
}
