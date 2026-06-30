import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

function Home() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order')
      if (!error) setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      <section className="bg-brand-navy text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Storage solutions built to outlast the job
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            We manufacture racking systems for warehouses, hardware stores, and
            businesses across Kota — five configurable varieties, every size you need.
          </p>
          <Link
            to="/catalogue"
            className="inline-block bg-brand-red text-white font-semibold px-8 py-3.5 rounded-md hover:bg-red-600 transition-colors"
          >
            View the catalogue
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold text-brand-navy">Our products</h2>
          <Link to="/catalogue" className="text-sm font-semibold text-brand-blue hover:underline">
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