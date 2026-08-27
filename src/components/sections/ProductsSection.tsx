import { useState, useRef } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

export interface ProductItem {
  id: string
  category: 'ferrous' | 'non-ferrous' | 'molded' | 'insert-molded'
  image: string
}

const PRODUCTS: ProductItem[] = [
  // Ferrous Parts (8 images - Page 18)
  { id: 'ferrous-1', category: 'ferrous', image: '/images/products_gallery/ferrous_component_1.jpg' },
  { id: 'ferrous-2', category: 'ferrous', image: '/images/products_gallery/ferrous_component_2.jpg' },
  { id: 'ferrous-3', category: 'ferrous', image: '/images/products_gallery/ferrous_component_3.jpg' },
  { id: 'ferrous-4', category: 'ferrous', image: '/images/products_gallery/ferrous_component_4.jpg' },
  { id: 'ferrous-5', category: 'ferrous', image: '/images/products_gallery/ferrous_component_5.jpg' },
  { id: 'ferrous-6', category: 'ferrous', image: '/images/products_gallery/ferrous_component_6.jpg' },
  { id: 'ferrous-7', category: 'ferrous', image: '/images/products_gallery/ferrous_component_7.jpg' },
  { id: 'ferrous-8', category: 'ferrous', image: '/images/products_gallery/ferrous_component_8.jpg' },

  // Non-Ferrous Parts (9 images - Page 18)
  { id: 'non-ferrous-1', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_1.jpg' },
  { id: 'non-ferrous-2', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_2.jpg' },
  { id: 'non-ferrous-3', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_3.jpg' },
  { id: 'non-ferrous-4', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_4.jpg' },
  { id: 'non-ferrous-5', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_5.jpg' },
  { id: 'non-ferrous-6', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_6.jpg' },
  { id: 'non-ferrous-7', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_7.jpg' },
  { id: 'non-ferrous-8', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_8.jpg' },
  { id: 'non-ferrous-9', category: 'non-ferrous', image: '/images/products_gallery/non_ferrous_component_9.jpg' },

  // Molded Parts (9 images - Page 19)
  { id: 'molded-1', category: 'molded', image: '/images/products_gallery/molded_component_1.jpg' },
  { id: 'molded-2', category: 'molded', image: '/images/products_gallery/molded_component_2.jpg' },
  { id: 'molded-3', category: 'molded', image: '/images/products_gallery/molded_component_3.jpg' },
  { id: 'molded-4', category: 'molded', image: '/images/products_gallery/molded_component_4.jpg' },
  { id: 'molded-5', category: 'molded', image: '/images/products_gallery/molded_component_5.jpg' },
  { id: 'molded-6', category: 'molded', image: '/images/products_gallery/molded_component_6.jpg' },
  { id: 'molded-7', category: 'molded', image: '/images/products_gallery/molded_component_7.jpg' },
  { id: 'molded-8', category: 'molded', image: '/images/products_gallery/molded_component_8.jpg' },
  { id: 'molded-9', category: 'molded', image: '/images/products_gallery/molded_component_9.jpg' },

  // Insert Molded Parts (9 images - Page 19)
  { id: 'insert-molded-1', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_1.jpg' },
  { id: 'insert-molded-2', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_2.jpg' },
  { id: 'insert-molded-3', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_3.jpg' },
  { id: 'insert-molded-4', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_4.jpg' },
  { id: 'insert-molded-5', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_5.jpg' },
  { id: 'insert-molded-6', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_6.jpg' },
  { id: 'insert-molded-7', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_7.jpg' },
  { id: 'insert-molded-8', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_8.jpg' },
  { id: 'insert-molded-9', category: 'insert-molded', image: '/images/products_gallery/insert_molded_component_9.jpg' },
]

const CATEGORIES = [
  { key: 'all', label: 'ALL (35)' },
  { key: 'ferrous', label: 'FERROUS (8)' },
  { key: 'non-ferrous', label: 'NON-FERROUS (9)' },
  { key: 'molded', label: 'MOLDED (9)' },
  { key: 'insert-molded', label: 'INSERT MOLDED (9)' },
]

export function ProductsSection() {
  const c = useThemeColors()
  const [activeTab, setActiveTab] = useState<string>('all')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeTab)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4">
          <div>
            <div
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                fontSize: '15.5px',
                letterSpacing: '0.4em',
                color: c.amber,
                marginBottom: '0.25rem',
              }}
            >
              SECTION 06 — PRODUCT GALLERY
            </div>
            <h2
              style={{
                fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: c.heading,
              }}
            >
              Component Gallery
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              style={{
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${c.borderStrong}`,
                background: c.bgElevated,
                color: c.heading,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
              className="hover:border-[oklch(0.72_0.19_45)] hover:text-[oklch(0.72_0.19_45)] active:scale-95"
              title="Scroll Left"
              aria-label="Previous components"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              style={{
                width: '2.75rem',
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${c.amberA50}`,
                background: c.amberA15,
                color: c.amber,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.2s ease',
              }}
              className="hover:bg-[oklch(0.72_0.19_45)] hover:text-[oklch(0.13_0.01_250)] active:scale-95"
              title="Scroll Right"
              aria-label="Next components"
            >
              →
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-1.5 p-1.5 border mb-6 w-fit"
          style={{ backgroundColor: c.bgCarousel, borderColor: c.border }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => {
                  setActiveTab(cat.key)
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
                  }
                }}
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                  fontSize: '15.5px',
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

        {/* HORIZONTAL SCROLLING CAROUSEL — 1 ROW */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3.5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[oklch(0.72_0.19_45_/_40%)] scrollbar-track-[oklch(0.17_0.012_250)]"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                width: '240px',
                minWidth: '200px',
                maxWidth: '240px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                backgroundColor: c.bgCarousel,
                border: `1px solid ${c.border}`,
              }}
              className="group relative overflow-hidden border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_70%)] hover:shadow-lg hover:shadow-[oklch(0.72_0.19_45_/_10%)]"
            >
              {/* Target Reticle Crosshair Hover Animation */}
              <span className="absolute top-1 left-1 font-mono text-[14px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
                ┌
              </span>
              <span className="absolute top-1 right-1 font-mono text-[14px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
                ┐
              </span>
              <span className="absolute bottom-1 left-1 font-mono text-[14px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
                └
              </span>
              <span className="absolute bottom-1 right-1 font-mono text-[14px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
                ┘
              </span>

              {/* Component Photo */}
              <div className="aspect-square flex items-center justify-center p-3 overflow-hidden" style={{ backgroundColor: c.bgDeep }}>
                <img
                  src={product.image}
                  alt=""
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Laser scan line overlay effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${c.amberA15}, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Footer Hint */}
        <div
          className="flex items-center justify-between mt-3 font-mono text-[13px] tracking-wider"
          style={{ color: c.body }}
        >
          <span>SWIPE OR USE ARROWS TO BROWSE</span>
          <span style={{ color: c.amber }}>SHOWING {filteredProducts.length} COMPONENTS</span>
        </div>
      </div>
    </div>
  )
}
