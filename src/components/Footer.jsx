import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const PRIMARY_CONTACT_NUMBER = '+919521487553'
const GOOGLE_REVIEW_URL = 'https://g.page/r/CUxJlFuP5GmEEBM/review'
const INSTAGRAM_URL = 'https://instagram.com/msmrjamali'
const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=MSMR+JAMALI&output=embed'

function Footer() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('sort_order')
      if (!error) setLocations(data)
    }
    fetchLocations()
  }, [])

  return (
    <footer className="bg-brand-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold mb-1">
            <span className="text-brand-blue">MSMR</span>{' '}
            <span className="text-brand-red">JAMALI</span>
          </h3>
          <p className="text-sm text-gray-300 italic mb-6">
            Manufacturing Quality, Trading Honestly
          </p>

          <a
            href={`tel:${PRIMARY_CONTACT_NUMBER}`}
            className="inline-flex items-center gap-2 bg-brand-blue text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-blue-600 transition-colors mb-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z" />
            </svg>
            Call {PRIMARY_CONTACT_NUMBER}
          </a>
          <br />

          <a
            href="mailto:jamaliracks7553@gmail.com"
            className="text-sm text-gray-300 hover:text-white underline"
          >
            jamaliracks7553@gmail.com
          </a>

          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-brand-navy text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 transition-colors"
            >
              Follow us on Instagram
            </a>

            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-white hover:text-brand-navy transition-colors"
            >
              Review us on Google
            </a>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {locations.map((loc) => (
            <div key={loc.id}>
              <p className="text-sm font-semibold text-brand-grey mb-1">{loc.label}</p>
              <p className="text-sm text-gray-300">{loc.address}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">
        <p className="text-sm font-semibold text-brand-grey mb-3">Find us</p>
        <div className="rounded-lg overflow-hidden border border-white/10 h-64">
          <iframe
            title="MSMR Jamali location"
            src={MAP_EMBED_SRC}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} MSMR Jamali. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer