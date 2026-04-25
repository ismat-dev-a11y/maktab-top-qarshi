import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'text-brand-700 bg-brand-50'
        : 'text-slate-600 hover:text-brand-600 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 17V9l9 4 9-4v8M3 9l9-4 9 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-display font-extrabold text-xl text-slate-900">
            Maktab<span className="text-brand-600">Top</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Bosh sahifa</NavLink>
          <NavLink to="/maktablar" className={linkClass}>Maktablar</NavLink>
          <NavLink to="/haqida" className={linkClass}>Biz haqimizda</NavLink>
          <NavLink to="/kontakt" className={linkClass}>Aloqa</NavLink>
        </nav>

        <div className="hidden md:block">
          <Link to="/maktablar" className="btn btn-primary text-sm">
            Maktab qidirish
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-x py-3 flex flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>Bosh sahifa</NavLink>
            <NavLink to="/maktablar" className={linkClass} onClick={() => setOpen(false)}>Maktablar</NavLink>
            <NavLink to="/haqida" className={linkClass} onClick={() => setOpen(false)}>Biz haqimizda</NavLink>
            <NavLink to="/kontakt" className={linkClass} onClick={() => setOpen(false)}>Aloqa</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
