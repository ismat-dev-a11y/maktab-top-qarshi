import { ArrowRight, Camera, Clock3, Mail, Map, MapPin, Phone, Send, Users, Video } from 'lucide-react'

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.8!2d65.789!3d38.859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUWFyc2hp!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s'

const MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=Islom+Karimov+ko%27chasi+Qarshi+Uzbekistan'

const SOCIALS = [
  { href: 'https://t.me/maktabtop', label: 'Telegram', meta: '@maktabtop · Tez javob', icon: Send, color: 'text-sky-600 bg-sky-50' },
  { href: 'https://instagram.com/maktabtop', label: 'Instagram', meta: '@maktabtop · Kunlik kontent', icon: Camera, color: 'text-pink-600 bg-pink-50' },
  { href: 'https://youtube.com/@maktabtop', label: 'YouTube', meta: 'Video darslar', icon: Video, color: 'text-red-600 bg-red-50' },
  { href: 'https://facebook.com/maktabtop', label: 'Facebook', meta: 'Hamjamiyat sahifasi', icon: Users, color: 'text-blue-600 bg-blue-50' },
]

export default function Contact() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="badge mb-4 bg-brand-100 text-brand-700">Aloqa</span>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">Biz bilan bog'laning</h1>
          <p className="mt-4 text-lg text-slate-600">Savollaringiz bormi? Quyidagi kanallar orqali biz bilan bevosita aloqaga chiqing.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <InfoCard href="tel:+998912630977" icon={Phone} title="Telefon" text="+998 91 263 09 77" cta="Qo'ng'iroq qilish" />
            <InfoCard href="mailto:ismatismoilov709@gmail.com" icon={Mail} title="Email" text="ismatismoilov709@gmail.com" cta="Xat yuborish" />

            <div className="card overflow-hidden p-0">
              <div className="p-6 pb-4">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold">Manzil</h3>
                <p className="mt-1 text-sm text-slate-600">Islom Karimov ko'chasi,<br /> Qarshi, O'zbekiston</p>
              </div>
              <div className="relative h-48 w-full border-t border-slate-100">
                <iframe
                  src={MAP_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manzil xaritasi"
                  className="absolute inset-0"
                />
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50">
                <Map className="h-4 w-4" />
                Yo'nalish olish
              </a>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="card p-8">
              <span className="badge bg-brand-100 text-brand-700">Ijtimoiy tarmoqlar</span>
              <h2 className="mt-3 font-display text-2xl font-bold text-slate-900 md:text-3xl">Bizni kuzatib boring</h2>
              <p className="mt-2 text-sm text-slate-600">Yangiliklar, foydali darslar va maslahatlar har kuni ijtimoiy tarmoqlarda.</p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SOCIALS.map(({ href, label, meta, icon: Icon, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900">{label}</div>
                      <div className="truncate text-xs text-slate-500">{meta}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-brand-600" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                  <Clock3 className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold">Ish vaqti</h3>
              </div>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between"><span className="text-slate-600">Dushanba – Juma</span><span className="font-semibold text-slate-900">9:00 – 18:00</span></li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2.5"><span className="text-slate-600">Shanba</span><span className="font-semibold text-slate-900">9:00 – 14:00</span></li>
                <li className="flex items-center justify-between border-t border-slate-100 pt-2.5"><span className="text-slate-600">Yakshanba</span><span className="font-semibold text-rose-600">Dam olish</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ href, icon: Icon, title, text, cta }) {
  return (
    <a href={href} className="card block p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <span className="mt-1 block text-sm text-slate-600 break-all">{text}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600">
        {cta}
        <ArrowRight className="h-3 w-3" />
      </span>
    </a>
  )
}