import React, { useState, useRef, useEffect, useCallback } from "react";

/* ================= Fe–Fe3C PHYSICS MODEL ================= */

const A1 = 727, EUTECTOID_C = 0.76, MAX_GAMMA_C = 2.11, EUTECTIC_C = 4.3, EUTECTIC_T = 1147;

const liquidus = (c) =>
  c <= EUTECTIC_C
    ? 1538 - ((1538 - EUTECTIC_T) * c) / EUTECTIC_C
    : EUTECTIC_T + ((c - EUTECTIC_C) / (6.67 - EUTECTIC_C)) * (1252 - EUTECTIC_T);

const solidus = (c) => (c <= MAX_GAMMA_C ? 1495 - ((1495 - EUTECTIC_T) * c) / MAX_GAMMA_C : EUTECTIC_T);

const A3 = (c) => 912 - ((912 - A1) * Math.min(c, EUTECTOID_C)) / EUTECTOID_C;
const Acm = (c) => A1 + ((EUTECTIC_T - A1) * (c - EUTECTOID_C)) / (MAX_GAMMA_C - EUTECTOID_C);
const Ms = (c) => Math.max(20, 539 - 423 * Math.min(c, 1.2)); // martensite start

// Equilibrium phase at (T, C)
function eqPhase(T, C) {
  if (T >= liquidus(C)) return "liquid";
  if (C > MAX_GAMMA_C) {
    if (T >= EUTECTIC_T) return C < EUTECTIC_C ? "liq_aus" : "liq_cem";
    if (T > A1) return "aus_cem_led";
    return "castiron";
  }
  if (C < 0.09 && T > 1394) return "delta";
  if (T >= solidus(C)) return "liq_aus";
  const upper = C <= EUTECTOID_C ? A3(C) : Acm(C);
  if (T >= upper) return "austenite";
  if (T > A1) return C <= EUTECTOID_C ? "fer_aus" : "aus_cem";
  // below A1
  if (C <= 0.022) return "ferrite";
  if (C < 0.7) return "fer_pearl";
  if (C <= 0.82) return "pearlite";
  return "pearl_cem";
}

/* ================= PHASE INFO ================= */

