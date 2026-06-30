import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ColorSwatch from '../components/ColorSwatch'

const SPEC_LABELS = {
  depth: 'Depth',
  width: 'Width',
  height: 'Height',
  panel_gauge: 'Panel gauge',
  angle_gauge: 'Angle gauge',
}

function groupSpecs(specs) {
  return specs.reduce((acc, spec) => {
    if (!acc[spec.attribute]) acc[spec.attribute] = []
    acc[spec.attribute].push(spec)
    return acc
  }, {})
}

function SpecRow({ attribute, values }) {
  return (
    <div className="py-4 border-b border-brand-grey last:border-0">
      <p className="text-sm font-semibold text-brand-navy mb-2">
        {SPEC_LABELS[attribute]}
      </p>
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v.id}
            className="text-sm text-brand-charcoal bg-brand-grey/60 px-3 py-1 rounded-full"
          >
            {v.value}{v.unit}
          </span>
        ))}
      </div>
    </div>
  )
}

function GalleryGrid({ images, emptyText }) {
  if (images.length === 0) {
    return <p className="text-sm text-brand-charcoal/60 italic">{emptyText}</p>
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((img) => (
        <div key={img.id} className="aspect-[4/3] bg-brand-grey rounded-lg overflow-hidden">
          <img src={img.image_url} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  )
}

function formatCapacity(row) {
  return row.capacity_min_kg === row.capacity_max_kg
    ? `${row.capacity_min_kg} kg`
    : `${row.capacity_min_kg}–${row.capacity_max_kg} kg`
}

function ProductDetail() {
  const { slug } = useParams()
  const [category, setCategory] = useState(null)
  const [specs, setSpecs] = useState([])
  const [loadCapacity, setLoadCapacity] = useState([])
  const [gallery, setGallery] = useState([])
  const [colors, setColors] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true)
      setNotFound(false)

      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

      if (categoryError || !categoryData) {
        setNotFound(true)
        setLoading(false)
        return
      }
      setCategory(categoryData)

      const [{ data: specsData }, { data: loadData }, { data: galleryData }, { data: colorsData }] =
        await Promise.all([
          supabase.from('category_specs').select('*').eq('category_id', categoryData.id).order('sort_order'),
          supabase.from('load_capacity').select('*').eq('category_id', categoryData.id),
          supabase.from('gallery_images').select('*').eq('category_id', categoryData.id).order('sort_order'),
          supabase.from('category_colors').select('sort_order, color_options(*)').eq('category_id', categoryData.id).order('sort_order'),
        ])

      setSpecs(specsData || [])
      setLoadCapacity(loadData || [])
      setGallery(galleryData || [])
      setColors(colorsData || [])
      setLoading(false)
    }

    fetchProduct()
  }, [slug])

  if (loading) {
    return <p className="max-w-6xl mx-auto px-6 py-16 text-brand-charcoal">Loading…</p>
  }

  if (notFound) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-brand-charcoal">
          We couldn't find that product.{' '}
          <Link to="/catalogue" className="text-brand-blue underline">Back to catalogue</Link>
        </p>
      </div>
    )
  }

  const groupedSpecs = groupSpecs(specs)
  const specOrder = ['depth', 'width', 'height', 'panel_gauge', 'angle_gauge']
  const productPhotos = gallery.filter((img) => img.type === 'product')
  const sitePhotos = gallery.filter((img) => img.type === 'site')

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <Link to="/catalogue" className="text-sm text-brand-blue hover:underline">← Back to catalogue</Link>

      <div className="grid gap-10 lg:grid-cols-2 mt-4 mb-16">
        <div className="aspect-[4/3] bg-brand-grey rounded-lg overflow-hidden">
          {category.cover_image_url ? (
            <img
              src={category.cover_image_url}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-brand-charcoal/40 text-sm">Photo coming soon</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-brand-navy mb-2">{category.name}</h1>
          <p className="text-brand-blue font-medium mb-4">{category.usage_line}</p>
          <p className="text-brand-charcoal leading-relaxed mb-8">{category.description}</p>

          {colors.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-brand-navy mb-3">Available colors</h2>
              <div className="flex flex-wrap gap-5">
                {colors.map((c) => (
                  <ColorSwatch key={c.color_options.id} color={c.color_options} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Available sizes & specs</h2>
          <div className="bg-white border border-brand-grey rounded-lg p-6">
            {specOrder.map((attr) =>
              groupedSpecs[attr] ? (
                <SpecRow key={attr} attribute={attr} values={groupedSpecs[attr]} />
              ) : null
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-brand-navy mb-4">Load capacity per shelf</h2>
          <div className="bg-white border border-brand-grey rounded-lg p-6">
            {loadCapacity.length === 0 ? (
              <p className="text-sm text-brand-charcoal/60 italic">
                Load capacity chart coming soon — contact us for current ratings.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-brand-navy border-b border-brand-grey">
                    <th className="py-2">Panel gauge</th>
                    <th className="py-2">Angle gauge</th>
                    <th className="py-2">Capacity</th>
                  </tr>
                </thead>
                <tbody>
                  {loadCapacity.map((row) => (
                    <tr key={row.id} className="border-b border-brand-grey last:border-0">
                      <td className="py-2">{row.panel_gauge}</td>
                      <td className="py-2">{row.angle_gauge}</td>
                      <td className="py-2">{formatCapacity(row)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-brand-navy mb-4">Product gallery</h2>
        <GalleryGrid images={productPhotos} emptyText="Product photos coming soon." />
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-brand-navy mb-4">Installed at customer sites</h2>
        <GalleryGrid images={sitePhotos} emptyText="On-site photos coming soon." />
      </div>
    </div>
  )
}

export default ProductDetail