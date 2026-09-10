import { useRef } from 'react'
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

interface CategorySectionConfig {
  key: ProductItem['category']
  code: string
  title: string
  desc: string
  items: ProductItem[]
}

const CATEGORY_SECTIONS: CategorySectionConfig[] = [
  {
    key: 'ferrous',
    code: '01',
    title: 'FERROUS COMPONENTS',
    desc: 'High-speed progressive & compound stamped steel components',
    items: PRODUCTS.filter((p) => p.category === 'ferrous'),
  },
  {
    key: 'non-ferrous',
    code: '02',
    title: 'NON-FERROUS COMPONENTS',
    desc: 'Aluminium, copper, and brass precision stamped & pressed parts',
    items: PRODUCTS.filter((p) => p.category === 'non-ferrous'),
  },
  {
    key: 'molded',
    code: '03',
    title: 'MOULDED COMPONENTS',
    desc: 'Precision horizontal & vertical injection moulded engineering parts',
    items: PRODUCTS.filter((p) => p.category === 'molded'),
  },
  {
    key: 'insert-molded',
    code: '04',
    title: 'INSERT MOULDED COMPONENTS',
    desc: 'Integrated metal-into-plastic insert moulded assemblies',
    items: PRODUCTS.filter((p) => p.category === 'insert-molded'),
  },
]

function CategoryRow({ section }: { section: CategorySectionConfig }) {
  const c = useThemeColors()
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div
      className="p-5 sm:p-6 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: c.bgCard,
        border: `1px solid ${c.border}`,
        boxShadow: c.cardShadow,
      }}
    >
      {/* Category Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 gap-3 border-b" style={{ borderColor: c.borderSubtle }}>
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '0.2em',
              color: c.amber,
              padding: '0.2rem 0.5rem',
              border: `1px solid ${c.amberA40}`,
              background: c.amberA8,
            }}
          >
            {section.code}
          </span>
          <div>
            <div className="flex items-center gap-2.5">
              <h3
                style={{
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: c.heading,
                  lineHeight: 1.2,
                }}
              >
                {section.title}
              </h3>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: c.body,
                  border: `1px solid ${c.border}`,
                  background: c.bgBadge,
                  padding: '0.15rem 0.45rem',
                  fontWeight: 700,
                }}
              >
                {section.items.length} UNITS
              </span>
            </div>
            <p
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                fontSize: '12px',
                color: c.body,
                marginTop: '0.2rem',
                letterSpacing: '0.05em',
              }}
            >
              {section.desc}
            </p>
          </div>
        </div>

        {/* Category Scroll Navigation Arrows */}
        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => scroll('left')}
            style={{
              width: '2.25rem',
              height: '2.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${c.border}`,
              background: c.bgElevated,
              color: c.heading,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="hover:border-[oklch(0.52_0.18_45)] hover:text-[oklch(0.52_0.18_45)] active:scale-95"
            title={`Scroll ${section.title} Left`}
            aria-label={`Scroll ${section.title} Left`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            style={{
              width: '2.25rem',
              height: '2.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `1px solid ${c.amberA40}`,
              background: c.amberA8,
              color: c.amber,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            className="hover:bg-[oklch(0.52_0.18_45)] hover:text-white active:scale-95"
            title={`Scroll ${section.title} Right`}
            aria-label={`Scroll ${section.title} Right`}
          >
            →
          </button>
        </div>
      </div>

      {/* Category Component Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-3.5 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'thin',
        }}
      >
        {section.items.map((product) => (
          <div
            key={product.id}
            style={{
              width: '210px',
              minWidth: '180px',
              maxWidth: '210px',
              flexShrink: 0,
              scrollSnapAlign: 'start',
              backgroundColor: c.bgElevated,
              border: `1px solid ${c.border}`,
            }}
            className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.52_0.18_45)] hover:shadow-md"
          >
            {/* Crosshair Target Reticles on Hover */}
            <span className="absolute top-1 left-1 font-mono text-[13px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
              ┌
            </span>
            <span className="absolute top-1 right-1 font-mono text-[13px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
              ┐
            </span>
            <span className="absolute bottom-1 left-1 font-mono text-[13px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
              └
            </span>
            <span className="absolute bottom-1 right-1 font-mono text-[13px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ color: c.amber }}>
              ┘
            </span>

            {/* Component Photo Container */}
            <div className="aspect-square flex items-center justify-center p-3 overflow-hidden" style={{ backgroundColor: c.bgDeep }}>
              <img
                src={product.image}
                alt={section.title}
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
    </div>
  )
}

export function ProductsSection() {
  const c = useThemeColors()

  return (
    <div id="products" style={{ paddingTop: '4rem', paddingBottom: '4rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Main Section Header */}
        <div className="mb-8">
          <div
            style={{
              fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
              fontSize: '15.5px',
              letterSpacing: '0.4em',
              color: c.amber,
              marginBottom: '0.35rem',
            }}
          >
            SECTION 05 — COMPONENT GALLERY
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <h2
                style={{
                  fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: c.heading,
                }}
              >
                Component Gallery
              </h2>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                  fontSize: '13.5px',
                  color: c.body,
                  marginTop: '0.35rem',
                  letterSpacing: '0.05em',
                }}
              >
                Comprehensive showcase of manufactured precision tooling, stamped parts, and moulded assemblies.
              </p>
            </div>
            <div
              style={{
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
                fontSize: '12px',
                color: c.amber,
                padding: '0.35rem 0.75rem',
                border: `1px solid ${c.amberA40}`,
                background: c.amberA8,
                whiteSpace: 'nowrap',
              }}
            >
              TOTAL 35 COMPONENTS DISPLAYED
            </div>
          </div>
        </div>

        {/* Stacked Category Rows (Ferrous -> Non-Ferrous -> Molded -> Insert Molded) */}
        <div className="flex flex-col gap-6">
          {CATEGORY_SECTIONS.map((section) => (
            <CategoryRow key={section.key} section={section} />
          ))}
        </div>
      </div>
    </div>
  )
}