const PHASES = {
  liquid: {
    name: "Liquid",
    lattice: "None — no long-range order",
    render: "liquid",
    solubility: "Carbon fully dissolved, atoms mobile",
    hard: "—",
    info:
      "No lattice at all. Atoms slide past each other freely; carbon is completely dissolved. This is the state in the ladle at a steel mill. Everything below is a story of how this liquid gives up its freedom.",
    practical: "Casting, continuous casting of slabs. Composition is fixed here — you can't add carbon later without remelting the surface (carburizing is the partial exception).",
  },
  liq_aus: {
    name: "Liquid + Austenite",
    lattice: "FCC crystals growing in melt",
    render: "slush",
    solubility: "Solid crystals reject/accept C vs liquid",
    hard: "—",
    info:
      "The mushy zone. FCC austenite dendrites (tree-shaped crystals) grow into the melt as heat leaves. Composition differs between solid and liquid — the origin of segregation defects in castings.",
    practical: "Continuous casters carefully control this zone; cracks and centerline segregation happen here. Welders live in a miniature version of it at every weld pool edge.",
  },
  liq_cem: {
    name: "Liquid + Cementite",
    lattice: "Orthorhombic Fe₃C plates in melt",
    render: "slush",
    solubility: "Primary Fe₃C (6.67 %C) crystallizes first",
    hard: "Plates: ~800 HV",
    info:
      "Beyond the eutectic point (4.3 %C), brittle primary cementite plates freeze out of the liquid first. The result at room temperature is extremely hard, unmachinable white iron.",
    practical: "Mostly avoided, except where pure abrasion resistance is wanted: crusher jaws, slurry pump liners, mill balls.",
  },
  delta: {
    name: "δ-Ferrite",
    lattice: "BCC — body-centered cubic (high-T)",
    render: "bcc",
    solubility: "Max ~0.09 %C",
    hard: "—",
    info:
      "Iron's little-known third act: just below melting, iron is BCC again (δ), flips to FCC (γ) on cooling, then back to BCC (α). Same lattice as room-temperature ferrite, just very hot.",
    practical: "Matters in welding and stainless steel metallurgy (δ-ferrite content controls hot-cracking in welds). For plain steel intuition, note it exists and move on.",
  },
  austenite: {
    name: "Austenite (γ)",
    lattice: "FCC — face-centered cubic",
    render: "fcc",
    solubility: "Up to 2.11 %C at 1147 °C — the carbon sponge",
    hard: "Soft & very ductile at temperature",
    info:
      "Atoms on cube corners + face centers. Denser than BCC overall, yet its interstitial holes are bigger and rounder, so carbon dissolves ~100× more easily. Non-magnetic. Every heat treatment begins by coming here, because this is the only phase where carbon is fully in solution and ready to be relocated.",
    practical: "Forging, rolling and hot bending are all done here (red-to-yellow heat). 'Austenitize' = step one of hardening: dissolve the carbon before deciding its fate with the cooling rate.",
  },
  fer_aus: {
    name: "Ferrite + Austenite",
    lattice: "BCC grains growing inside FCC",
    render: "duo_bcc_fcc",
    solubility: "C is being pushed into the shrinking γ",
    hard: "—",
    info:
      "Between A3 and A1 for hypoeutectoid steel. BCC ferrite nucleates at austenite grain boundaries and grows; it can't hold carbon, so it pumps C into the remaining austenite, enriching it toward 0.76 % — setting up the pearlite reaction at 727 °C.",
    practical: "Intercritical zone. Dual-phase automotive steels are made by quenching from exactly here: soft ferrite + hard martensite islands = strong AND formable car bodies.",
  },
  aus_cem: {
    name: "Austenite + Cementite",
    lattice: "FCC + orthorhombic Fe₃C at boundaries",
    render: "duo_fcc_fe3c",
    solubility: "Excess C precipitating as Fe₃C",
    hard: "Carbide network forming",
    info:
      "Hypereutectoid steel between Acm and A1: austenite can no longer hold all the carbon, so cementite precipitates — preferentially as a network along grain boundaries. A continuous brittle network is a crack highway.",
    practical: "Tool steels are deliberately quenched FROM this zone (not above Acm) so carbides stay as dispersed particles for wear resistance instead of coarsening or fully dissolving.",
  },
  ferrite: {
    name: "Ferrite (α)",
    lattice: "BCC — body-centered cubic",
    render: "bcc",
    solubility: "Max 0.022 %C (≈ nothing)",
    hard: "~80 HV — soft, ductile, magnetic",
    info:
      "Corner atoms + one body-center; 68% packed but with small, awkwardly shaped interstitial gaps — a carbon atom simply doesn't fit without straining the lattice, so it barely dissolves. Iron's stable room-temperature form: soft, formable, magnetic.",
    practical: "Nearly-pure ferrite = mild steel sheet: car body panels, cans, wire, nails. Bends before it breaks, welds without drama.",
  },
  fer_pearl: {
    name: "Ferrite + Pearlite",
    lattice: "BCC grains + lamellar α/Fe₃C colonies",
    render: "grains",
    solubility: "C locked inside pearlite's Fe₃C plates",
    hard: "~120–200 HV with %C",
    info:
      "The default slow-cooled structure of ordinary steel: soft proeutectoid ferrite grains with striped pearlite islands. Lever rule: pearlite fraction ≈ %C / 0.76 — the carbon slider directly sets the hard/soft grain ratio.",
    practical: "Structural steel, rebar, ship plate, most of the built world. Strength scales with pearlite fraction; weldability falls with it. ~0.2 %C is the civil-engineering sweet spot.",
  },
  pearlite: {
    name: "Pearlite",
    lattice: "Lamellar: alternating BCC α + Fe₃C plates",
    render: "pearlite",
    solubility: "Partitioned: α ~0.02 %C, Fe₃C 6.67 %C",
    hard: "~250–300 HV",
    info:
      "The eutectoid masterpiece. At 0.76 %C, austenite crossing 727 °C splits into alternating nanometer-scale plates of soft ferrite and hard cementite — side-by-side layers minimize how far carbon must diffuse. A self-assembled composite: hard reinforcement inside a tough matrix.",
    practical: "Fully pearlitic steel is drawn into the strongest bulk material in common use: suspension-bridge cable and tire cord (patented wire, >3 GPa). Also rails — wear resistance from Fe₃C, crack tolerance from α.",
  },
  pearl_cem: {
    name: "Pearlite + Cementite",
    lattice: "Lamellar colonies + Fe₃C boundary network",
    render: "pearlite_net",
    solubility: "Excess C as proeutectoid Fe₃C",
    hard: "~300–400 HV, brittle network",
    info:
      "Hypereutectoid, slow-cooled: pearlite plus a shell of proeutectoid cementite outlining former austenite grains. Hard and wear-resistant, but the continuous carbide network makes it notch-brittle.",
    practical: "Files and high-carbon tool blanks. Before machining, this is 'spheroidized' (long soak just below 727 °C) to ball the carbides up — then hardened properly at the end.",
  },
  castiron: {
    name: "Pearlite + Cementite + Ledeburite",
    lattice: "Eutectic carbide mixture (white cast iron)",
    render: "pearlite_net",
    solubility: ">2.11 %C — beyond steel entirely",
    hard: "400–600 HV",
    info:
      "Cast iron territory. The eutectic (ledeburite) formed at 1147 °C leaves massive carbide content. In real foundry practice, silicon steers this carbon into graphite instead: gray iron (flakes) or ductile iron (spheres).",
    practical: "Melts ~400 °C lower than steel and flows beautifully — hence CAST iron: engine blocks, brake rotors, machine bases, cookware. Cheap, dampens vibration, but you cast it — never forge it.",
  },
  aus_cem_led: {
    name: "Austenite + Cementite (Ledeburite)",
    lattice: "FCC + massive eutectic Fe₃C",
    render: "duo_fcc_fe3c",
    solubility: "γ saturating toward 2.11 %C",
    hard: "—",
    info:
      "Solidified cast iron above 727 °C: austenite islands inside the eutectic carbide mixture. On further slow cooling the austenite will itself decompose to pearlite at 727 °C.",
    practical: "Foundries do heat treatments (e.g. malleablizing) in this window to convert brittle carbide structures into tougher ones.",
  },
  martensite: {
    name: "Martensite",
    lattice: "BCT — body-centered tetragonal (trapped C)",
    render: "bct",
    solubility: "Carbon supersaturated — trapped, not dissolved",
    hard: "Up to ~65 HRC (~800 HV) — hardest plain-steel state",
    info:
      "Diffusion lost the race. Quenching gave the FCC→BCC snap no time for carbon to escape, so trapped carbon jams the cube into a stretched tetragon (note the elongated cell and the carbon atom wedged in). The strain around every trapped atom pins dislocations — the defects whose motion IS plastic deformation — so nothing can glide: extreme hardness, glass-like brittleness, high locked-in stress. Not on the equilibrium diagram at all, and it's the most valuable state in steel.",
    practical: "Knives, files, bearings, gears, springs — after tempering. As-quenched it can crack sitting on the bench. Also the villain of welding: steel self-quenching next to a weld makes brittle martensite in the heat-affected zone.",
  },
  tempered: {
    name: "Tempered Martensite",
    lattice: "BCC + fine dispersed carbides",
    render: "bct_temp",
    solubility: "Trapped C precipitating as tiny Fe₃C",
    hard: "~30–60 HRC — dial set by temper temperature",
    info:
      "Reheating below 727 °C gives the trapped carbon just enough mobility to precipitate out as ultrafine carbides, relaxing the BCT strain back toward BCC. You trade hardness for toughness on a smooth, controllable dial.",
    practical: "Quench + temper is THE strength pipeline: grade 10.9 bolts, axles, crankshafts, springs (300–450 °C), knives and razors (150–200 °C). Almost nothing is used as-quenched.",
  },
};

