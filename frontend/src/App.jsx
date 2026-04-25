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
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/maktablar" element={<Schools />} />
          <Route path="/maktablar/:slug" element={<SchoolDetail />} />
          <Route path="/haqida" element={<About />} />
          <Route path="/kontakt" element={<Contact />} />
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
