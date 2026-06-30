import { Link } from 'react-router-dom'

function ProductCard({ category }) {
  return (
    <Link
      to={`/catalogue/${category.slug}`}
      className="group block bg-white rounded-lg overflow-hidden border border-brand-grey hover:border-brand-blue transition-colors"
    >
      <div className="aspect-[4/3] bg-brand-grey flex items-center justify-center overflow-hidden">
        {category.cover_image_url ? (
          <img
            src={category.cover_image_url}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-brand-charcoal/40 text-sm">Photo coming soon</span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-navy mb-1">{category.name}</h3>
        <p className="text-sm font-medium text-brand-blue mb-2">{category.usage_line}</p>
        <p className="text-sm text-brand-charcoal leading-relaxed line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard