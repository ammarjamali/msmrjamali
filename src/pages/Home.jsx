import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

const HERO_VIDEO_URL = 'https://rqmsfqcbtlipmibukqwk.supabase.co/storage/v1/object/public/product-images/site-assets/hero.mp4'


function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_visible', true)
        .order('sort_order')
      if (!error) setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      {/* Hero — video background */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '480px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO_URL}
        />

        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-brand-navy/70" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Storage solutions built to outlast the job
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We manufacture racking systems for warehouses, hardware stores, and
            businesses across Kota — Seven configurable varieties, every size you need.
          </p>
          <Link
            to="/catalogue"
            className="inline-block bg-brand-red text-white font-semibold px-8 py-3.5 rounded-md hover:bg-red-600 transition-colors"
          >
            View the catalogue
          </Link>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold text-brand-navy">Our products</h2>
          <Link
            to="/catalogue"
            className="text-sm font-semibold text-brand-blue hover:underline"
          >
            See all →
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <ProductCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home