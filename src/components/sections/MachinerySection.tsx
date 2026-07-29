import { useState, useRef } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

export interface Machine {
  id: string
  title: string
  make: string
  category: 'vmc' | 'edm' | 'molding' | 'press' | 'quality'
  categoryLabel: string
  spec: string
  image: string
  description: string
  highlights: string[]
  qty: string
}

const MACHINES: Machine[] = [
  // VMC & 5-Axis
  {
    id: 'hurco-5axis',
    title: '5 Axis Swivel Head Rotary Table CNC Mill',
    make: 'HURCO (Variaxis C-600)',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: '850 mm | Chuck Size: Dia 700 mm | XYZ: 1524x660x610mm',
    image: '/images/machinery/hurco_5axis.jpg',
    description: 'High-precision 5-axis simultaneous CNC milling for intricate 3D mould cavities and complex core geometries.',
    highlights: ['5-Axis Simultaneous Interpolation', 'High-Rigidity Swivel Head', 'Complex Mould Pocketing'],
    qty: '01 Unit',
  },
  {
    id: 'stm-double-column',
    title: 'CNC Double Column Machine (DL2114)',
    make: 'STM',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: 'Bed Size: 2100 × 1400 × 800 mm (XYZ)',
    image: '/images/machinery/stm_double_column.jpg',
    description: 'Heavy-duty double column machining center for large-scale tool and die work with exceptional rigidity and accuracy.',
    highlights: ['Heavy-Duty Tool & Die Milling', '2.1m Bed Travel', 'High Load Capacity'],
    qty: '01 Unit',
  },
  {
    id: 'mazak-vcez410',
    title: 'Vertical Machining Centre (VC-Ez 410 IP)',
    make: 'MAZAK',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: 'Bed Size: 762 × 410 × 510 mm (XYZ)',
    image: '/images/machinery/mazak_vcez410.jpg',
    description: 'High-precision VMC for complex 3D machining operations with superior surface finishes.',
    highlights: ['Superior Surface Finish', 'High-Precision 3D Milling', 'Mazatrol CNC Control'],
    qty: '01 Unit',
  },
  {
    id: 'takumi-h12e',
    title: 'Vertical Machining Centre (Takumi H12E)',
    make: 'TAKUMI',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: 'Bed Size: 1360 × 960 mm | XYZ: 1250x950x580 mm',
    image: '/images/machinery/takumi_h12e.jpg',
    description: 'Delivers exceptional rigidity and thermal stability for high-precision, high-speed machining.',
    highlights: ['Thermal Stability', 'High-Speed Machining', 'Consistent Accuracy'],
    qty: '01 Unit',
  },
  {
    id: 'bfw-chakra',
    title: 'VMC Machine (BFW CHAKRA 60+)',
    make: 'BFW',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: 'Bed Size: 1100 × 600 × 600 mm (XYZ)',
    image: '/images/machinery/bfw_chakra.jpg',
    description: 'Versatile vertical machining center for rapid roughing and finishing of die components.',
    highlights: ['Heavy Cutting Capability', 'High Spindle Power', 'Rapid Tool Change'],
    qty: '01 Unit',
  },
  {
    id: 'hurco-vm10i',
    title: 'VMC Machine Dedicated for Graphite (VM10i)',
    make: 'HURCO',
    category: 'vmc',
    categoryLabel: '5-AXIS & VMC',
    spec: 'Bed Size: 660 × 406 × 508 mm (XYZ)',
    image: '/images/machinery/hurco_vm10i.jpg',
    description: 'Dedicated high-speed VMC engineered specifically for precision graphite electrode machining.',
    highlights: ['Graphite Dust Extraction', 'High Spindle RPM', 'Electrode Production'],
    qty: '01 Unit',
  },

  // EDM & Wire Cut & Die Spotting
  {
    id: 'sprex-die-spotting',
    title: 'Die Spotting Machine (SX200 YC)',
    make: 'SPREX',
    category: 'edm',
    categoryLabel: 'EDM & DIE SPOTTING',
    spec: 'Bed Size: 2100 × 1800 mm | Capacity: 200 Ton',
    image: '/images/machinery/sprex_die_spotting.jpg',
    description: '200-Ton die spotting press ensuring 98% blue matching, excellent core box parallelism and zero manual blue matching.',
    highlights: ['200 Ton Capacity', '98% Blue Matching', 'Core Box Flatness & Parallelism'],
    qty: '01 Unit',
  },
  {
    id: 'stm-twin-edm',
    title: 'Twin Head CNC EDM (CNSKITEK)',
    make: 'STM / CNSKITEK',
    category: 'edm',
    categoryLabel: 'EDM & DIE SPOTTING',
    spec: 'Bed Size: 1100x1100x800 / 800x500x500 (XYZ)',
    image: '/images/machinery/stm_twin_edm.jpg',
    description: 'Equipped with twin spark heads for higher productivity and complex cavity discharge erosion.',
    highlights: ['Twin Spark Head System', 'High Discharge Rate', 'Micro-Finish Sparking'],
    qty: '01 Unit',
  },
  {
    id: 'excetek-wire-cut',
    title: 'Wire Cut Machine (NP1060L)',
    make: 'EXCETEK',
    category: 'edm',
    categoryLabel: 'EDM & DIE SPOTTING',
    spec: 'Bed Size: 1500 × 1000 × 495 mm',
    image: '/images/machinery/excetek_wire_cut.jpg',
    description: 'Precision wire EDM cutting ejector pin slots, complex die profiles, and sharp internal radii to ±0.003 mm.',
    highlights: ['Sub-Micron Wire Accuracy', 'Large Bed Capacity', 'Automatic Wire Threader'],
    qty: '01 Unit',
  },

  // Injection Molding
  {
    id: 'milacron-180t',
    title: 'Injection Moulding Machine 180 Ton',
    make: 'MILACRON',
    category: 'molding',
    categoryLabel: 'INJECTION MOLDING',
    spec: 'Tonnage: 180 Ton | Platen: 510x510 mm | Shot Weight: 336g',
    image: '/images/machinery/milacron_180t.jpg',
    description: 'High-tonnage horizontal molding machine for engineering plastic parts and automotive components.',
    highlights: ['180 Ton Clamping Force', '336g Shot Capacity', '100% Free Capacity Available'],
    qty: '01 Unit',
  },
  {
    id: 'milacron-100t',
    title: 'Injection Moulding Machine 100 Ton',
    make: 'MILACRON',
    category: 'molding',
    categoryLabel: 'INJECTION MOLDING',
    spec: 'Tonnage: 100 Ton | Platen: 405x360 mm | Shot Weight: 126g',
    image: '/images/machinery/milacron_100t.jpg',
    description: 'Precision horizontal injection molding unit for general and engineering grade thermoplastics.',
    highlights: ['Micro-Processor Control', 'Closed Loop Control', '60% Free Capacity'],
    qty: '01 Unit',
  },
  {
    id: 'stm-injection-120t',
    title: 'Injection Moulding Machine 120 Ton',
    make: 'STM',
    category: 'molding',
    categoryLabel: 'INJECTION MOLDING',
    spec: 'Tonnage: 120 Ton / 80 Ton | Shot Weight: 282g / 105g',
    image: '/images/machinery/stm_injection_120t.jpg',
    description: 'Versatile injection molding fleet for plastic housing and automotive interior trim components.',
    highlights: ['High Repeatability', 'Energy Efficient Servo Drive', '50% Free Capacity'],
    qty: '02 Units',
  },
  {
    id: 'lizhu-rotary-50t',
    title: 'Rotary Vertical Injection Moulding Machine',
    make: 'LIZHU',
    category: 'molding',
    categoryLabel: 'INJECTION MOLDING',
    spec: 'Tonnage: 50 Ton / 30 Ton | Rotary Table: Ø 800 mm',
    image: '/images/machinery/lizhu_rotary_50t.jpg',
    description: 'Vertical rotary clamping system specialized for insert over-molding of stamped metal terminals into plastics.',
    highlights: ['Rotary Table Insert Molding', 'Metal-to-Plastic Overmolding', 'Hybrid Assembly'],
    qty: '03 Units',
  },

  // Press Shop
  {
    id: 'hydraulic-press-100t',
    title: 'Hydraulic Press Machine 100 Ton',
    make: 'AHP',
    category: 'press',
    categoryLabel: 'PRESS SHOP',
    spec: 'Tonnage: 100 Ton Capacity',
    image: '/images/machinery/hydraulic_press_100t.jpg',
    description: 'Heavy hydraulic press for deep drawing, compound press operations, and heavy metal stamping.',
    highlights: ['100 Ton Hydraulic Force', 'Deep Drawing', 'Programmable Pressure Cycle'],
    qty: '01 Unit',
  },
  {
    id: 'mechanical-press',
    title: 'Mechanical Press Machine (50T & 30T)',
    make: 'AHP / JASJITH',
    category: 'press',
    categoryLabel: 'PRESS SHOP',
    spec: 'Tonnage: 50 Ton (3 Qty) | 30 Ton (2 Qty)',
    image: '/images/machinery/mechanical_press.jpg',
    description: 'High-speed mechanical power presses for progressive metal stamping and component blanking.',
    highlights: ['High Stroke Speed', 'Progressive Die Operation', 'Ferrous & Non-Ferrous Metals'],
    qty: '05 Units',
  },
  {
    id: 'pneumatic-press',
    title: 'Pneumatic Press Machine (63T & 25T)',
    make: 'SINGHAL / SEW',
    category: 'press',
    categoryLabel: 'PRESS SHOP',
    spec: 'Tonnage: 63 Ton & 25/30 Ton',
    image: '/images/machinery/pneumatic_press.jpg',
    description: 'Precision pneumatic power presses for clean, high-speed secondary piercing and blanking.',
    highlights: ['Clean Pneumatic Action', 'High Precision Piercing', '40% Free Capacity'],
    qty: '02 Units',
  },

  // Quality Inspection
  {
    id: 'hexagon-scanner',
    title: 'Hexagon Portable Laser Scanner',
    make: 'HEXAGON',
    category: 'quality',
    categoryLabel: 'QUALITY LAB',
    spec: 'Multi-Axis Portable Articulated Arm Laser Scanner',
    image: '/images/machinery/hexagon_scanner.jpg',
    description: '3D optical laser scanning for rapid surface inspection, freeform reverse engineering, and CAD deviation mapping.',
    highlights: ['Non-Contact 3D Scanning', 'Portable Articulated Arm', 'Real-Time CAD Comparison'],
    qty: '01 Unit',
  },
  {
    id: 'cnc-vision-vmm',
    title: 'CNC Vision Measuring Machine (VMM)',
    make: 'ELECTRONICA',
    category: 'quality',
    categoryLabel: 'QUALITY LAB',
    spec: 'Measuring Range: 400 × 300 × 200 mm',
    image: '/images/machinery/cnc_vision_vmm.jpg',
    description: 'Non-contact CNC optical measurement system for micro-feature inspection, edge detection, and profile verification.',
    highlights: ['Automatic Edge Detection', 'CNC Automated Inspection', 'Sub-Micron Optical Resolution'],
    qty: '01 Unit',
  },
  {
    id: 'digital-height-gauge',
    title: 'Digital Height Gauge (Optima M 700)',
    make: 'ELECTRONICA',
    category: 'quality',
    categoryLabel: 'QUALITY LAB',
    spec: 'Measuring Range: Z-450 mm',
    image: '/images/machinery/digital_height_gauge.jpg',
    description: 'Precision motor-driven digital height gauge for accurate 1D/2D dimensional verification of die inserts and plates.',
    highlights: ['Sub-Micron Repeatability', 'Air-Cushion Base', 'Motorized Probe'],
    qty: '01 Unit',
  },
]

