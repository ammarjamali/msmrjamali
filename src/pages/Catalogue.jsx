import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

const SIZE_GUIDE_IMAGE_URL = 'https://rqmsfqcbtlipmibukqwk.supabase.co/storage/v1/object/public/product-images/site-assets/size-guide.jpg'

function SizeGuide() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white border border-brand-grey rounded-lg overflow-hidden mb-12">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-brand-grey/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-blue">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-brand-navy text-sm">
              How to read rack sizes — Depth, Width & Height explained
            </p>
            <p className="text-xs text-brand-charcoal/60 mt-0.5">
              New to industrial racking? Start here before browsing.
            </p>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-brand-charcoal/50 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-brand-grey px-6 py-8">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <img
              src={SIZE_GUIDE_IMAGE_URL}
              alt="Rack size guide showing depth, width and height"
              className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg"
            />

            <div className="space-y-5">
              <h3 className="text-lg font-bold text-brand-navy">
                Understanding rack dimensions
              </h3>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-brand-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-red font-bold text-sm">D</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-navy mb-1">Depth</p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    How far the rack extends from the wall — front to back. A deeper rack holds bulkier items. Common depths: 9in for light storage, 18–24in for heavy warehouse use.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-brand-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-blue font-bold text-sm">W</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-navy mb-1">Width</p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    The horizontal span of each shelf — left to right. Wider shelves fit larger items but require a heavier gauge to maintain load capacity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-brand-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-navy font-bold text-sm">H</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-navy mb-1">Height</p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    The total standing height of the rack. We manufacture from 2ft up to 10ft. Shelf spacing within that height is adjustable at any point thanks to the slotted angle design.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-md bg-brand-grey flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-brand-charcoal font-bold text-sm">G</span>
                </div>
                <div>
                  <p className="font-semibold text-brand-navy mb-1">Gauge</p>
                  <p className="text-sm text-brand-charcoal leading-relaxed">
                    The thickness of the steel. Lower gauge number = thicker steel = higher load capacity. 26G is our lightest, 18G is our heaviest. We guarantee the exact gauge we quote — see our True Gauge Guarantee.
                  </p>
                </div>
              </div>

              <p className="text-xs text-brand-charcoal/60 pt-2 border-t border-brand-grey">
                Not sure what size you need? Use the{' '}
                <a href="/quote" className="text-brand-blue underline hover:text-brand-navy">
                  Get a Quote
                </a>{' '}
                form and we'll help you figure it out.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Catalogue() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order')
      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        setCategories(data)
      }
      setLoading(false)
    }
    fetchCategories()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-brand-navy mb-2">Our Catalogue</h1>
      <p className="text-brand-charcoal mb-10">
        Five rack systems built for warehouses, hardware stores, and businesses —
        each one configurable to your space and load needs.
      </p>

      <SizeGuide />

      {loading ? (
        <p className="text-brand-charcoal">Loading products…</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ProductCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogue