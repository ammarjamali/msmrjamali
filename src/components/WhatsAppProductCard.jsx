function SpecGrid({ specs }) {
  if (!specs || Object.keys(specs).length === 0) return null

  return (
    <div className="bg-brand-grey/40 rounded-md p-3 mb-3">
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {Object.entries(specs).map(([key, value]) => (
          key !== 'Load Capacity' && (
            <div key={key}>
              <p className="text-[10px] font-semibold text-brand-charcoal/60 uppercase tracking-wide leading-none mb-0.5">
                {key}
              </p>
              <p className="text-xs font-semibold text-brand-navy leading-tight">
                {value}
              </p>
            </div>
          )
        ))}
      </div>

      {specs['Load Capacity'] && (
        <div className="border-t border-brand-grey mt-2.5 pt-2.5">
          <p className="text-[10px] font-semibold text-brand-charcoal/60 uppercase tracking-wide leading-none mb-0.5">
            Load Capacity
          </p>
          <p className="text-xs font-semibold text-brand-red leading-tight">
            {specs['Load Capacity']}
          </p>
        </div>
      )}
    </div>
  )
}

function WhatsAppProductCard({ product }) {
  return (
    <div className="bg-white border border-brand-grey rounded-lg overflow-hidden flex flex-col">
      <div className="aspect-[4/5] bg-brand-grey overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-brand-charcoal/40 text-sm">No photo</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="font-bold text-brand-navy mb-3 leading-snug">
          {product.title}
        </h4>

        <SpecGrid specs={product.specs} />

        <div className="mt-auto pt-2">
          {product.price && (
            <p className="text-lg font-bold text-brand-charcoal mb-3">
              ₹{product.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-brand-charcoal/60 ml-1">
                {product.price_unit}
              </span>
            </p>
          )}

          <a
            href={product.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-sm py-2.5 rounded-md transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.857L.057 23.882a.5.5 0 0 0 .638.592l6.247-1.938A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.893a9.893 9.893 0 0 1-5.031-1.371l-.361-.214-3.741 1.161 1.178-3.625-.235-.374A9.861 9.861 0 0 1 2.107 12C2.107 6.58 6.58 2.107 12 2.107S21.893 6.58 21.893 12 17.42 21.893 12 21.893z" />
            </svg>
            Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

export default WhatsAppProductCard