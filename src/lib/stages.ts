export interface StageSpec {
  label: string
  value: string
}

export interface Stage {
  id: number
  code: string
  title: string
  shortTitle: string
  description: string
  machine: string
  operation: string
  specs: StageSpec[]
  narration: string
  // ── interactive modal fields ──
  step: number
  imageUrl: string
  details: string[]
}

export const STAGES: Stage[] = [
  {
    id: 1,
    step: 1,
    code: 'STAGE 01',
    title: 'RAW MATERIAL',
    shortTitle: 'RAW',
    description:
      'A solid billet of H13 tool steel arrives at the facility. Surface imperfections and mill scale are visible. Material certification and hardness are verified against EN 10204 3.1 before machining begins.',
    machine: 'BRINELL HARDNESS TESTER',
    operation: 'INCOMING INSPECTION',
    specs: [
      { label: 'MATERIAL', value: 'H13 TOOL STEEL' },
      { label: 'HARDNESS', value: '~20 HRC (ANNEALED)' },
      { label: 'BILLET SIZE', value: '300 x 220 x 160 MM' },
      { label: 'CERT', value: 'EN 10204 3.1' },
    ],
    narration:
      'Stage one. Raw material. A solid billet of H13 tool steel arrives at the Daksh Tooling facility. The surface shows mill scale and imperfections. A Brinell hardness tester verifies material hardness against specification before any machining begins.',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop',
    details: [
      'Machine: Brinell Hardness Tester (Zwick/Roell BH3000 or equivalent) — 3,000 kgf load, Ø10 mm tungsten carbide ball indenter, optical reading via integrated camera',
      'Operations: Visual inspection for surface defects and cracks, dimensional verification against order sheet, multi-point Brinell hardness test, ultrasonic flaw detection for internal voids or inclusions',
      'Parameters: Billet size 300 × 220 × 160 mm, hardness target 180–220 HB (annealed state), material certification EN 10204 3.1, chemical composition verified to AISI H13 standard (Cr 5%, Mo 1.35%, V 1%)',
    ],
  },
  {
    id: 2,
    step: 2,
    code: 'STAGE 02',
    title: 'CNC MACHINING',
    shortTitle: 'CNC',
    description:
      'The billet is secured on the Fanuc VMC 850. Flat reference faces are established and the rough cavity is opened up with an indexable insert mill, removing bulk material at high feed rates.',
    machine: 'FANUC VMC 850',
    operation: 'ROUGH MACHINING',
    specs: [
      { label: 'SPINDLE SPEED', value: '12,000 RPM' },
      { label: 'TOOL', value: 'Ø25 MM INDEXABLE MILL' },
      { label: 'FEED RATE', value: '3,200 MM/MIN' },
      { label: 'TOLERANCE', value: '±0.050 MM' },
    ],
    narration:
      'Stage two. CNC Machining. The billet is secured on the Fanuc VMC 850 vertical machining centre. Flat reference faces are established and the rough cavity is opened at twelve thousand RPM, removing bulk material at thirty-two hundred millimetres per minute.',
    imageUrl: 'https://www.hcnc-group.com/Content/uploads/2021666663/2021081915190133ecbbc641c947b7bc0eb171a08d9e06.jpg',
    details: [
      'Machine: Fanuc VMC 850 CNC Vertical Machining Centre — XYZ travel 850 × 550 × 500 mm, Fanuc 31i-B CNC control, 12,000 RPM BT50 spindle, hydraulic vice workholding, datum-setting probe',
      'Operations: Face milling to establish flat reference datums on all six faces, rough pocket opening with indexable insert mill (Sandvik R390), side-wall roughing, adaptive toolpath via CAM (Mastercam or Hypermill)',
      'Parameters: Spindle 12,000 RPM, feed rate 3,200 mm/min, axial depth of cut 5 mm, radial step-over 60%, through-spindle coolant at 50 bar, positional tolerance ±0.050 mm, stock allowance 0.5 mm for finish passes',
    ],
  },
  {
    id: 3,
    step: 3,
    code: 'STAGE 03',
    title: 'MILLING',
    shortTitle: 'MILL',
    description:
      'Slots, pockets, and stepped surfaces are finish-milled on the DMG Mori DMU 65 monoBLOCK using five simultaneous axes. Complex geometry emerges as the mould base takes its final near-net shape.',
    machine: 'DMG MORI DMU 65 MONOBLOCK',
    operation: 'FINISH MILLING',
    specs: [
      { label: 'SPINDLE SPEED', value: '18,000 RPM' },
      { label: 'TOOL', value: 'Ø8 MM CARBIDE ENDMILL' },
      { label: 'AXES', value: '5 SIMULTANEOUS' },
      { label: 'TOLERANCE', value: '±0.020 MM' },
    ],
    narration:
      'Stage three. Five-axis milling on the DMG Mori DMU 65 monoBLOCK. Slots, pockets, and stepped surfaces are precision-milled at eighteen thousand RPM. Five simultaneous axes allow complex geometry to emerge as the mould base takes its final shape.',
    imageUrl: 'https://www.kitamura-machinery.com/wp-content/uploads/2025/04/5-Axis-4.jpg',
    details: [
      'Machine: DMG Mori DMU 65 monoBLOCK 5-Axis Machining Centre — XYZ 650 × 520 × 475 mm, 18,000 RPM HSK-A63 spindle, Siemens 840D sl control, 5-axis simultaneous interpolation, swivel range A ±110°, C 360°',
      'Operations: 5-axis simultaneous finish milling of pockets and slots, scallop-height-controlled surface milling of drafted walls, contour-following passes for parting surfaces, on-machine Renishaw probe measurement',
      'Parameters: Spindle 18,000 RPM, feed 2,400 mm/min, scallop height ≤0.005 mm, surface finish Ra ≤0.8 µm, positional accuracy ±0.020 mm, tilt angle ±90°, carbide endmill Ø4–16 mm (Fraisa or Kennametal)',
    ],
  },
  {
    id: 4,
    step: 4,
    code: 'STAGE 04',
    title: 'DRILLING & TAPPING',
    shortTitle: 'DRILL',
    description:
      'Bolt holes, cooling channels, and threaded features are drilled on the Fanuc Robodrill. Deep-hole drilling creates the water lines that will regulate mould temperature during injection cycles.',
    machine: 'FANUC ROBODRILL α-D21MiA5',
    operation: 'DEEP HOLE DRILLING',
    specs: [
      { label: 'SPINDLE SPEED', value: '4,500 RPM' },
      { label: 'DRILL', value: 'Ø10 MM CARBIDE' },
      { label: 'COOLANT', value: 'THROUGH-SPINDLE 70 BAR' },
      { label: 'THREAD', value: 'M12 x 1.75' },
    ],
    narration:
      'Stage four. Drilling and tapping on the Fanuc Robodrill α-D21MiA5. Bolt holes, cooling channels, and threaded features are drilled with through-spindle coolant at seventy bar. These deep water lines will regulate mould temperature during production cycles.',
    imageUrl: 'https://image.made-in-china.com/202f0j00gSVcojZrCYbR/CNC-Drilling-Tapping-Milling-Center-T6-Tap-Manufacturing-Machines-CNC-Drilling-Machine.webp',
    details: [
      'Machine: Fanuc Robodrill α-D21MiA5 — XYZ travel 700 × 400 × 330 mm, 10,000 RPM direct-drive spindle, 21-tool ATC, Fanuc 31i-B5 control, through-spindle coolant 70 bar, chip-to-chip time 1.4 s',
      'Operations: Centre drilling, peck-drill deep cooling channels (L/D up to 40×), bolt-hole circle patterns, M12 rigid tapping, countersinking for socket-head cap screws, deburring cycles',
      'Parameters: Drill Ø10 mm carbide (Gühring RT 100 U), spindle 4,500 RPM, feed 450 mm/min, through-spindle coolant 70 bar, peck-drill every 1× Ø, thread M12×1.75 6H tolerance, positional accuracy ±0.015 mm',
    ],
  },
  {
    id: 5,
    step: 5,
    code: 'STAGE 05',
    title: 'SURFACE GRINDING',
    shortTitle: 'GRIND',
    description:
      'Parting surfaces are ground flat and parallel to micron-level tolerances on the Chevalier FSG-2A818. The mirror-like finish ensures both mould halves seal perfectly under full clamping pressure.',
    machine: 'CHEVALIER FSG-2A818 GRINDER',
    operation: 'FLAT GRINDING',
    specs: [
      { label: 'WHEEL SPEED', value: '35 M/S' },
      { label: 'FLATNESS', value: '0.003 MM' },
      { label: 'SURFACE FINISH', value: 'Ra 0.2 µM' },
      { label: 'TOLERANCE', value: '±0.005 MM' },
    ],
    narration:
      'Stage five. Surface grinding on the Chevalier FSG-2A818. Parting surfaces are ground flat to within three micrometres, achieving a mirror finish of Ra 0.2 micrometres. This ensures the two mould halves seal with zero flash under full injection pressure.',
    imageUrl: 'https://www.chevaliertw.com/storage/media/products/grinding/high-precision-surface-and-form-grinders.jpg',
    details: [
      'Machine: Chevalier FSG-2A818 Smart-H Series Automatic Surface Grinder — 450 × 200 mm magnetic chuck, 3 kW spindle, automatic cross-feed and downfeed, electronic in-process gauging, coolant flood system',
      'Operations: Rough grinding (0.05 mm stock removal per pass), semi-finish pass with wheel dressing, spark-out finish pass (3 passes, 0 downfeed), wheel dressing between each stage, post-grind demagnetisation',
      'Parameters: Vitrified aluminium oxide wheel (WA60K8V), peripheral speed 35 m/s, table feed 10 m/min, down-feed 0.005 mm/pass for finish, flatness 0.003 mm, parallelism 0.005 mm, surface finish Ra 0.2 µm',
    ],
  },
  {
    id: 6,
    step: 6,
    code: 'STAGE 06',
    title: 'EDM',
    shortTitle: 'EDM',
    description:
      'The Sodick AG60L burns sharp internal cavities that no rotating cutter can reach. A graphite electrode erodes metal one micron at a time through controlled spark discharge at 45 A peak current.',
    machine: 'SODICK AG60L SINKER EDM',
    operation: 'CAVITY BURNING',
    specs: [
      { label: 'ELECTRODE', value: 'GRAPHITE / COPPER' },
      { label: 'DISCHARGE', value: '45 A PEAK' },
      { label: 'GAP', value: '0.02 MM' },
      { label: 'SURFACE', value: 'VDI 18' },
    ],
    narration:
      'Stage six. Sinker EDM on the Sodick AG60L. A graphite electrode sparks away metal one micron at a time, burning sharp internal cavities impossible to cut with any rotating tool. At forty-five amps peak discharge, precision cavity geometry is achieved through controlled erosion.',
    imageUrl: 'https://img.directindustry.com/images_di/photo-m2/22934-11564617.jpg',
    details: [
      'Machine: Sodick AG60L CNC Sinker EDM — XYZ travel 600 × 400 × 300 mm, Sodick LN1W linear-motor drive (no backlash), SP3A power supply, 3-axis ATC for automatic electrode change, dielectric oil circulation',
      'Operations: Graphite electrode manufacture (rough milled then finish milled on VMC), cavity burning in roughing mode then finishing mode, electrode wear compensation via servo, orbital flushing for deep cavities',
      'Parameters: Peak current 45 A (roughing), 4 A (finishing), pulse on-time 200 µs, spark gap 0.02 mm, dielectric pressure 0.3 MPa, surface texture VDI 18 (Ra ~0.8 µm), electrode wear ratio <1%, corner radius ≥0.05 mm',
    ],
  },
  {
    id: 7,
    step: 7,
    code: 'STAGE 07',
    title: 'WIRE CUT EDM',
    shortTitle: 'WIRE',
    description:
      'A 0.25 mm brass wire on the Fanuc Robocut slices through hardened steel with electrical discharge, cutting ejector pin slots, complex profiles, and sharp internal corners to ±0.003 mm accuracy.',
    machine: 'FANUC ROBOCUT α-C400iA',
    operation: 'PROFILE CUTTING',
    specs: [
      { label: 'WIRE', value: 'Ø0.25 MM BRASS' },
      { label: 'CUT SPEED', value: '180 MM²/MIN' },
      { label: 'ACCURACY', value: '±0.003 MM' },
      { label: 'TAPER', value: 'UP TO 30°' },
    ],
    narration:
      'Stage seven. Wire cut EDM on the Fanuc Robocut α-C400iA. A 0.25 millimetre brass wire slices through hardened steel using electrical discharge. Ejector pin slots and complex profiles are cut to three micrometre accuracy — impossible by any other method.',
    imageUrl: 'https://images.prismic.io/xometry-marketing/ed7e467a-5cbb-4bd0-970a-11475acc345d_3-Types-of-EDM-Machining-and-Their-Differences.jpg?auto=format,compress&rect=0,0,486,486&w=1200&fit=max',
    details: [
      'Machine: Fanuc Robocut α-C400iA CNC Wire EDM — UV taper head ±30°, XYZ travel 400 × 300 × 220 mm, Fanuc CNC control with AI contour control II, automatic wire threader (even on broken wire), deionised water dielectric',
      'Operations: Start-hole drilling, rough cut (1st pass), skim cuts (2nd and 3rd passes) for dimensional accuracy and surface finish, taper cutting for ejector pin clearance relief, automatic wire re-threading on break',
      'Parameters: Wire Ø0.25 mm coated brass (Bedra Topas Speed), rough speed 180 mm²/min, skim speed 60 mm²/min, accuracy ±0.003 mm, surface Ra 0.4 µm after skim, taper up to 30°, water conductivity 5–15 µS/cm',
    ],
  },
  {
    id: 8,
    step: 8,
    code: 'STAGE 08',
    title: 'ASSEMBLY',
    shortTitle: 'ASSY',
    description:
      'Core plate, cavity plate, guide pillars, bushes, and fasteners come together on the granite surface plate. Every component slides into position with H7/g6 fits and micron-level alignment.',
    machine: 'PRECISION ASSEMBLY BENCH',
    operation: 'FINAL ASSEMBLY',
    specs: [
      { label: 'COMPONENTS', value: '42 PARTS' },
      { label: 'GUIDE PILLARS', value: 'Ø30 MM x 4' },
      { label: 'FIT CLASS', value: 'H7 / g6' },
      { label: 'TORQUE', value: '85 NM' },
    ],
    narration:
      'Stage eight. Final assembly on a precision granite surface plate. Forty-two components come together — core plate, cavity plate, guide pillars, bushes, and fasteners. Each part slides into position with H7 to g6 fits, achieving micron-level alignment.',
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&q=80&fit=crop',
    details: [
      'Equipment: Precision granite surface plate (Grade A, 1200 × 900 mm), calibrated torque wrench, hydraulic press (for bush press-fit), dial gauge and digital height gauge, Renishaw dial test indicators for alignment',
      'Operations: Guide pillar and bush press-fit assembly, core/cavity plate alignment and dowel-pin locking, cooling circuit connection and pressure-test (15 bar, 5 min), ejector pin fitting and stroke verification, first mould open/close trial on bench',
      'Parameters: Guide pillar fit H7/g6 (clearance 10–25 µm), SHCS M16 torqued to 85 Nm, cooling circuit leak test at 15 bar, ejector pin clearance 0.01–0.02 mm, parallelism of mould parting faces ≤0.01 mm, all contact surfaces verified with blue-marking compound',
    ],
  },
  {
    id: 9,
    step: 9,
    code: 'STAGE 09',
    title: 'QUALITY INSPECTION',
    shortTitle: 'QC',
    description:
      'The Zeiss Contura CMM scans 48,200 points across every critical surface, verifying dimensions against the master CAD model. Maximum deviation: 4 µm. Result: all green — full PPAP report generated.',
    machine: 'ZEISS CONTURA G2 CMM',
    operation: 'DIMENSIONAL VERIFICATION',
    specs: [
      { label: 'CMM ACCURACY', value: '1.5 + L/350 µM' },
      { label: 'POINTS SCANNED', value: '48,200' },
      { label: 'DEVIATION MAX', value: '0.004 MM' },
      { label: 'RESULT', value: 'PASS — ALL GREEN' },
    ],
    narration:
      'Stage nine. Quality inspection on the Zeiss Contura G2 CMM. Forty-eight thousand two hundred scanning points verify every critical dimension against the digital CAD model. Maximum deviation: four micrometres. Result: all green — a full PPAP inspection report is generated.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
    details: [
      'Machine: Zeiss Contura G2 Bridge-Type CMM — measuring volume 700 × 1000 × 600 mm, volumetric accuracy MPE_E = 1.5 + L/350 µm, VAST XXT scanning probe, Calypso CMM software, temperature-stabilised room 20 ± 0.5°C',
      'Operations: Full 3D scanning of cavity and core surfaces (48,200 touch-trigger and scanning points), GD&T analysis against STEP master model, surface roughness spot-check with Mahr MarSurf, colour deviation map and PPAP/ISIR report generation',
      'Parameters: Probe tip radius compensation 2 µm, probe qualification with reference sphere, maximum dimensional deviation 0.004 mm, cavity surface Ra ≤0.4 µm, all critical features within ±0.01 mm of nominal, full CMM report issued with mould',
    ],
  },
  {
    id: 10,
    step: 10,
    code: 'STAGE 10',
    title: 'FINISHED PRODUCT',
    shortTitle: 'DONE',
    description:
      'Manufacturing complete. A precision injection mould born from a single H13 steel billet, hardened to 52 HRC, certified to ISO 9001:2015 — 9 operations, 48,200 CMM points, zero rejects.',
    machine: 'FINISHED MOULD — ISO 9001:2015',
    operation: 'FREE INSPECTION',
    specs: [
      { label: 'STATUS', value: 'MANUFACTURING COMPLETE' },
      { label: 'TOTAL OPERATIONS', value: '9' },
      { label: 'FINAL HARDNESS', value: '52 HRC' },
      { label: 'CYCLE READY', value: 'YES' },
    ],
    narration:
      'Manufacturing complete. What began as a raw block of steel is now a precision injection mould, hardened to fifty-two Rockwell C, certified to ISO 9001, and ready for production. This is Daksh Tooling — where every micron matters. Drag to rotate and inspect your workpiece.',
    imageUrl: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80&fit=crop',
    details: [
      'Final state: H13 tool steel, vacuum hardened and triple-tempered to 52 HRC, nitrided surface (0.1 mm case depth) for enhanced wear resistance, all cavity surfaces polished to SPI A2 standard (Ra 0.05 µm)',
      'Deliverables: Full CMM inspection report (PPAP Level 3), material test certificates (EN 10204 3.1), complete tooling drawing set, mould trial (T0) report, cooling circuit layout, recommended maintenance schedule every 50,000 cycles',
      'Performance: Designed for 500,000+ injection cycles, operating pressure up to 1,200 bar, mould temperature range 40–120°C, cycle time target ≤35 seconds, all critical dimensions certified to ±0.01 mm — Daksh Tooling ISO 9001:2015 quality guaranteed',
    ],
  },
]

export const STAGE_COUNT = STAGES.length

export const INTRO_FRACTION = 0.06

export function progressToStageValue(p: number): number {
  if (p <= INTRO_FRACTION) return 0
  const t = (p - INTRO_FRACTION) / (1 - INTRO_FRACTION)
  return Math.min(t * STAGE_COUNT, STAGE_COUNT)
}

export function stageIndexFromValue(v: number): number {
  return Math.min(Math.floor(v), STAGE_COUNT - 1)
}
