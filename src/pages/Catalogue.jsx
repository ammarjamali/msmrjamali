import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

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