export default function About() {
  return (
    <div className="container-x py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <span className="badge mb-4 bg-brand-100 text-brand-700">Biz haqimizda</span>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            Qarshidagi eng yaxshi ta'lim muassasalarini toping
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            MaktabTop — bu Qarshi shahridagi xususiy va xalqaro maktablar haqidagi
            eng to'liq ma'lumotlar platformasi. Bizning maqsadimiz — ota-onalarga o'z
            farzandlari uchun mukammal ta'lim muassasasini tanlashda yordam berish.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Tasdiqlangan ma'lumot</h3>
            <p className="text-sm text-slate-600">
              Barcha maktablar haqidagi ma'lumot shaxsan tekshirilgan va ishonchli manbalardan olingan.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Haqqoniy sharhlar</h3>
            <p className="text-sm text-slate-600">
              Ota-onalarning haqiqiy fikr-mulohazalari va tajribasiga asoslangan reytinglar.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Tezkor qidiruv</h3>
            <p className="text-sm text-slate-600">
              Qulay filtrlar yordamida sizga mos maktabni bir necha soniyada toping.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-white">
          <h2 className="font-display text-3xl font-bold">Bizning missiyamiz</h2>
          <p className="mt-4 leading-relaxed text-brand-50">
            Har bir bola sifatli ta'lim olishga loyiq. Biz ota-onalar va ta'lim muassasalari
            o'rtasidagi ko'prik bo'lib, qaror qabul qilish jarayonini shaffof, qulay va
            samarali qilishga harakat qilamiz. MaktabTop sizga Qarshi bo'ylab 25 dan
            ortiq xususiy va xalqaro maktablar haqida to'liq ma'lumot taqdim etadi.
          </p>
        </div>
      </div>
    </div>
  )
}
