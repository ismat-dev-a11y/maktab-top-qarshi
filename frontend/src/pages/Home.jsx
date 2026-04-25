import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedSchools, fetchStats, fetchDistricts } from '../api/client';
import SchoolCard from '../components/SchoolCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [stats, setStats] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchFeaturedSchools(),
      fetchStats(),
      fetchDistricts(),
    ])
      .then(([f, s, d]) => {
        setFeatured(f);
        setStats(s);
        setDistricts(d);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
        </div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"/>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl"/>

        <div className="container-x py-20 md:py-28 relative">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              🎓 Qarshidagi eng to'liq xususiy maktablar katalogi
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6">
              Farzandingiz uchun <span className="text-accent-400">eng yaxshi</span> maktabni toping
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 leading-relaxed">
              Qarshi va O'zbekistondagi xususiy maktablarni qidiring, taqqoslang va ota-onalar sharhlarini o'qing.
              Narxlar, reytinglar va imkoniyatlar bilan tanishing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/maktablar" className="btn bg-white text-brand-700 hover:bg-slate-100 shadow-xl">
                Maktablarni ko'rish
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </Link>
              <Link to="/haqida" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20">
                Ko'proq ma'lumot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container-x -mt-10 relative z-10">
          <div className="bg-white rounded-3xl shadow-card p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Stat value={stats.total_schools} label="Maktablar" icon="🏫"/>
            <Stat value={stats.total_districts} label="Tumanlar" icon="📍"/>
            <Stat value={stats.total_reviews} label="Sharhlar" icon="💬"/>
            <Stat value={stats.avg_rating?.toFixed(1) + '⭐'} label="O'rtacha reyting" icon="🌟"/>
          </div>
        </section>
      )}

      {/* Districts */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-2">
              Tuman bo'yicha qidiring
            </h2>
            <p className="text-slate-600">Qarshining barcha tumanlaridagi maktablar</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {districts.map(d => (
            <Link
              key={d.id}
              to={`/maktablar?district=${d.slug}`}
              className="group bg-white rounded-xl border border-slate-100 p-4 hover:border-brand-400 hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-brand-500 transition-colors">
                <svg className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0L6.343 16.657A8 8 0 1117.657 16.657zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div className="font-semibold text-slate-800 group-hover:text-brand-600 transition-colors">{d.name}</div>
              <div className="text-xs text-slate-500">{d.schools_count} maktab</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured schools */}
      <section className="container-x py-16 border-t border-slate-100">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="inline-block text-xs font-semibold text-accent-600 uppercase tracking-wider mb-2">
              ⭐ Tavsiya etilgan
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold">
              Top maktablar
            </h2>
          </div>
          <Link to="/maktablar" className="btn btn-ghost text-sm">
            Barchasini ko'rish →
          </Link>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-80"/>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(school => <SchoolCard key={school.id} school={school}/>)}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container-x py-16">
        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl"/>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4">
              Farzandingiz uchun mukammal tanlov
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
              25+ xususiy maktab, haqiqiy ota-onalar sharhlari va batafsil ma'lumotlar — hammasi bir joyda.
            </p>
            <Link to="/maktablar" className="btn bg-white text-brand-700 hover:bg-slate-100 text-lg">
              Hozir qidirish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label, icon }) {
  return (
    <div className="text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
