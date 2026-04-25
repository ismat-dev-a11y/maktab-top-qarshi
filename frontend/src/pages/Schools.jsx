import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSchools } from '../api/client';
import SchoolCard from '../components/SchoolCard';
import Filter from '../components/Filter';

export default function Schools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ results: [], count: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [ordering, setOrdering] = useState('-rating');

  const filters = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    setLoading(true);
    const params = { ...filters, page, ordering };
    fetchSchools(params)
      .then(setData)
      .finally(() => setLoading(false));
  }, [searchParams, page, ordering]);

  const updateFilter = (newFilter) => {
    // Clean undefined
    const clean = Object.fromEntries(
      Object.entries(newFilter).filter(([_, v]) => v !== undefined && v !== '')
    );
    setPage(1);
    setSearchParams(clean);
  };

  const totalPages = Math.ceil(data.count / 12);

  return (
    <div className="container-x py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
          Xususiy maktablar
        </h1>
        <p className="text-slate-600">
          {data.count} ta maktab topildi
        </p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Sidebar */}
        <div>
          <Filter value={filters} onChange={updateFilter}/>
        </div>

        {/* Results */}
        <div>
          {/* Toolbar */}
          <div className="bg-white rounded-xl p-3 flex items-center justify-between mb-4 border border-slate-100">
            <span className="text-sm text-slate-600 px-2">
              Natijalar: <span className="font-semibold text-slate-900">{data.count}</span>
            </span>
            <select
              value={ordering}
              onChange={e => setOrdering(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-brand-400"
            >
              <option value="-rating">Reytingi bo'yicha ↓</option>
              <option value="monthly_price_uzs">Narx ↑</option>
              <option value="-monthly_price_uzs">Narx ↓</option>
              <option value="-reviews_count">Ko'p sharhlar</option>
              <option value="name">A-Z</option>
            </select>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100"/>
              ))}
            </div>
          ) : data.results.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-display font-bold text-xl mb-2">Hech narsa topilmadi</h3>
              <p className="text-slate-600 mb-4">Filtrlarni o'zgartirib qayta urinib ko'ring.</p>
              <button
                onClick={() => setSearchParams({})}
                className="btn btn-primary"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {data.results.map(s => <SchoolCard key={s.id} school={s}/>)}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="btn btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Oldingi
                  </button>
                  <span className="px-4 py-2 text-sm font-medium">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="btn btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Keyingi →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