const CATEGORIES = [
  { key: 'all', label: 'ALL MACHINES', count: 19 },
  { key: 'vmc', label: '5-AXIS & VMC', count: 6 },
  { key: 'edm', label: 'EDM & DIE SPOTTING', count: 3 },
  { key: 'molding', label: 'INJECTION MOLDING', count: 4 },
  { key: 'press', label: 'PRESS SHOP', count: 3 },
  { key: 'quality', label: 'QUALITY LAB', count: 3 },
]

export function MachinerySection() {
  const c = useThemeColors()
  const [activeTab, setActiveTab] = useState<string>('all')
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const filteredMachines = activeTab === 'all'
    ? MACHINES
    : MACHINES.filter((m) => m.category === activeTab)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ paddingTop: '4rem', paddingBottom: '4rem', background: c.bgAlt }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.4em',
                color: c.amber,
                marginBottom: '0.5rem',
              }}
            >
              SECTION 04 — INFRASTRUCTURE
            </div>
            <h2
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: c.heading,
              }}
            >
              Machinery & Tool Room Fleet
            </h2>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                letterSpacing: '0.05em',
                color: c.body,
                maxWidth: '38rem',
                marginTop: '0.35rem',
              }}
            >
              23+ precision machines under one roof in Chinchwad, Pune — filter by category or swipe horizontally.
            </p>
          </div>

          {/* Quick Metrics & Carousel Controls Bar */}
          <div className="flex items-center gap-4">
            <div 
              className="hidden sm:flex items-center gap-4 px-4 py-2.5 backdrop-blur-md"
              style={{
                border: `1px solid ${c.border}`,
                background: c.bgElevated
              }}
            >
              <div>
                <span style={{ fontFamily: 'system-ui', fontSize: '1.2rem', fontWeight: 800, color: c.amber }}>23+</span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: c.body, marginLeft: '0.35rem' }}>UNITS</span>
              </div>
              <div className="w-px h-4" style={{ backgroundColor: c.border }} />
              <div>
                <span style={{ fontFamily: 'system-ui', fontSize: '1.2rem', fontWeight: 800, color: c.cyan }}>200 T</span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: c.body, marginLeft: '0.35rem' }}>SPOTTING</span>
              </div>
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
                aria-label="Previous machinery cards"
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
                aria-label="Next machinery cards"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b pb-3" style={{ borderColor: c.border }}>
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
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  padding: '0.5rem 1rem',
                  border: `1px solid ${isActive ? c.amber : c.border}`,
                  background: isActive ? c.amberA15 : c.bgElevated,
                  color: isActive ? c.amber : c.body,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '9px',
                    padding: '0.1rem 0.35rem',
                    background: isActive ? c.amber : c.border,
                    color: isActive ? c.btnHoverText : c.body,
                    fontWeight: 700,
                  }}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Horizontal Carousel Container — 1 ROW MAX HEIGHT */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[oklch(0.72_0.19_45_/_40%)] scrollbar-track-[oklch(0.17_0.012_250)]"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'thin',
          }}
        >
          {filteredMachines.map((machine) => (
            <div
              key={machine.id}
              onClick={() => setSelectedMachine(machine)}
              style={{
                width: '380px',
                minWidth: '320px',
                maxWidth: '380px',
                flexShrink: 0,
                scrollSnapAlign: 'start',
                background: c.bgCarousel,
                border: `1px solid ${c.border}`,
                backdropFilter: 'blur(12px)',
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              className="group hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_60%)] hover:shadow-xl hover:shadow-[oklch(0.72_0.19_45_/_5%)]"
            >
              {/* Top Category Badge */}
              <div 
                className="flex items-center justify-between p-3.5 border-b"
                style={{ borderColor: c.borderSubtle, backgroundColor: c.bgBadge }}
              >
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', color: c.cyan }}>
                  {machine.categoryLabel}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: c.amber, border: `1px solid ${c.amberA30}`, padding: '0.1rem 0.4rem' }}>
                  {machine.qty}
                </span>
              </div>

              {/* Machine Photo */}
              <div 
                className="relative h-48 overflow-hidden flex items-center justify-center p-3"
                style={{ backgroundColor: c.bgDeep }}
              >
                <img
                  src={machine.image}
                  alt={machine.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(to top, ${c.bgCarousel}, transparent, transparent)` }} />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.amber, marginBottom: '0.25rem' }}>
                    MAKE: {machine.make}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: c.heading,
                      lineHeight: 1.3,
                      marginBottom: '0.5rem',
                      height: '2.8rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {machine.title}
                  </h3>
                  <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.cyan, background: c.cyanA8, padding: '0.35rem 0.6rem', borderLeft: `2px solid ${c.cyan}`, marginBottom: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {machine.spec}
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', lineHeight: 1.5, color: c.body, marginBottom: '0.75rem', height: '2.8rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {machine.description}
                  </p>
                </div>

                {/* Highlights tags & Click hint */}
                <div 
                  className="pt-2.5 border-t flex items-center justify-between"
                  style={{ borderColor: c.borderSubtle }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.15em', color: c.body }}>
                    ✓ {machine.highlights[0]}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: c.amber, letterSpacing: '0.1em' }} className="group-hover:translate-x-1 transition-transform">
                    DETAILS →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Footer Hint */}
        <div 
          className="flex items-center justify-between mt-3 font-mono text-[10px] tracking-wider"
          style={{ color: c.body }}
        >
          <span>SWIPE OR USE ARROWS TO BROWSE</span>
          <span style={{ color: c.amber }}>SHOWING {filteredMachines.length} MACHINES</span>
        </div>

        {/* Modal for detailed inspection when a card is clicked */}
        {selectedMachine && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fadeIn"
            style={{ backgroundColor: c.bgOverlay }}
            onClick={() => setSelectedMachine(null)}
          >
            <div
              className="relative w-full max-w-3xl border p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: c.bgModal, borderColor: c.amberA40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMachine(null)}
                className="absolute top-4 right-4 hover:text-[oklch(0.93_0.005_250)] text-xl font-mono"
                style={{ color: c.body }}
              >
                ✕
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div 
                  className="w-full md:w-1/2 p-4 border flex items-center justify-center min-h-[250px]"
                  style={{ backgroundColor: c.bgDeep, borderColor: c.border }}
                >
                  <img
                    src={selectedMachine.image}
                    alt={selectedMachine.title}
                    className="max-h-[280px] object-contain"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: c.amber, marginBottom: '0.5rem' }}>
                    {selectedMachine.categoryLabel} · {selectedMachine.qty}
                  </div>
                  <h3 style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 700, color: c.heading, marginBottom: '0.5rem' }}>
                    {selectedMachine.title}
                  </h3>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px', color: c.cyan, marginBottom: '1rem', fontWeight: 600 }}>
                    MAKE: {selectedMachine.make}
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '11px', color: c.heading, background: c.amberA10, borderLeft: `3px solid ${c.amber}`, padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>
                    SPECIFICATION: {selectedMachine.spec}
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.7, color: c.body, marginBottom: '1rem' }}>
                    {selectedMachine.description}
                  </p>
                  <div className="space-y-1">
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.cyan, marginBottom: '0.35rem' }}>
                      KEY CAPABILITIES:
                    </div>
                    {selectedMachine.highlights.map((h) => (
                      <div key={h} style={{ fontFamily: 'monospace', fontSize: '11px', color: c.heading }}>
                        • {h}
                      </div>
                    ))}
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
