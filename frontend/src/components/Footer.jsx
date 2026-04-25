import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="container-x py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 17V9l9 4 9-4v8M3 9l9-4 9 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl text-white">
                Maktab<span className="text-brand-400">Top</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Qarshi va O'zbekistondagi eng yaxshi xususiy maktablar katalogi.
              Farzandingiz uchun to'g'ri tanlov qiling.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Sahifalar
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition">Bosh sahifa</Link></li>
              <li><Link to="/maktablar" className="hover:text-brand-400 transition">Maktablar</Link></li>
              <li><Link to="/haqida" className="hover:text-brand-400 transition">Biz haqimizda</Link></li>
              <li><Link to="/kontakt" className="hover:text-brand-400 transition">Aloqa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kategoriyalar
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/maktablar?school_type=international" className="hover:text-brand-400 transition">Xalqaro maktablar</Link></li>
              <li><Link to="/maktablar?school_type=private" className="hover:text-brand-400 transition">Xususiy maktablar</Link></li>
              <li><Link to="/maktablar?school_type=bilingual" className="hover:text-brand-400 transition">Bilingual</Link></li>
              <li><Link to="/maktablar?school_type=specialized" className="hover:text-brand-400 transition">Ixtisoslashgan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Aloqa
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📍 Qarshi, O'zbekiston</li>
              <li>📞 +998 91 263 0977</li>
              <li>✉️ ismatismoilov709@gmail.uz</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} MaktabTop. Barcha huquqlar himoyalangan.</p>
          {/* <p className="text-xs">Demo versiya · Django + React</p> */}
        </div>
      </div>
    </footer>
  );
}
