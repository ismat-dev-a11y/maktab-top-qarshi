import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Schools from './pages/Schools'
import SchoolDetail from './pages/SchoolDetail'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute -top-36 left-1/2 h-[480px] w-[780px] -translate-x-1/2 rounded-full bg-brand-200/30 blur-3xl" />
      <Navbar />
      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:slug" element={<SchoolDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="container-x py-32 text-center">
                <h1 className="font-display text-6xl font-bold text-brand-600">404</h1>
                <p className="mt-4 text-lg text-slate-600">Sahifa topilmadi</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
