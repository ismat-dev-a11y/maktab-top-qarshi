import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { GraduationCap, Menu, Search, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? 'text-brand-700 bg-brand-50/90 shadow-soft'
        : 'text-slate-600 hover:text-brand-600 hover:bg-white'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-extrabold text-xl text-slate-900">
            Maktab<span className="text-brand-600">Top</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Bosh sahifa</NavLink>
          <NavLink to="/schools" className={linkClass}>Maktablar</NavLink>
          <NavLink to="/about" className={linkClass}>Biz haqimizda</NavLink>
          <NavLink to="/contact" className={linkClass}>Aloqa</NavLink>
        </nav>

        <div className="hidden md:block">
          <Link to="/schools" className="btn btn-primary text-sm">
            <Search className="mr-2 h-4 w-4" />
            Maktab qidirish
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-x py-3 flex flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Bosh sahifa</NavLink>
            <NavLink to="/schools" className={linkClass} onClick={() => setOpen(false)}>Maktablar</NavLink>
            <NavLink to="/about" className={linkClass} onClick={() => setOpen(false)}>Biz haqimizda</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>Aloqa</NavLink>
            <Link to="/schools" onClick={() => setOpen(false)} className="btn btn-primary mt-2 text-sm">
              <Search className="mr-2 h-4 w-4" />
              Maktab qidirish
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
