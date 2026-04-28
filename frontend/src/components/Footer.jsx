import { Link } from 'react-router-dom';
import { Camera, GraduationCap, Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="container-x py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
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
              <li><Link to="/schools" className="hover:text-brand-400 transition">Maktablar</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition">Biz haqimizda</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition">Aloqa</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Kategoriyalar
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/schools?school_type=international" className="hover:text-brand-400 transition">Xalqaro maktablar</Link></li>
              <li><Link to="/schools?school_type=private" className="hover:text-brand-400 transition">Xususiy maktablar</Link></li>
              <li><Link to="/schools?school_type=bilingual" className="hover:text-brand-400 transition">Bilingual</Link></li>
              <li><Link to="/schools?school_type=specialized" className="hover:text-brand-400 transition">Ixtisoslashgan</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Aloqa
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-400" /> Qarshi, O'zbekiston</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-400" /> +998 91 263 0977</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-400" /> ismatismoilov709@gmail.uz</li>
              <li className="flex items-center gap-3 pt-2">
                <a href="https://t.me/maktabtop" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 hover:bg-brand-600/20 transition">
                  <Send className="h-4 w-4 text-sky-400" />
                </a>
                <a href="https://instagram.com/maktabtop" target="_blank" rel="noreferrer" className="rounded-lg border border-slate-700 bg-slate-900/70 p-2 hover:bg-brand-600/20 transition">
                  <Camera className="h-4 w-4 text-pink-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-700/70 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} MaktabTop. Barcha huquqlar himoyalangan.</p>
          <p className="text-xs text-slate-600">Ta'lim tanlovini osonlashtiruvchi platforma</p>
        </div>
      </div>
    </footer>
  );
}
