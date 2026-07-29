import { useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

export interface ProductItem {
  id: string
  title: string
  category: 'ferrous' | 'non-ferrous' | 'molded' | 'insert-molded'
  categoryLabel: string
  material: string
  process: string
  application: string
  image: string
  description: string
}

const PRODUCTS: ProductItem[] = [
  // Ferrous Parts (Page 18)
  {
    id: 'ferrous-latch',
    title: 'Automotive Stamped Latch Assembly',
    category: 'ferrous',
    categoryLabel: 'FERROUS',
    material: 'High-Tensile Steel',
    process: 'Progressive Stamping & Form Press',
    application: 'Automotive Door & Tailgate Latch System',
    image: '/images/products_gallery/ferrous_latch_assembly.jpg',
    description: 'Precision stamped steel latch component engineered for high mechanical load bearing and zero-backlash engagement in vehicle door locking mechanisms.',
  },
  {
    id: 'ferrous-bracket',
    title: 'Precision Stamped Mounting Bracket',
    category: 'ferrous',
    categoryLabel: 'FERROUS',
    material: 'Cold Rolled Steel (CRCA)',
    process: 'Compound Die Press Stamping',
    application: 'Structural Engine & Chassis Mounts',
    image: '/images/products_gallery/ferrous_bracket_plate.jpg',
    description: 'High-speed stamped structural bracket featuring tight hole concentricity and anti-corrosion black e-coat surface finish.',
  },
  {
    id: 'ferrous-cam',
    title: 'Mechanical Actuation Cam Lever',
    category: 'ferrous',
    categoryLabel: 'FERROUS',
    material: 'Hardened Tool Steel',
    process: 'Precision Blanking & Piercing',
    application: 'Automotive Gear & Lever Linkages',
    image: '/images/products_gallery/ferrous_cam_lever.jpg',
    description: 'Heavy gauge stamped cam lever with induction-hardened wear contact surfaces for long duty cycle reliability.',
  },
  {
    id: 'ferrous-hinge',
    title: 'Structural Hinge Arm Component',
    category: 'ferrous',
    categoryLabel: 'FERROUS',
    material: 'Medium Carbon Steel',
    process: 'Heavy Progressive Press Operation',
    application: 'Vehicle Door & Hood Hinge Mechanisms',
    image: '/images/products_gallery/ferrous_hinge_arm.jpg',
    description: 'Precision formed hinge arm delivering high torsional rigidity and consistent pivot alignment under door weight load.',
  },

  // Non-Ferrous Parts (Page 18)
  {
    id: 'non-ferrous-discs',
    title: 'Aluminium & Copper Stamped Discs',
    category: 'non-ferrous',
    categoryLabel: 'NON-FERROUS',
    material: 'Aluminium / Copper / Brass Alloys',
    process: 'High-Speed Precision Stamping',
    application: 'Electrical Contacts & Heat Spreaders',
    image: '/images/products_gallery/non_ferrous_disc_components.jpg',
    description: 'Burr-free stamped non-ferrous components including high-conductivity copper terminal clips, brass washers, and aluminium heat distribution discs.',
  },
  {
    id: 'non-ferrous-clips',
    title: 'Copper Electrical Contact Clips',
    category: 'non-ferrous',
    categoryLabel: 'NON-FERROUS',
    material: 'Beryllium Copper / Brass',
    process: 'Micro-Stamping & Spring Tempering',
    application: 'High-Current Automotive Connectors',
    image: '/images/products_gallery/non_ferrous_clips.jpg',
    description: 'High-springiness copper alloy contact clips manufactured with tight dimensional tolerance for secure electrical conductivity.',
  },
  {
    id: 'non-ferrous-housing',
    title: 'Aluminium Electronic Control Box',
    category: 'non-ferrous',
    categoryLabel: 'NON-FERROUS',
    material: 'Aluminium 5052 Alloy',
    process: 'Deep Drawing & Secondary Piercing',
    application: 'ECU & Power Module Protection Box',
    image: '/images/products_gallery/non_ferrous_housing.jpg',
    description: 'Lightweight deep-drawn aluminium housing providing EMI shielding and thermal management for automotive control electronics.',
  },

  // Molded Parts (Page 19)
  {
    id: 'molded-vent',
    title: 'Automotive Air Vent Louver & Cover',
    category: 'molded',
    categoryLabel: 'MOLDED',
    material: 'ABS / PC-ABS Blend',
    process: 'Plastic Injection Molding (180T)',
    application: 'Automotive Interior HVAC Air Louver',
    image: '/images/products_gallery/molded_vent_louver.jpg',
    description: 'High-aesthetic interior air louver assembly featuring SPI A2 grain texture, smooth vane pivot action, and tight gap control.',
  },
  {
    id: 'molded-lens',
    title: 'Clear Optical Lens & Guide Ring',
    category: 'molded',
    categoryLabel: 'MOLDED',
    material: 'Optical Polycarbonate (PC)',
    process: 'Mirror Polish Injection Molding',
    application: 'Instrument Cluster & Dial Lighting',
    image: '/images/products_gallery/molded_lens_caps.jpg',
    description: 'Ultra-clear optical PC lenses molded from diamond-polished cavity inserts for crystal clear light transmission without internal stress distortion.',
  },
  {
    id: 'molded-knob',
    title: 'Textured Console Control Dial Ring',
    category: 'molded',
    categoryLabel: 'MOLDED',
    material: 'Polypropylene (PP) / POM',
    process: 'Precision Injection Molding',
    application: 'HVAC & Audio Control Dials',
    image: '/images/products_gallery/molded_knob_rings.jpg',
    description: 'Ergonomic knurled dial rings with laser-textured grip pattern, custom color matching, and tactile click feel.',
  },
  {
    id: 'molded-junction',
    title: 'Glass-Reinforced Electrical Box',
    category: 'molded',
    categoryLabel: 'MOLDED',
    material: 'PA66-GF30 (30% Glass Filled)',
    process: 'High-Pressure Injection Molding',
    application: 'Under-Hood Electrical Fuse & Wire Box',
    image: '/images/products_gallery/molded_junction_box.jpg',
    description: 'Flame-retardant heat-resistant electrical junction box designed to withstand engine bay vibration and thermal cycles up to 140°C.',
  },

  // Insert Molded Parts (Page 19)
  {
    id: 'insert-connectors',
    title: 'Over-Molded Electrical Pin Connectors',
    category: 'insert-molded',
    categoryLabel: 'INSERT MOLDED',
    material: 'Brass Pins + PA66 Body',
    process: 'Rotary Vertical Over-Molding (50T)',
    application: 'Automotive Wire Harness Connectors',
    image: '/images/products_gallery/insert_molded_connectors.jpg',
    description: 'Stamped brass contact terminals over-molded into plastic connector bodies on vertical rotary molding machines for 100% hermetic seal.',
  },
  {
    id: 'insert-sensors',
    title: 'Engine Sensor Terminal Housing',
    category: 'insert-molded',
    categoryLabel: 'INSERT MOLDED',
    material: 'Copper Pins + PBT-GF20 Body',
    process: 'Vertical Insert Over-Molding',
    application: 'Position & Temperature Sensors',
    image: '/images/products_gallery/insert_molded_sensors.jpg',
    description: 'Precision multi-pin sensor housing with zero flash on copper lead-frames, tested for 100% electrical continuity and fluid sealing.',
  },
  {
    id: 'insert-bushing',
    title: 'Over-Molded Threaded Brass Bushing',
    category: 'insert-molded',
    categoryLabel: 'INSERT MOLDED',
    material: 'Brass Threaded Insert + POM',
    process: 'Insert Injection Molding',
    application: 'High-Torque Fastening Bosses',
    image: '/images/products_gallery/insert_molded_bushing.jpg',
    description: 'Threaded brass insert over-molded into engineering plastic boss to provide high thread pull-out strength and torque resistance.',
  },
]

const CATEGORIES = [
  { key: 'all', label: 'ALL (14)' },
  { key: 'ferrous', label: 'FERROUS (4)' },
  { key: 'non-ferrous', label: 'NON-FERROUS (3)' },
  { key: 'molded', label: 'MOLDED (4)' },
  { key: 'insert-molded', label: 'INSERT MOLDED (3)' },
]

export function ProductsSection() {
  const c = useThemeColors()
  const [activeTab, setActiveTab] = useState<string>('all')
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null)

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab)

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Compact Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.4em',
                color: c.amber,
                marginBottom: '0.25rem',
              }}
            >
              SECTION 06 — PRODUCT GALLERY
            </div>
            <h2
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: c.heading,
              }}
            >
              Component Gallery
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div 
            className="flex flex-wrap items-center gap-1.5 p-1.5 border"
            style={{ backgroundColor: c.bgCarousel, borderColor: c.border }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeTab === cat.key
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveTab(cat.key)}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    padding: '0.35rem 0.75rem',
                    border: isActive ? `1px solid ${c.amber}` : '1px solid transparent',
                    background: isActive ? c.amberA15 : 'transparent',
                    color: isActive ? c.amber : c.body,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  className="hover:text-[oklch(0.93_0.005_250)]"
                >
                  {cat.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ULTRA-COMPACT 5-COLUMN MICRO GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="group relative overflow-hidden border backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_70%)] hover:shadow-lg hover:shadow-[oklch(0.72_0.19_45_/_10%)] flex flex-col justify-between"
              style={{ minHeight: '190px', backgroundColor: c.bgCarousel, borderColor: c.border }}
            >
              {/* Target Reticle Crosshair Hover Animation */}
              <span className="absolute top-1 left-1 font-mono text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.amber }}>
                ┌
              </span>
              <span className="absolute top-1 right-1 font-mono text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.amber }}>
                ┐
              </span>
              <span className="absolute bottom-1 left-1 font-mono text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.amber }}>
                └
              </span>
              <span className="absolute bottom-1 right-1 font-mono text-[8px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.amber }}>
                ┘
              </span>

              {/* Small Machine Photo Container (~110px height) */}
              <div className="relative h-28 flex items-center justify-center p-2.5 overflow-hidden" style={{ backgroundColor: c.bgDeep }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Laser scan line overlay effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" 
                  style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${c.amberA15}, transparent)` }}
                />
              </div>

              {/* Compact Card Title & Tag */}
              <div className="p-2.5 border-t flex-1 flex flex-col justify-between" style={{ backgroundColor: c.bgCard, borderColor: c.borderSubtle }}>
                <div>
                  <div className="flex items-center justify-between text-[8px] font-mono tracking-wider mb-1" style={{ color: c.cyan }}>
                    <span>{product.categoryLabel}</span>
                    <span className="group-hover:translate-x-0.5 transition-transform" style={{ color: c.amber }}>
                      +
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: c.heading,
                      lineHeight: 1.25,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {product.title}
                  </h3>
                </div>
                <div className="text-[8px] font-mono truncate mt-1" style={{ color: c.body }}>
                  {product.material}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FULLSCREEN LIGHTBOX MODAL */}
        {activeProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
            style={{ backgroundColor: c.bgOverlay }}
            onClick={() => setActiveProduct(null)}
          >
            <div
              className="relative w-full max-w-3xl border p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: c.bgModal, borderColor: c.amberA50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="absolute top-4 right-4 text-xl font-mono hover:text-[oklch(0.93_0.005_250)]"
                style={{ color: c.body }}
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Photo Zoom Frame */}
                <div className="w-full md:w-1/2 p-4 border flex items-center justify-center min-h-[260px]" style={{ backgroundColor: c.bgDeep, borderColor: c.border }}>
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    className="max-h-[300px] object-contain"
                  />
                </div>

                {/* Technical Product Breakdown */}
                <div className="w-full md:w-1/2">
                  <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: c.amber, marginBottom: '0.35rem' }}>
                    {activeProduct.categoryLabel}
                  </div>
                  <h3 style={{ fontFamily: 'system-ui', fontSize: '1.4rem', fontWeight: 700, color: c.heading, marginBottom: '0.75rem', lineHeight: 1.25 }}>
                    {activeProduct.title}
                  </h3>

                  <div className="space-y-1.5 mb-4">
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.cyan, background: c.cyanA8, padding: '0.35rem 0.6rem', borderLeft: `2px solid ${c.cyan}` }}>
                      MATERIAL: <span style={{ color: c.heading }}>{activeProduct.material}</span>
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.amber, background: c.amberA8, padding: '0.35rem 0.6rem', borderLeft: `2px solid ${c.amber}` }}>
                      PROCESS: <span style={{ color: c.heading }}>{activeProduct.process}</span>
                    </div>
                  </div>

                  <p style={{ fontFamily: 'monospace', fontSize: '10px', lineHeight: 1.6, color: c.body, marginBottom: '1rem' }}>
                    {activeProduct.description}
                  </p>

                  <div className="p-3 border" style={{ borderColor: c.border, backgroundColor: c.bgAlt }}>
                    <div style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.2em', color: c.green, marginBottom: '0.25rem' }}>
                      PRIMARY APPLICATION
                    </div>
                    <div style={{ fontFamily: 'system-ui', fontSize: '12px', fontWeight: 600, color: c.heading }}>
                      {activeProduct.application}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
