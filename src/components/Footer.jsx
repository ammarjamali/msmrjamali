import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

function Footer() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('sort_order')

      if (!error) {
        setLocations(data)
      }
    }

    fetchLocations()
  }, [])

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-bold mb-1">
            <span className="text-brand-blue">MSMR</span>{' '}
            <span className="text-brand-red">JAMALI</span>
          </h3>

          <p className="text-sm text-gray-300 italic mb-6">
            Manufacturing Quality, Trading Honestly
          </p>

          <p className="text-sm text-gray-300">
            Qutbuddin J. — 9929879152
          </p>

          <p className="text-sm text-gray-300 mb-4">
            Ammar J. — 9521487553
          </p>

          <a
            href="mailto:jamaliracks7553@gmail.com"
            className="text-sm text-gray-300 hover:text-white underline"
          >
            jamaliracks7553@gmail.com
          </a>

          <br />

          <a
            href="https://instagram.com/msmrjamali"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-white text-brand-navy text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Follow us on Instagram
          </a>
        </div>

        {/* Right Section */}
        <div className="grid gap-6 sm:grid-cols-2">
          {locations.map((loc) => (
            <div key={loc.id}>
              <p className="text-sm font-semibold text-brand-grey mb-1">
                {loc.label}
              </p>
              <p className="text-sm text-gray-300">
                {loc.address}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MSMR Jamali. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer