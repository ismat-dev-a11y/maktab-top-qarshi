export default function Contact() {
  // ⚠️ Bu yerga Google Maps'dan olgan embed URL'ingni qo'y
  // Google Maps → Share → Embed a map → iframe ichidagi src="..." qismi
  const MAP_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.8!2d65.789!3d38.859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUWFyc2hp!5e0!3m2!1sen!2s!4v1!5m2!1sen!2s'

  // Google Maps ilovasida ochish uchun manzil linki
  const MAPS_LINK =
    'https://www.google.com/maps/search/?api=1&query=Islom+Karimov+ko%27chasi+Qarshi+Uzbekistan'

  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="badge mb-4 bg-brand-100 text-brand-700">Aloqa</span>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            Biz bilan bog'laning
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Savollaringiz bormi? Quyidagi kanallar orqali biz bilan bevosita aloqaga chiqing.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Chap tomon: Aloqa ma'lumotlari */}
          <div className="space-y-4 lg:col-span-1">
            <a
              href="tel:+998912630977"
              className="card block p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold">Telefon</h3>
              <span className="mt-1 block text-sm text-slate-600">+998 91 263 09 77</span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand-600">
                Qo'ng'iroq qilish
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            <a
              href="mailto:ismatismoilov709@gmail.com"
              className="card block p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-display text-base font-semibold">Email</h3>
              <span className="mt-1 block break-all text-sm text-slate-600">
                ismatismoilov709@gmail.com
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                Xat yuborish
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            {/* 🗺️ Manzil kartasi — ichida Google Maps embed */}
            <div className="card overflow-hidden p-0">
              <div className="p-6 pb-4">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-semibold">Manzil</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Islom Karimov ko'chasi,<br /> Qarshi, O'zbekiston
                </p>
              </div>

              {/* Embed karta */}
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

              {/* Yo'nalish tugmasi */}
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50 px-6 py-3 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Yo'nalish olish
              </a>
            </div>
          </div>

          {/* O'ng tomon: Creative bo'limlar */}
          <div className="space-y-6 lg:col-span-2">
            {/* Ijtimoiy tarmoqlar katta kartochka */}
            <div className="card relative overflow-hidden p-8">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-100/70 blur-3xl" />
              <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-amber-100/60 blur-3xl" />

              <div className="relative">
                <span className="badge bg-brand-100 text-brand-700">Ijtimoiy tarmoqlar</span>
                <h2 className="mt-3 font-display text-2xl font-bold text-slate-900 md:text-3xl">
                  Bizni kuzatib boring
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Yangiliklar, foydali darslar va maslahatlar har kuni ijtimoiy tarmoqlarda.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Telegram */}
                  <a
                    href="https://t.me/maktabtop"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#229ED9]/40 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#229ED9]/10 text-[#229ED9] transition group-hover:bg-[#229ED9] group-hover:text-white">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900">Telegram</div>
                      <div className="truncate text-xs text-slate-500">@maktabtop · Tez javob</div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#229ED9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/maktabtop"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 text-white">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900">Instagram</div>
                      <div className="truncate text-xs text-slate-500">@maktabtop · Kunlik kontent</div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/@maktabtop"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-red-300 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900">YouTube</div>
                      <div className="truncate text-xs text-slate-500">Video darslar</div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com/maktabtop"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1877F2]/40 hover:shadow-lg"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#1877F2]/10 text-[#1877F2] transition group-hover:bg-[#1877F2] group-hover:text-white">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-slate-900">Facebook</div>
                      <div className="truncate text-xs text-slate-500">Hamjamiyat sahifasi</div>
                    </div>
                    <svg className="h-4 w-4 flex-shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-[#1877F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Ish vaqti + Tez javob */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-semibold">Ish vaqti</h3>
                </div>
                <ul className="space-y-2.5 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-600">Dushanba – Juma</span>
                    <span className="font-semibold text-slate-900">9:00 – 18:00</span>
                  </li>
                  <li className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <span className="text-slate-600">Shanba</span>
                    <span className="font-semibold text-slate-900">9:00 – 14:00</span>
                  </li>
                  <li className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <span className="text-slate-600">Yakshanba</span>
                    <span className="font-semibold text-rose-600">Dam olish</span>
                  </li>
                </ul>
              </div>

              <div className="card relative overflow-hidden p-6">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-100/80 blur-2xl" />
                <div className="relative">
                  <div className="mb-4 flex items-center gap-3">
                    {/* <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600"> */}
                      {/* <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> */}
                        {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> */}
                      {/* </svg> */}
                    {/* </div> */}
                    {/* <h3 className="font-display text-base font-semibold">Tez javob</h3> */}
                  </div>
                  <p className="text-sm text-slate-600">
                    {/* Xabaringizga odatda{' '} */}
                    {/* <span className="font-semibold text-slate-900">30 daqiqa</span> ichida javob beramiz. */}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {/* <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-brand-400 to-brand-600" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-amber-400 to-orange-500" />
                      <div className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-600" /> */}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {/* <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span> */}
                      {/* <span className="text-xs font-medium text-slate-600">Jamoa onlayn</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}