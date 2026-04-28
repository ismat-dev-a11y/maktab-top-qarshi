import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchSchool, postReview, formatPrice, gradeRange } from '../api/client';
import { BadgeCheck, Clock3, Globe, Mail, MapPin, Phone, Send, Star, Wallet } from 'lucide-react';

const TYPE_LABELS = {
  private: 'Xususiy',
  international: 'Xalqaro',
  bilingual: 'Bilingual',
  specialized: 'Ixtisoslashgan',
};

export default function SchoolDetail() {
  const { slug } = useParams();
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    fetchSchool(slug)
      .then(setSchool)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container-x py-8">
        <div className="bg-white rounded-2xl h-96 animate-pulse"/>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="container-x py-20 text-center">
        <div className="mb-4 flex justify-center"><MapPin className="h-12 w-12 text-slate-400" /></div>
        <h2 className="text-2xl font-display font-bold mb-2">Maktab topilmadi</h2>
        <Link to="/schools" className="btn btn-primary mt-4">Barcha maktablar</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero cover */}
      <div className="relative h-64 md:h-80 bg-brand-700 overflow-hidden">
        {school.cover_image && (
          <img src={school.cover_image} alt={school.name} className="absolute inset-0 w-full h-full object-cover opacity-40"/>
        )}
        <div className="absolute inset-0 bg-slate-900/45"/>
      </div>

      <div className="container-x -mt-32 relative pb-16">
        <div className="card rounded-3xl shadow-card overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-slate-100">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-brand-100 text-brand-700">
                    {TYPE_LABELS[school.school_type]}
                  </span>
                  {school.is_verified && (
                    <span className="badge bg-emerald-100 text-emerald-700"><BadgeCheck className="mr-1 h-3.5 w-3.5" /> Tasdiqlangan</span>
                  )}
                  {school.is_featured && (
                    <span className="badge bg-accent-500 text-white"><Star className="mr-1 h-3.5 w-3.5" /> Top tanlov</span>
                  )}
                </div>
                <h1 className="text-2xl md:text-4xl font-display font-extrabold text-slate-900 mb-2">
                  {school.name}
                </h1>
                <p className="text-slate-600 text-lg">{school.short_description}</p>
              </div>

              <div className="flex items-center gap-4 bg-amber-50 px-5 py-3 rounded-2xl border border-amber-200">
                <Star className="h-8 w-8 text-amber-500 fill-amber-500" />
                <div>
                  <div className="font-display font-extrabold text-3xl text-slate-900">
                    {Number(school.rating).toFixed(1)}
                  </div>
                  <div className="text-xs text-slate-600">{school.reviews_count} sharh</div>
                </div>
              </div>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <InfoBox icon={Wallet} label="Oylik narx" value={
                school.monthly_price_uzs ? formatPrice(school.monthly_price_uzs) : "Kelishilgan"
              }/>
              <InfoBox icon={BadgeCheck} label="Sinflar" value={gradeRange(school.min_grade, school.max_grade)}/>
              <InfoBox icon={Clock3} label="Dars vaqti" value={
                school.start_time && school.end_time
                  ? `${school.start_time.slice(0,5)} - ${school.end_time.slice(0,5)}`
                  : '-'
              }/>
              <InfoBox icon={MapPin} label="Tuman" value={school.district?.name || '-'}/>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-100 px-6 md:px-8">
            <div className="flex gap-1 overflow-x-auto">
              {[
                ['description', 'Tavsif'],
                ['features', 'Imkoniyatlar'],
                ['contact', 'Aloqa'],
                ['reviews', `Sharhlar (${school.reviews?.length || 0})`],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                    tab === key
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            {tab === 'description' && (
              <div className="space-y-6">
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                  {school.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {school.founded_year && (
                    <Detail label="Tashkil topgan yili" value={school.founded_year}/>
                  )}
                  {school.meals_per_day > 0 && (
                    <Detail label="Kunlik ovqatlanish" value={`${school.meals_per_day} mahal`}/>
                  )}
                  {school.max_students_per_class && (
                    <Detail label="Sinfdagi o'quvchilar" value={`${school.max_students_per_class} tagacha`}/>
                  )}
                  {school.entry_fee_uzs && (
                    <Detail label="Kirish to'lovi" value={formatPrice(school.entry_fee_uzs).replace('/oy', '')}/>
                  )}
                </div>

                {school.languages?.length > 0 && (
                  <Section title="Ta'lim tillari">
                    <div className="flex flex-wrap gap-2">
                      {school.languages.map(l => (
                        <span key={l.id} className="badge bg-blue-100 text-blue-700 px-3 py-1">
                          {l.name}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}

                {school.curriculums?.length > 0 && (
                  <Section title="O'quv dasturlari">
                    <div className="flex flex-wrap gap-2">
                      {school.curriculums.map(c => (
                        <span key={c.id} className="badge bg-purple-100 text-purple-700 px-3 py-1">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  </Section>
                )}
              </div>
            )}

            {tab === 'features' && (
              <div>
                {school.features?.length === 0 ? (
                  <p className="text-slate-500">Imkoniyatlar ro'yxati mavjud emas</p>
                ) : (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {school.features.map(f => (
                      <div key={f.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <div className="text-2xl">{f.icon || '✓'}</div>
                        <div className="font-medium text-slate-800">{f.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'contact' && (
              <div className="space-y-6">
                {/* Contact info rows */}
                <div className="space-y-3 max-w-xl">
                  {school.phone && (
                    <ContactRow icon={Phone} label="Telefon" value={school.phone}
                                href={`tel:${school.phone.replace(/\s/g, '')}`}/>
                  )}
                  {school.phone2 && (
                    <ContactRow icon={Phone} label="Qo'shimcha telefon" value={school.phone2}
                                href={`tel:${school.phone2.replace(/\s/g, '')}`}/>
                  )}
                  {school.email && (
                    <ContactRow icon={Mail} label="Email" value={school.email}
                                href={`mailto:${school.email}`}/>
                  )}
                  {school.website && (
                    <ContactRow icon={Globe} label="Veb-sayt" value={school.website}
                                href={school.website}/>
                  )}

                  {/* ── Telegram ── */}
                  {school.telegram && (
                    <ContactRow
                      icon={Send}
                      label="Telegram"
                      value={
                        school.telegram.startsWith('@')
                          ? school.telegram
                          : `@${school.telegram.replace(/^https?:\/\/t\.me\//, '')}`
                      }
                      href={
                        school.telegram.startsWith('http')
                          ? school.telegram
                          : `https://t.me/${school.telegram.replace(/^@/, '')}`
                      }
                    />
                  )}

                  {/* ── Instagram ── */}
                  {school.instagram && (
                    <ContactRow
                      icon={Globe}
                      label="Instagram"
                      value={
                        school.instagram.startsWith('@')
                          ? school.instagram
                          : `@${school.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, '').replace(/\/$/, '')}`
                      }
                      href={
                        school.instagram.startsWith('http')
                          ? school.instagram
                          : `https://instagram.com/${school.instagram.replace(/^@/, '')}`
                      }
                    />
                  )}

                  {school.address && (
                    <ContactRow icon={MapPin} label="Manzil" value={
                      `${school.district?.name || ''}, ${school.address}`
                    }/>
                  )}
                </div>

                {/* ── Location Map — nom va manzil bo'yicha, lat/lng shart emas ── */}
                <LocationMap
                  lat={school.latitude}
                  lng={school.longitude}
                  name={school.name}
                  address={school.address}
                  district={school.district?.name}
                />
              </div>
            )}

            {tab === 'reviews' && (
              <div>
                <ReviewSection school={school} onReload={() => fetchSchool(slug).then(setSchool)}/>
              </div>
            )}
          </div>
        </div>

        <Link to="/schools" className="inline-flex items-center gap-2 mt-6 text-brand-600 hover:underline">
          ← Barcha maktablarga qaytish
        </Link>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="font-semibold text-slate-800 text-sm">{value}</div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-100">
      <span className="text-slate-500 text-sm">{label}:</span>
      <span className="font-medium text-slate-800 text-sm">{value}</span>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="font-display font-bold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
      <div className="flex-shrink-0 flex items-center justify-center w-8 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="font-medium text-brand-600 hover:underline break-all">
            {value}
          </a>
        ) : (
          <div className="font-medium text-slate-800">{value}</div>
        )}
      </div>
    </div>
  );
}

// ── Xarita komponenti ──
// lat/lng bo'lsa — koordinatalar, bo'lmasa — nom+manzil bo'yicha qidiruv.
function LocationMap({ lat, lng, name, address, district }) {
  const hasCoords = lat && lng;
  const searchQuery = encodeURIComponent(
    [name, district, address, 'Uzbekistan'].filter(Boolean).join(', ')
  );
  const src = hasCoords
    ? `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`
    : `https://maps.google.com/maps?q=${searchQuery}&z=15&output=embed`;
  const mapsHref = hasCoords
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : `https://www.google.com/maps/search/${searchQuery}`;

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <MapPin className="h-4 w-4 text-brand-600" /> Maktab joylashuvi
        </div>
        <a
          href={mapsHref}
          target="_blank"
          rel="noreferrer"
          className="text-xs text-brand-600 hover:underline font-medium"
        >
          Google Maps'da ochish →
        </a>
      </div>
      <iframe
        title={`${name} joylashuvi`}
        src={src}
        width="100%"
        height="320"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function ReviewSection({ school, onReload }) {
  const [form, setForm] = useState({ author_name: '', rating: 5, text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!form.author_name.trim() || !form.text.trim()) {
      setMsg('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }
    setSubmitting(true);
    setMsg('');
    try {
      await postReview(school.slug, form);
      setForm({ author_name: '', rating: 5, text: '' });
      setMsg('✓ Sharhingiz qo\'shildi!');
      onReload();
    } catch {
      setMsg('✗ Xatolik yuz berdi');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add review */}
      <form onSubmit={submit} className="card p-5">
        <h3 className="font-display font-bold text-lg mb-3">Sharh qoldiring</h3>
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={form.author_name}
            onChange={e => setForm(f => ({...f, author_name: e.target.value}))}
            placeholder="Ismingiz"
            className="field"
            required
          />
          <select
            value={form.rating}
            onChange={e => setForm(f => ({...f, rating: +e.target.value}))}
            className="field"
          >
            {[5,4,3,2,1].map(r => (
              <option key={r} value={r}>{r} / 5</option>
            ))}
          </select>
        </div>
        <textarea
          value={form.text}
          onChange={e => setForm(f => ({...f, text: e.target.value}))}
          placeholder="Fikringizni yozing..."
          className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 mb-3 min-h-[100px]"
          required
        />
        <div className="flex items-center justify-between">
          <span className={`text-sm ${msg.startsWith('✓') ? 'text-emerald-600' : 'text-rose-600'}`}>
            {msg}
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary disabled:opacity-60"
          >
            {submitting ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </div>
      </form>

      {/* Reviews list */}
      {school.reviews?.length === 0 ? (
        <p className="text-slate-500 text-center py-8">Hali sharhlar yo'q. Birinchi bo'ling!</p>
      ) : (
        <div className="space-y-4">
          {school.reviews.map(r => (
            <div key={r.id} className="bg-white rounded-xl p-4 border border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
                    {r.author_name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">{r.author_name}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(r.created_at).toLocaleDateString('uz-UZ')}
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-amber-500" />
                  <span className="text-sm font-semibold">{r.rating}</span>
                </div>
              </div>
              <p className="text-slate-700 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}