import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-brand-red' : 'text-brand-charcoal hover:text-brand-blue'
  }`

const mobileNavLinkClass = ({ isActive }) =>
  `block py-3 text-base font-semibold transition-colors ${
    isActive ? 'text-brand-red' : 'text-brand-charcoal'
  }`

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-grey">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold" onClick={() => setMenuOpen(false)}>
          <span className="text-brand-blue">MSMR</span>{' '}
          <span className="text-brand-red">JAMALI</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass} end>Home</NavLink>
          <NavLink to="/catalogue" className={navLinkClass}>Catalogue</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
          <NavLink
            to="/quote"
            className="bg-brand-red text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-red-600 transition-colors"
          >
            Get a Quote
          </NavLink>
        </nav>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-brand-grey px-6 pb-4">
          <NavLink to="/" className={mobileNavLinkClass} end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/catalogue" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>Catalogue</NavLink>
          <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
          <NavLink
            to="/quote"
            onClick={() => setMenuOpen(false)}
            className="block mt-2 text-center bg-brand-red text-white font-semibold py-3 rounded-md"
          >
            Get a Quote
          </NavLink>
        </nav>
      )}
    </header>
  )
}

export default Navbar