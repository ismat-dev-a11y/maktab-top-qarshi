import { BadgeCheck, Star, Zap } from 'lucide-react';

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
              <BadgeCheck className="h-7 w-7" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Tasdiqlangan ma'lumot</h3>
            <p className="text-sm text-slate-600">
              Barcha maktablar haqidagi ma'lumot shaxsan tekshirilgan va ishonchli manbalardan olingan.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Star className="h-7 w-7" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Haqqoniy sharhlar</h3>
            <p className="text-sm text-slate-600">
              Ota-onalarning haqiqiy fikr-mulohazalari va tajribasiga asoslangan reytinglar.
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">Tezkor qidiruv</h3>
            <p className="text-sm text-slate-600">
              Qulay filtrlar yordamida sizga mos maktabni bir necha soniyada toping.
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl bg-brand-700 p-10 text-white shadow-card">
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
