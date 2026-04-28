import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSchools } from '../api/client';
import SchoolCard from '../components/SchoolCard';
import Filter from '../components/Filter';
import { ArrowLeft, ArrowRight, SearchX, SlidersHorizontal } from 'lucide-react';

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
    <div className="container-x py-10 animate-fade-in">
      <div className="mb-8">
        <h1 className="section-title mb-2">
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
          <div className="glass-panel p-3 flex items-center justify-between mb-4">
            <span className="text-sm text-slate-600 px-2">
              Natijalar: <span className="font-semibold text-slate-900">{data.count}</span>
            </span>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-slate-500" />
              <select
                value={ordering}
                onChange={e => setOrdering(e.target.value)}
                className="field !h-9 !w-auto !py-0"
              >
                <option value="-rating">Reytingi bo'yicha ↓</option>
                <option value="monthly_price_uzs">Narx ↑</option>
                <option value="-monthly_price_uzs">Narx ↓</option>
                <option value="-reviews_count">Ko'p sharhlar</option>
                <option value="name">A-Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {Array.from({length: 6}).map((_, i) => (
                <div key={i} className="card h-80 animate-pulse"/>
              ))}
            </div>
          ) : data.results.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="mb-4 flex justify-center"><SearchX className="h-12 w-12 text-slate-400" /></div>
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
                    <ArrowLeft className="mr-1 h-4 w-4" /> Oldingi
                  </button>
                  <span className="px-4 py-2 text-sm font-medium">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="btn btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Keyingi <ArrowRight className="ml-1 h-4 w-4" />
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
