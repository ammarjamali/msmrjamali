function ColorSwatch({ color }) {
  return (
    <div className="flex flex-col items-center text-center w-24">
      <div
        className="w-14 h-14 rounded-md border border-brand-grey/70 shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${color.primary_hex} 50%, ${color.secondary_hex} 50%)`,
        }}
      />
      <p className="text-xs font-medium text-brand-charcoal mt-2 leading-tight">
        {color.name}
      </p>
      {color.is_default && (
        <span className="text-[10px] text-brand-blue font-semibold mt-0.5">Default</span>
      )}
      {color.powder_coated && (
        <span className="text-[10px] text-brand-charcoal/60 mt-0.5">Powder coated</span>
      )}
    </div>
  )
}

export default ColorSwatch