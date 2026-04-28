import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFeaturedSchools, fetchStats, fetchDistricts } from '../api/client';
import SchoolCard from '../components/SchoolCard';
import { ArrowRight, Building2, MapPin, MessageCircleMore, Sparkles, Star } from 'lucide-react';
import heroBgImage from '../assets/image.png';

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
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-slate-900 text-white shadow-card">
        <img
          src={heroBgImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-slate-900/65" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl"/>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-brand-400/15 rounded-full blur-3xl"/>

        <div className="container-x py-20 md:py-40 relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <Sparkles className="h-4 w-4 text-accent-300" />
              Qarshidagi eng to'liq xususiy maktablar katalogi
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold leading-tight mb-6 drop-shadow-sm">
              Farzandingiz uchun <span className="text-accent-400">eng yaxshi</span> maktabni toping
            </h1>
            <p className="text-lg md:text-xl text-brand-100 mb-8 leading-relaxed">
              Qarshi va O'zbekistondagi xususiy maktablarni qidiring, taqqoslang va ota-onalar sharhlarini o'qing.
              Narxlar, reytinglar va imkoniyatlar bilan tanishing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/schools" className="btn bg-white text-brand-700 hover:bg-slate-100 shadow-xl">
                Maktablarni ko'rish
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link to="/about" className="btn bg-white/15 hover:bg-white/25 text-white border border-white/30">
                Ko'proq ma'lumot
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container-x mt-8 relative z-10">
          <div className="glass-panel p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <Stat value={stats.total_schools} label="Maktablar" icon={<Building2 className="h-5 w-5" />} />
            <Stat value={stats.total_districts} label="Tumanlar" icon={<MapPin className="h-5 w-5" />} />
            <Stat value={stats.total_reviews} label="Sharhlar" icon={<MessageCircleMore className="h-5 w-5" />} />
            <Stat value={stats.avg_rating?.toFixed(1)} label="O'rtacha reyting" icon={<Star className="h-5 w-5" />} />
          </div>
        </section>
      )}

      {/* Districts */}
      <section className="container-x py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">
              Tuman bo'yicha qidiring
            </h2>
            <p className="text-slate-600">Qarshining barcha tumanlaridagi maktablar</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {districts.map(d => (
            <Link
              key={d.id}
              to={`/schools?district=${d.slug}`}
              className="group card p-4 hover:border-brand-300 hover:-translate-y-0.5 transition"
            >
              <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center mb-2 group-hover:bg-brand-500 transition-colors">
                <MapPin className="w-5 h-5 text-brand-600 group-hover:text-white transition-colors" />
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
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-600 uppercase tracking-wider mb-2">
              <Star className="h-3.5 w-3.5" /> Tavsiya etilgan
            </span>
            <h2 className="section-title">
              Top maktablar
            </h2>
          </div>
          <Link to="/schools" className="btn btn-ghost text-sm">
            Barchasini ko'rish <ArrowRight className="ml-1 h-4 w-4" />
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
        <div className="bg-brand-700 rounded-3xl p-8 md:p-12 text-white text-center relative overflow-hidden shadow-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/25 rounded-full blur-3xl"/>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4">
              Farzandingiz uchun mukammal tanlov
            </h2>
            <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">
              25+ xususiy maktab, haqiqiy ota-onalar sharhlari va batafsil ma'lumotlar — hammasi bir joyda.
            </p>
            <Link to="/schools" className="btn bg-white text-brand-700 hover:bg-slate-100 text-lg">
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
      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">{icon}</div>
      <div className="text-2xl md:text-3xl font-display font-extrabold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
