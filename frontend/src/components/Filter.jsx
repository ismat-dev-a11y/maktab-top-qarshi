import { useEffect, useState } from 'react';
import { fetchDistricts } from '../api/client';
import { Search, SlidersHorizontal } from 'lucide-react';

const SCHOOL_TYPES = [
  { value: '', label: 'Barcha turlar' },
  { value: 'private', label: 'Xususiy' },
  { value: 'international', label: 'Xalqaro' },
  { value: 'bilingual', label: 'Bilingual' },
  { value: 'specialized', label: 'Ixtisoslashgan' },
];

export default function Filter({ value, onChange }) {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetchDistricts().then(setDistricts).catch(() => {});
  }, []);

  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <aside className="glass-panel p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg inline-flex items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-brand-600" /> Filtrlash</h3>
        <button
          onClick={() => onChange({})}
          className="text-xs text-brand-600 hover:underline"
        >
          Tozalash
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Qidiruv
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={value.search || ''}
            onChange={e => update({ search: e.target.value })}
            placeholder="Maktab nomi..."
            className="field pl-9"
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Maktab turi
        </label>
        <div className="space-y-1.5">
          {SCHOOL_TYPES.map(t => (
            <label key={t.value} className="flex items-center gap-2 cursor-pointer hover:bg-white px-2 py-1 rounded-lg transition">
              <input
                type="radio"
                name="school_type"
                checked={(value.school_type || '') === t.value}
                onChange={() => update({ school_type: t.value || undefined })}
                className="text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm">{t.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* District */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Tuman
        </label>
        <select
          value={value.district || ''}
          onChange={e => update({ district: e.target.value || undefined })}
          className="field"
        >
          <option value="">Barcha tumanlar</option>
          {districts.map(d => (
            <option key={d.id} value={d.slug}>
              {d.name} ({d.schools_count})
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Oylik narx (so'm)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={value.min_price || ''}
            onChange={e => update({ min_price: e.target.value || undefined })}
            placeholder="Min"
            className="field"
          />
          <input
            type="number"
            value={value.max_price || ''}
            onChange={e => update({ max_price: e.target.value || undefined })}
            placeholder="Max"
            className="field"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Min reyting
        </label>
        <div className="flex gap-1">
          {[0, 3, 4, 4.5].map(r => (
            <button
              key={r}
              onClick={() => update({ min_rating: r || undefined })}
              className={`flex-1 py-1.5 text-sm rounded-lg border transition ${
                (Number(value.min_rating) || 0) === r
                  ? 'border-brand-500 bg-brand-50 text-brand-700 font-semibold'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {r === 0 ? 'Har qanday' : `${r}+ reyting`}
            </button>
          ))}
        </div>
      </div>

      {/* Grade */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Sinf
        </label>
        <select
          value={value.grade || ''}
          onChange={e => update({ grade: e.target.value || undefined })}
          className="field"
        >
          <option value="">Har qanday sinf</option>
          {Array.from({length: 12}, (_, i) => i).map(g => (
            <option key={g} value={g}>
              {g === 0 ? "Bog'cha" : `${g}-sinf`}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
