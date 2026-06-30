import { NavLink } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  `text-sm font-semibold transition-colors ${
    isActive ? 'text-brand-red' : 'text-brand-charcoal hover:text-brand-blue'
  }`

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-grey">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold">
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
      </div>
    </header>
  )
}

export default Navbar