/* ================= INCANDESCENCE (signature) ================= */
// Approximate visible glow of steel vs temperature
const GLOW_STOPS = [
  [400, [26, 24, 26]], [550, [74, 16, 12]], [650, [122, 24, 12]],
  [750, [178, 41, 14]], [850, [214, 74, 20]], [950, [235, 116, 28]],
  [1050, [244, 156, 40]], [1200, [250, 199, 74]], [1350, [253, 226, 130]],
  [1538, [255, 244, 208]],
];
function glowRGB(T) {
  if (T <= GLOW_STOPS[0][0]) return GLOW_STOPS[0][1];
  for (let i = 1; i < GLOW_STOPS.length; i++) {
    const [t1, c1] = GLOW_STOPS[i - 1], [t2, c2] = GLOW_STOPS[i];
    if (T <= t2) {
      const f = (T - t1) / (t2 - t1);
      return c1.map((v, k) => Math.round(v + (c2[k] - v) * f));
    }
  }
  return GLOW_STOPS[GLOW_STOPS.length - 1][1];
}
const rgb = (a, alpha = 1) => `rgba(${a[0]},${a[1]},${a[2]},${alpha})`;

/* ================= LATTICE RENDERING ================= */
// Isometric projection of a unit cell
const ISO = (x, y, z) => [ (x - z) * 0.82, (x + z) * 0.41 - y * 0.95 ];

function cellAtoms(type) {
  const corners = [];
  for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) corners.push([x, y, z, "fe"]);
  if (type === "bcc") return [...corners, [0.5, 0.5, 0.5, "fe"]];
  if (type === "fcc")
    return [...corners,
      [0.5, 0.5, 0], [0.5, 0.5, 1], [0.5, 0, 0.5], [0.5, 1, 0.5], [0, 0.5, 0.5], [1, 0.5, 0.5]]
      .map((a) => (a.length === 3 ? [...a, "fe"] : a));
  if (type === "bct") {
    const s = corners.map(([x, y, z]) => [x, y * 1.35, z, "fe"]);
    return [...s, [0.5, 0.675, 0.5, "fe"], [0.5, 1.02, 0.5, "c"], [0, 0.34, 0.5, "c2"]];
  }
  if (type === "fe3c") {
    const s = corners.map(([x, y, z]) => [x * 1.25, y * 0.8, z, "fe"]);
    return [...s, [0.62, 0.4, 0.5, "fe"], [0.31, 0.62, 0.25, "c"], [0.94, 0.2, 0.75, "c"], [0.62, 0.75, 0.8, "c"]];
  }
  return corners;
}
const cellEdges = (type) => {
  const sy = type === "bct" ? 1.35 : type === "fe3c" ? 0.8 : 1;
  const sx = type === "fe3c" ? 1.25 : 1;
  const E = [];
  const pts = [[0,0,0],[sx,0,0],[sx,0,1],[0,0,1],[0,sy,0],[sx,sy,0],[sx,sy,1],[0,sy,1]];
  const idx = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
  for (const [a, b] of idx) E.push([pts[a], pts[b]]);
  return E;
};

