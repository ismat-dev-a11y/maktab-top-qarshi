import { useEffect, useState } from 'react';
import { fetchDistricts } from '../api/client';

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
    <aside className="bg-white rounded-2xl p-5 shadow-soft border border-slate-100 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-lg">Filtrlash</h3>
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
        <input
          type="text"
          value={value.search || ''}
          onChange={e => update({ search: e.target.value })}
          placeholder="Maktab nomi..."
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
          Maktab turi
        </label>
        <div className="space-y-1.5">
          {SCHOOL_TYPES.map(t => (
            <label key={t.value} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded">
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
          className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none"
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
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 outline-none text-sm"
          />
          <input
            type="number"
            value={value.max_price || ''}
            onChange={e => update({ max_price: e.target.value || undefined })}
            placeholder="Max"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-brand-400 outline-none text-sm"
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
              {r === 0 ? 'Har qanday' : `${r}⭐+`}
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
          className="w-full px-3 py-2 rounded-lg border border-slate-200 outline-none focus:border-brand-400"
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