function UnitCell({ type, T, tick, size = 200, label }) {
  const scale = size * (type === "bct" ? 0.34 : 0.42);
  const cx = size / 2, cy = size / 2 + (type === "bct" ? size * 0.1 : size * 0.06);
  const amp = 0.008 + (Math.max(T, 20) / 1600) * 0.045;
  const jig = (i, ax) => Math.sin(tick * (2.2 + (i % 5) * 0.7) + i * 2.1 + ax * 3) * amp;
  const atoms = cellAtoms(type)
    .map((a, i) => {
      const [px, py] = ISO(a[0] + jig(i, 0), a[1] + jig(i, 1), a[2] + jig(i, 2));
      return { x: cx + px * scale, y: cy - py * scale + scale * 0.55, kind: a[3], depth: a[0] + a[2] - a[1], i };
    })
    .sort((p, q) => p.depth - q.depth);
  const edges = cellEdges(type).map(([a, b]) => {
    const [x1, y1] = ISO(...a), [x2, y2] = ISO(...b);
    return { x1: cx + x1 * scale, y1: cy - y1 * scale + scale * 0.55, x2: cx + x2 * scale, y2: cy - y2 * scale + scale * 0.55 };
  });
  const feColor = "#9fb6cf", cColor = "#ff5d47";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {edges.map((e, i) => (
        <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="#3d4654" strokeWidth="1" />
      ))}
      {atoms.map((a) => (
        <g key={a.i}>
          <circle cx={a.x} cy={a.y} r={a.kind === "fe" ? size * 0.055 : size * 0.028}
            fill={a.kind === "fe" ? feColor : cColor}
            opacity={a.kind === "c2" ? 0.55 : 1}
            stroke={a.kind === "fe" ? "#2b3442" : "#7a1f14"} strokeWidth="1.2" />
          {a.kind === "fe" && <circle cx={a.x - size * 0.016} cy={a.y - size * 0.018} r={size * 0.016} fill="#e7eef7" opacity="0.7" />}
        </g>
      ))}
      {label && (
        <text x={size / 2} y={size - 4} textAnchor="middle" fill="#8a93a0"
          style={{ font: `600 ${size * 0.062}px ui-monospace, monospace`, letterSpacing: "0.08em" }}>{label}</text>
      )}
    </svg>
  );
}

function LiquidView({ T, tick, size = 220 }) {
  const atoms = [];
  for (let i = 0; i < 26; i++) {
    const bx = (i * 73) % size, by = (i * 47 + 30) % size;
    const a = 6 + (T / 1600) * 10;
    atoms.push({
      x: bx + Math.sin(tick * 1.4 + i * 1.7) * a + Math.sin(tick * 0.6 + i) * a,
      y: by + Math.cos(tick * 1.1 + i * 2.3) * a,
      c: i % 6 === 0,
    });
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {atoms.map((a, i) => (
        <circle key={i} cx={(a.x + size) % size} cy={(a.y + size) % size} r={a.c ? 4 : 9}
          fill={a.c ? "#ff5d47" : "#9fb6cf"} opacity="0.9" />
      ))}
    </svg>
  );
}

function Lamellae({ size = 220, tick, network = false }) {
  const bands = [];
  for (let i = 0; i < 12; i++) bands.push(i);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-18 ${size / 2} ${size / 2})`}>
        {bands.map((i) => (
          <rect key={i} x={-40} y={i * (size / 11) - 10} width={size + 80}
            height={i % 2 ? size / 30 : size / 16}
            fill={i % 2 ? "#39424f" : "#9fb6cf"} opacity={i % 2 ? 1 : 0.85} />
        ))}
      </g>
      {network && (
        <path d={`M0 ${size * 0.15} Q ${size * 0.4} ${size * 0.3} ${size * 0.55} 0 M ${size} ${size * 0.6} Q ${size * 0.6} ${size * 0.65} ${size * 0.5} ${size} M0 ${size * 0.8} Q ${size * 0.25} ${size * 0.7} ${size * 0.3} ${size}`}
          stroke="#39424f" strokeWidth={size * 0.045} fill="none" opacity="0.95" />
      )}
      <text x={6} y={size - 8} fill="#69727f" style={{ font: `600 11px ui-monospace, monospace` }}>
        α (light) / Fe₃C (dark) plates{network ? " + Fe₃C network" : ""}
      </text>
    </svg>
  );
}

function GrainMix({ size = 220, pearlFrac = 0.4 }) {
  const cells = [];
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let gx = 0; gx < 4; gx++)
    for (let gy = 0; gy < 4; gy++)
      cells.push({ x: gx * (size / 4) + rnd() * 8, y: gy * (size / 4) + rnd() * 8, pearl: rnd() < pearlFrac });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <pattern id="lam" width="7" height="7" patternTransform="rotate(35)" patternUnits="userSpaceOnUse">
          <rect width="7" height="7" fill="#9fb6cf" />
          <rect width="7" height="2.6" fill="#39424f" />
        </pattern>
      </defs>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={size / 4.4} height={size / 4.4} rx={size / 16}
          fill={c.pearl ? "url(#lam)" : "#c6d4e4"} stroke="#242b36" strokeWidth="2" />
      ))}
      <text x={6} y={size - 8} fill="#69727f" style={{ font: "600 11px ui-monospace, monospace" }}>
        ferrite grains + pearlite islands ({Math.round(pearlFrac * 100)}% pearlite)
      </text>
    </svg>
  );
}

/* ================= PHASE DIAGRAM ================= */
function PhaseDiagram({ C, T, msLine }) {
  const W = 340, H = 250, PL = 34, PB = 22, PT = 8, PR = 8;
  const X = (c) => PL + (c / 6.67) * (W - PL - PR);
  const Y = (t) => H - PB - (t / 1600) * (H - PB - PT);
  const a3pts = [];
  for (let c = 0; c <= EUTECTOID_C + 1e-9; c += 0.05) a3pts.push(`${X(c)},${Y(A3(c))}`);
  const liqpts = [];
  for (let c = 0; c <= 6.67; c += 0.1) liqpts.push(`${X(c)},${Y(liquidus(c))}`);
  const mspts = [];
  for (let c = 0; c <= 1.4; c += 0.05) mspts.push(`${X(c)},${Y(Ms(c))}`);
  const lbl = (x, y, s, fill = "#69727f") => (
    <text x={x} y={y} fill={fill} style={{ font: "600 9px ui-monospace, monospace" }}>{s}</text>
  );
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
      <rect x={PL} y={PT} width={W - PL - PR} height={H - PB - PT} fill="#12151a" stroke="#2a2f38" />
      {/* region shading: austenite field */}
      <path d={`M ${a3pts.join(" L ")} L ${X(EUTECTOID_C)},${Y(A1)} L ${X(MAX_GAMMA_C)},${Y(EUTECTIC_T)} L ${X(2.11)},${Y(solidus(2.11))} L ${X(0)},${Y(1495)} Z`}
        fill="#2b3f55" opacity="0.55" />
      {/* lines */}
      <polyline points={liqpts.join(" ")} fill="none" stroke="#c88a4a" strokeWidth="1.5" />
      <line x1={X(0)} y1={Y(1495)} x2={X(MAX_GAMMA_C)} y2={Y(EUTECTIC_T)} stroke="#8a93a0" strokeWidth="1" />
      <polyline points={a3pts.join(" ")} fill="none" stroke="#7fb4d9" strokeWidth="1.5" />
      <line x1={X(EUTECTOID_C)} y1={Y(A1)} x2={X(MAX_GAMMA_C)} y2={Y(EUTECTIC_T)} stroke="#7fb4d9" strokeWidth="1.5" />
      <line x1={X(0.022)} y1={Y(A1)} x2={X(6.67)} y2={Y(A1)} stroke="#d9a441" strokeWidth="1.5" />
      <line x1={X(MAX_GAMMA_C)} y1={Y(EUTECTIC_T)} x2={X(6.67)} y2={Y(EUTECTIC_T)} stroke="#8a93a0" strokeWidth="1" />
      {msLine && <polyline points={mspts.join(" ")} fill="none" stroke="#ff5d47" strokeWidth="1.2" strokeDasharray="4 3" />}
      {/* key verticals */}
      <line x1={X(EUTECTOID_C)} y1={Y(A1)} x2={X(EUTECTOID_C)} y2={H - PB} stroke="#3a4250" strokeDasharray="2 3" />
      <line x1={X(MAX_GAMMA_C)} y1={Y(EUTECTIC_T)} x2={X(MAX_GAMMA_C)} y2={H - PB} stroke="#3a4250" strokeDasharray="2 3" />
      <line x1={X(EUTECTIC_C)} y1={Y(EUTECTIC_T)} x2={X(EUTECTIC_C)} y2={Y(liquidus(EUTECTIC_C))} stroke="#3a4250" strokeDasharray="2 3" />
      {/* labels */}
      {lbl(X(0.25), Y(1000), "γ", "#a8c8e8")}
      {lbl(X(0.12), Y(790), "α+γ")}
      {lbl(X(1.25), Y(880), "γ+Fe₃C")}
      {lbl(X(1.6), Y(480), "P+Fe₃C")}
      {lbl(X(0.18), Y(480), "α+P")}
      {lbl(X(1.6), Y(1420), "Liquid", "#c88a4a")}
      {lbl(X(4.4), Y(950), "led+Fe₃C")}
      {lbl(X(5.4), Y(A1 - 12), "727 °C (A1)", "#d9a441")}
      {lbl(X(4.7), Y(EUTECTIC_T + 22), "1147 °C")}
      {msLine && lbl(X(0.05), Y(Ms(0.05)) - 5, "Ms", "#ff5d47")}
      {/* axes ticks */}
      {[0, 1, 2, 3, 4, 5, 6].map((c) => (
        <g key={c}>{lbl(X(c) - 3, H - 8, String(c))}</g>
      ))}
      {[400, 727, 1147, 1538].map((t) => (
        <g key={t}>{lbl(2, Y(t) + 3, String(t))}</g>
      ))}
      {lbl(W / 2 - 30, H - 1, "carbon wt%")}
      {/* live composition line + marker */}
      <line x1={X(C)} y1={PT} x2={X(C)} y2={H - PB} stroke="#e8e6e0" strokeWidth="0.7" strokeDasharray="3 3" opacity="0.5" />
      <circle cx={X(C)} cy={Y(Math.min(T, 1600))} r="5.5" fill="none" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx={X(C)} cy={Y(Math.min(T, 1600))} r="2.4" fill="#ff8a3d" />
    </svg>
  );
}

/* ================= MAIN ================= */
const QUENCH_RATE = 50; // °C/s — pedagogical critical cooling rate

export default function FurnaceSimulator() {
  const [carbon, setCarbon] = useState(0.4);
  const [startT, setStartT] = useState(25);
  const [targetT, setTargetT] = useState(900);
  const [duration, setDuration] = useState(60); // simulated seconds
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [simElapsed, setSimElapsed] = useState(0);
  const [tick, setTick] = useState(0);
  const [isMart, setIsMart] = useState(false);
  const [wasTempered, setWasTempered] = useState(false);

  const runRef = useRef({ from: 25, to: 900, dur: 60, elapsed: 0 });
  const flags = useRef({ running: false, paused: false, mart: false, temper: false, lastT: 25 });

  const currentT = running || simElapsed > 0
    ? runRef.current.from + (runRef.current.to - runRef.current.from) * Math.min(simElapsed / runRef.current.dur, 1)
    : startT;

  const rate = Math.abs(targetT - startT) / duration;

  // simulation loop
  useEffect(() => {
    let raf, last = performance.now();
    const loop = (now) => {
      const dt = (now - last) / 1000; last = now;
      setTick((t) => t + dt);
      if (flags.current.running && !flags.current.paused) {
        const r = runRef.current;
        const wall = Math.min(r.dur, 12); // compress long runs to ≤12 s wall time
        const simDt = dt * (r.dur / wall);
        r.elapsed = Math.min(r.elapsed + simDt, r.dur);
        setSimElapsed(r.elapsed);
        const T = r.from + (r.to - r.from) * (r.elapsed / r.dur);
        const rt = Math.abs(r.to - r.from) / r.dur;
        const lastT = flags.current.lastT;
        // reheating past A1 dissolves martensite back into austenite
        if (T > A1 && flags.current.mart) { flags.current.mart = false; flags.current.temper = false; setIsMart(false); setWasTempered(false); }
        // crossing A1 downward
        if (lastT > A1 && T <= A1) {
          const wasAust = eqPhase(lastT, carbon) === "austenite" || eqPhase(lastT, carbon) === "fer_aus" || eqPhase(lastT, carbon) === "aus_cem";
          if (wasAust && rt >= QUENCH_RATE && carbon >= 0.1 && carbon <= MAX_GAMMA_C) {
            flags.current.mart = true; setIsMart(true); setWasTempered(false); flags.current.temper = false;
          } else { flags.current.mart = false; setIsMart(false); }
        }
        // tempering: reheating existing martensite into 150–700 °C band
        if (flags.current.mart && r.to > r.from && T >= 150 && T < A1 && !flags.current.temper) {
          flags.current.temper = true; setWasTempered(true);
        }
        flags.current.lastT = T;
        if (r.elapsed >= r.dur) {
          flags.current.running = false; setRunning(false); setPaused(false);
          setStartT(r.to); // commit end state so runs chain naturally
          setSimElapsed(0); r.elapsed = 0; r.from = r.to;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [carbon]);

  const start = () => {
    runRef.current = { from: startT, to: targetT, dur: Math.max(duration, 0.5), elapsed: 0 };
    flags.current.running = true; flags.current.paused = false; flags.current.lastT = startT;
    setSimElapsed(0); setRunning(true); setPaused(false);
  };
  const togglePause = () => { flags.current.paused = !flags.current.paused; setPaused(flags.current.paused); };
  const reset = () => {
    flags.current = { running: false, paused: false, mart: false, temper: false, lastT: 25 };
    setRunning(false); setPaused(false); setSimElapsed(0); setIsMart(false); setWasTempered(false);
    setStartT(25); runRef.current = { from: 25, to: targetT, dur: duration, elapsed: 0 };
  };

  // resolve displayed phase
  let phaseKey = eqPhase(currentT, carbon);
  if (isMart && currentT < A1) {
    if (wasTempered) phaseKey = "tempered";
    else if (currentT <= Ms(carbon) || currentT < 150) phaseKey = "martensite";
    else phaseKey = "austenite"; // supercooled γ racing past the pearlite nose
  }
  const P = PHASES[phaseKey];
  const glow = glowRGB(currentT);
  const quenching = running && targetT < startT && rate >= QUENCH_RATE;

  /* ---------- styles ---------- */
  const S = {
    page: { minHeight: "100vh", background: "#0c0e11", color: "#d8dce2", fontFamily: "system-ui, -apple-system, sans-serif", padding: "16px 14px 40px" },
    wrap: { maxWidth: 1080, margin: "0 auto" },
    h1: { font: "800 clamp(20px,4.5vw,30px)/1.1 system-ui", letterSpacing: "0.02em", margin: 0, color: "#eef1f5" },
    eyebrow: { font: "700 10px ui-monospace, monospace", letterSpacing: "0.28em", color: "#c47a3a", textTransform: "uppercase", marginBottom: 6 },
    grid: { display: "grid", gap: 14, gridTemplateColumns: "1fr", marginTop: 18 },
    panel: { background: "#16191f", border: "1px solid #262c36", borderRadius: 12, padding: 14 },
    plabel: { font: "700 10px ui-monospace, monospace", letterSpacing: "0.22em", color: "#8a93a0", textTransform: "uppercase", marginBottom: 10 },
    row: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 },
    sname: { font: "600 12px ui-monospace, monospace", color: "#aab3c0" },
    sval: { font: "700 14px ui-monospace, monospace", color: "#eef1f5" },
    slider: { width: "100%", accentColor: "#ff8a3d", marginBottom: 14 },
    btn: (bg, fg = "#0c0e11") => ({ flex: 1, padding: "11px 0", borderRadius: 9, border: "none", background: bg, color: fg, font: "700 13px ui-monospace, monospace", letterSpacing: "0.08em", cursor: "pointer" }),
  };

  const fmt = (n, d = 0) => n.toFixed(d);
  const viewSize = 210;

  const renderVisual = () => {
    const r = P.render;
    if (r === "liquid") return <LiquidView T={currentT} tick={tick} size={viewSize} />;
    if (r === "slush") return (
      <div style={{ position: "relative" }}>
        <LiquidView T={currentT} tick={tick} size={viewSize} />
        <div style={{ position: "absolute", right: -6, bottom: -6, background: "#12151acc", borderRadius: 10, border: "1px solid #2a2f38" }}>
          <UnitCell type={phaseKey === "liq_cem" ? "fe3c" : "fcc"} T={currentT} tick={tick} size={92} label={phaseKey === "liq_cem" ? "Fe₃C" : "γ FCC"} />
        </div>
      </div>
    );
    if (r === "bcc") return <UnitCell type="bcc" T={currentT} tick={tick} size={viewSize} label="BCC — 9 atoms/cell view" />;
    if (r === "fcc") return <UnitCell type="fcc" T={currentT} tick={tick} size={viewSize} label="FCC — corners + face centers" />;
    if (r === "bct" || r === "bct_temp") return <UnitCell type="bct" T={currentT} tick={tick} size={viewSize} label={r === "bct" ? "BCT — carbon jammed in (red)" : "BCT relaxing → BCC + carbides"} />;
    if (r === "duo_bcc_fcc") return (
      <div style={{ display: "flex", gap: 4 }}>
        <UnitCell type="bcc" T={currentT} tick={tick} size={viewSize * 0.55} label="α BCC" />
        <UnitCell type="fcc" T={currentT} tick={tick} size={viewSize * 0.55} label="γ FCC" />
      </div>
    );
    if (r === "duo_fcc_fe3c") return (
      <div style={{ display: "flex", gap: 4 }}>
        <UnitCell type="fcc" T={currentT} tick={tick} size={viewSize * 0.55} label="γ FCC" />
        <UnitCell type="fe3c" T={currentT} tick={tick} size={viewSize * 0.55} label="Fe₃C" />
      </div>
    );
    if (r === "pearlite") return <Lamellae size={viewSize} tick={tick} />;
    if (r === "pearlite_net") return <Lamellae size={viewSize} tick={tick} network />;
    if (r === "grains") return <GrainMix size={viewSize} pearlFrac={Math.min(carbon / EUTECTOID_C, 1)} />;
    return null;
  };

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.eyebrow}>Fe–Fe₃C · interactive phase trainer</div>
        <h1 style={S.h1}>THE FURNACE</h1>
        <p style={{ color: "#8a93a0", fontSize: 13, margin: "8px 0 0", maxWidth: 640 }}>
          Pick a carbon content, set a temperature path and how long it takes, and watch the lattice
          decide what to become. Cooling from austenite at ≥ {QUENCH_RATE} °C/s counts as a quench.
        </p>

        <div style={S.grid} className="mainGrid">
          {/* ---- VIEWPORT ---- */}
          <div style={{ ...S.panel, position: "relative", overflow: "hidden", border: `1px solid ${rgb(glow, 0.7)}`, boxShadow: `0 0 ${10 + (currentT / 1600) * 60}px ${rgb(glow, 0.16 + (currentT / 1600) * 0.3)}, inset 0 0 ${(currentT / 1600) * 90}px ${rgb(glow, 0.12)}` }}>
            <div style={{ ...S.row }}>
              <div style={S.plabel}>Specimen · lattice view</div>
              {quenching && <span style={{ font: "700 10px ui-monospace, monospace", color: "#ff5d47", letterSpacing: "0.2em" }}>◉ QUENCHING</span>}
              {running && !quenching && <span style={{ font: "700 10px ui-monospace, monospace", color: "#d9a441", letterSpacing: "0.2em" }}>{paused ? "❚❚ PAUSED" : "▶ RUNNING"}</span>}
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "6px 0 2px" }}>{renderVisual()}</div>
            <div style={{ textAlign: "center", marginTop: 6 }}>
              <div style={{ font: "800 20px system-ui", color: "#eef1f5" }}>{P.name}</div>
              <div style={{ font: "600 12px ui-monospace, monospace", color: rgb(glowRGB(Math.max(currentT, 860)), 1), marginTop: 4 }}>
                {fmt(currentT)} °C · {fmt(carbon, 2)} %C
              </div>
              <div style={{ font: "500 11px ui-monospace, monospace", color: "#8a93a0", marginTop: 2 }}>{P.lattice}</div>
            </div>
          </div>

          {/* ---- CONTROLS ---- */}
          <div style={S.panel}>
            <div style={S.plabel}>Furnace controls</div>
            <div style={S.row}><span style={S.sname}>Carbon</span><span style={S.sval}>{fmt(carbon, 2)} wt%</span></div>
            <input style={S.slider} type="range" min="0" max="5" step="0.02" value={carbon} disabled={running}
              onChange={(e) => setCarbon(+e.target.value)} />
            <div style={S.row}><span style={S.sname}>Current temp</span><span style={S.sval}>{fmt(running ? currentT : startT)} °C</span></div>
            <input style={S.slider} type="range" min="25" max="1600" step="5" value={startT} disabled={running}
              onChange={(e) => setStartT(+e.target.value)} />
            <div style={S.row}><span style={S.sname}>End temp</span><span style={S.sval}>{fmt(targetT)} °C</span></div>
            <input style={S.slider} type="range" min="25" max="1600" step="5" value={targetT} disabled={running}
              onChange={(e) => setTargetT(+e.target.value)} />
            <div style={S.row}><span style={S.sname}>Time to reach</span><span style={S.sval}>{duration < 60 ? `${fmt(duration)} s` : `${fmt(duration / 60, 1)} min`}</span></div>
            <input style={S.slider} type="range" min="0" max="100" step="1" disabled={running}
              value={Math.round(Math.log(duration / 0.5) / Math.log(7200 / 0.5) * 100)}
              onChange={(e) => setDuration(+(0.5 * Math.pow(7200 / 0.5, +e.target.value / 100)).toFixed(1))} />
            <div style={{ ...S.row, marginTop: 2 }}>
              <span style={S.sname}>Rate</span>
              <span style={{ ...S.sval, color: rate >= QUENCH_RATE ? "#ff5d47" : "#7fb4d9" }}>
                {fmt(rate, rate < 10 ? 1 : 0)} °C/s {targetT < startT ? (rate >= QUENCH_RATE ? "· quench" : "· slow cool") : "· heating"}
              </span>
            </div>
            {running && (
              <div style={{ height: 6, background: "#262c36", borderRadius: 3, margin: "10px 0" }}>
                <div style={{ height: 6, width: `${(simElapsed / runRef.current.dur) * 100}%`, background: rgb(glow), borderRadius: 3, transition: "width 0.1s linear" }} />
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {!running
                ? <button style={S.btn("#ff8a3d")} onClick={start}>RUN</button>
                : <button style={S.btn(paused ? "#7fb4d9" : "#d9a441")} onClick={togglePause}>{paused ? "RESUME" : "PAUSE"}</button>}
              <button style={S.btn("#262c36", "#d8dce2")} onClick={reset}>RESET</button>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              {[["Anneal 0.4%C", () => { setCarbon(0.4); setStartT(900); setTargetT(25); setDuration(3600); }],
                ["Quench 0.8%C", () => { setCarbon(0.8); setStartT(850); setTargetT(25); setDuration(3); }],
                ["Temper it", () => { setStartT(25); setTargetT(400); setDuration(120); }],
                ["Cast iron", () => { setCarbon(3.5); setStartT(1400); setTargetT(25); setDuration(1800); }],
              ].map(([n, f]) => (
                <button key={n} disabled={running} onClick={f}
                  style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #333b47", background: "transparent", color: "#aab3c0", font: "600 11px ui-monospace, monospace", cursor: "pointer" }}>{n}</button>
              ))}
            </div>
          </div>

          {/* ---- DIAGRAM ---- */}
          <div style={S.panel}>
            <div style={S.plabel}>Fe–Fe₃C diagram · you are here</div>
            <PhaseDiagram C={carbon} T={currentT} msLine={true} />
            <div style={{ font: "500 10.5px ui-monospace, monospace", color: "#69727f", marginTop: 6 }}>
              blue = austenite boundaries (A3/Acm) · gold = 727 °C eutectoid (A1) · red dash = Ms (martensite start, quench only)
            </div>
          </div>

          {/* ---- INFO ---- */}
          <div style={S.panel}>
            <div style={S.plabel}>Phase dossier — {P.name}</div>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 12px", font: "500 12px ui-monospace, monospace", marginBottom: 10 }}>
              <span style={{ color: "#69727f" }}>lattice</span><span style={{ color: "#d8dce2" }}>{P.lattice}</span>
              <span style={{ color: "#69727f" }}>carbon</span><span style={{ color: "#d8dce2" }}>{P.solubility}</span>
              <span style={{ color: "#69727f" }}>hardness</span><span style={{ color: "#d8dce2" }}>{P.hard}</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "#c3cad4", margin: "0 0 10px" }}>{P.info}</p>
            <div style={{ borderLeft: "3px solid #ff8a3d", paddingLeft: 10 }}>
              <div style={{ font: "700 10px ui-monospace, monospace", letterSpacing: "0.2em", color: "#c47a3a", marginBottom: 3 }}>IN THE REAL WORLD</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, color: "#aab3c0", margin: 0 }}>{P.practical}</p>
            </div>
          </div>
        </div>

        <style>{`
          @media (min-width: 860px) {
            .mainGrid { grid-template-columns: 1fr 1fr !important; }
          }
          input[type=range]{ -webkit-appearance:none; appearance:none; height:4px; background:#2a2f38; border-radius:2px; outline:none; }
          input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#ff8a3d; border:2px solid #0c0e11; cursor:pointer; }
          input[type=range]:disabled::-webkit-slider-thumb{ background:#4a5262; }
          button:focus-visible{ outline:2px solid #7fb4d9; outline-offset:2px; }
          @media (prefers-reduced-motion: reduce){ * { animation:none !important; } }
        `}</style>
      </div>
    </div>
  );
}
