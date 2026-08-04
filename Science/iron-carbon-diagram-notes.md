# Steel Metallurgy: The Iron–Carbon Diagram
### From zero to dangerous — built on class-12 physics intuition

Hold this mental model the whole time: **the Fe–Fe₃C diagram is a map of which atomic arrangement is stable at every combination of temperature and carbon content.** The transitions between arrangements need atoms to physically move (diffusion), and diffusion takes time. So — and this is the key insight — **if you change temperature faster than the atoms can rearrange, you can freeze the material into states the diagram doesn't even show.** That trick is the entire steel industry.

---

## PART 1 — THE PRIMITIVES

### 1.1 What a phase actually is

A phase is a region of material with one uniform crystal structure (a repeating 3D arrangement of atoms, the lattice) and uniform composition. Same atoms, different arrangement → wildly different properties. You know this from chemistry: carbon arranged in flat sheets is graphite (soft, writes on paper); the same carbon in a tetrahedral network is diamond (hardest natural material). The arrangement, not the element, decides the behaviour.

Iron does this trick too — and it switches arrangement *as a function of temperature*. That's rare among metals, and it is the single fact that makes steel possible.

### 1.2 The three lattices you must know

**BCC — Body-Centred Cubic (α-ferrite, "ferrite")**
A cube with an atom at each corner and one at the centre. Packing fraction 68%. It sounds roomy, but the *gaps between* atoms (interstitial sites, where a small carbon atom would have to sit) are small and awkwardly shaped — a carbon atom simply doesn't fit without straining the surrounding iron atoms badly. Result: **BCC iron dissolves almost no carbon — max 0.022% at 727 °C, ~0.006% at room temperature.** Ferrite is soft, ductile and magnetic. This is iron's stable form at room temperature.

**FCC — Face-Centred Cubic (γ-austenite)**
Atoms at the corners plus the centre of each face. Packing 74% — denser overall, yet its interstitial holes (octahedral sites) are larger and more rounded, so a carbon atom fits with much less strain. Result: **FCC iron dissolves up to 2.11% carbon at 1147 °C — about 100× more than BCC.** Austenite exists only above 727 °C in plain steel. It is non-magnetic and very formable — that is why blacksmiths forge red-hot metal: they are shaping austenite.

This is the counterintuitive part worth pausing on: the *denser* structure holds *more* carbon. Total packing fraction doesn't matter; the size and shape of the individual gaps does.

**BCT — Body-Centred Tetragonal (martensite)** — not on the equilibrium diagram at all; it's a trapped, non-equilibrium state. Part 4.

### 1.3 The compound: cementite (Fe₃C)

When carbon can't stay dissolved, it doesn't just leave — it reacts with iron to form **cementite, Fe₃C**, an iron carbide with a complex orthorhombic lattice, 6.67% carbon by weight. It's extremely hard and brittle, ceramic-like. On its own it's useless; distributed as fine particles or plates inside soft ferrite, it acts as reinforcement — hard particles in a tough matrix, the same logic as steel bars inside concrete, just at the micrometre scale.

That's why the diagram is called **Fe–Fe₃C**: its right edge sits at 6.67% C, where the material is pure cementite. (Strictly, the truly stable form of that carbon is graphite, but in steel-making timescales Fe₃C is what forms and it stays put — metastable, but practically permanent.)

---

## PART 2 — READING THE DIAGRAM

Axes: x = carbon wt% (0 → 6.67), y = temperature (room temp → ~1600 °C). Every point (C, T) tells you which phase(s) exist *at equilibrium* — i.e., if you change temperature slowly enough for diffusion to keep up.

### 2.1 The critical lines (learn these cold)

| Line | What it is | Numbers |
|---|---|---|
| **A1** | Eutectoid line. Below it, austenite cannot exist. | **727 °C**, horizontal |
| **A3** | Upper boundary of the ferrite+austenite region (low-C side) | 912 °C at 0%C, sloping down to 727 °C at 0.76%C |
| **Acm** | Upper boundary of the austenite+cementite region (high-C side) | 727 °C at 0.76%C rising to 1147 °C at 2.11%C |
| **Eutectic line** | Liquid → austenite + cementite | **1147 °C**, at 4.3%C |
| **Liquidus** | Above this, fully liquid | 1538 °C (pure Fe) sloping down to 1147 °C at 4.3%C |

Notice carbon *lowers the melting point* — the liquidus slopes downward. Same physics as salt lowering the freezing point of water: a dissolved second species destabilises the ordered solid relative to the liquid.

### 2.2 The three magic compositions

- **0.76% C — the eutectoid.** Austenite of exactly this composition, cooled through 727 °C, transforms *all at once* into **pearlite**.
- **2.11% C — the steel/cast-iron border.** Below: steel (can be made fully austenite and forged). Above: cast iron (solidification involves the eutectic; you cast it, you don't forge it).
- **4.3% C — the eutectic.** The lowest melting point in the whole system (1147 °C). This is *why cast iron is cast* — it melts ~400 °C lower than steel, flows well into moulds, and is cheap to produce.

### 2.3 The eutectoid reaction — the most important reaction in metallurgy

At 727 °C, cooling slowly:

**γ (0.76% C, FCC) → α (0.022% C, BCC) + Fe₃C (6.67% C)**

Think through the physics: the FCC structure holding 0.76% carbon must become BCC, which can hold essentially nothing. The carbon must go *somewhere*, and the only transport mechanism is diffusion — atoms hopping site to site, slow and distance-limited. Nature's solution: the material splits itself into alternating thin plates — carbon-poor ferrite and carbon-rich cementite — because side-by-side lamellae minimise the distance each carbon atom must travel. The result is **pearlite**: a layered two-phase structure (under a microscope it shimmers like mother-of-pearl, hence the name). Pearlite is not a phase; it's a *microstructure* — two phases interleaved.

### 2.4 Hypo- and hyper-eutectoid steels

**Hypoeutectoid (< 0.76% C)** — e.g., structural steel (~0.2%). Cooling from austenite: between A3 and A1, ferrite forms first at the austenite grain boundaries ("proeutectoid ferrite"). Since ferrite rejects carbon, the remaining austenite gets progressively richer, reaching exactly 0.76% just as the temperature hits 727 °C — where it converts to pearlite. Final structure: **soft ferrite + islands of pearlite.** More carbon → more pearlite → stronger, less ductile.

Lever rule (just linear interpolation, same as mixture problems in class-11 chemistry): fraction of pearlite ≈ C / 0.76 for a slowly cooled hypoeutectoid steel. A 0.38% steel is ~50% pearlite.

**Hypereutectoid (0.76–2.11% C)** — e.g., file steel, some tool steels. Between Acm and A1, *cementite* forms first at grain boundaries, then the rest becomes pearlite. Final: **pearlite + a cementite network.** Hard and wear-resistant but brittle — a continuous brittle film along grain boundaries gives a crack a ready-made path through the whole part. That's why hypereutectoid steels are handled carefully (spheroidised first, or hardened from between A1 and Acm rather than from above Acm).

### 2.5 Cast irons (> 2.11% C)

At 4.3%, liquid freezes directly into **ledeburite** (a fine eutectic mixture of austenite + cementite). In real foundry practice, added silicon pushes the carbon to come out as graphite instead: flakes (grey iron — superb vibration damping and machinability: engine blocks, brake discs) or spheres (ductile iron — crankshafts, water pipes). White iron (all carbide, no graphite) is brutally hard — crusher jaws, mill liners.

---

## PART 3 — CARBON % IN THE REAL WORLD

| %C | Class | Typical uses | Why |
|---|---|---|---|
| 0.05–0.15 | Low carbon / mild | Car body panels, wire, nails | Nearly all ferrite: soft, formable, weldable, cheap |
| 0.2–0.3 | Structural | I-beams, rebar, bolts | Enough pearlite for strength, still weldable |
| 0.4–0.5 | Medium carbon | Axles, gears, crankshafts, rails | Balanced strength/toughness; responds well to quench + temper |
| 0.6–0.8 | High carbon | Springs, rope wire, hammers | Mostly/all pearlite; strong and springy |
| 0.8–1.2 | Tool | Knives, files, drills, razors | Quench to martensite → extreme hardness |
| 1.2–2.1 | Rare | Some cold-work dies | Brittleness dominates |
| 2.5–4 | Cast iron | Engine blocks, cookware, machine bases | Castability, damping, cheap |

Rule of thumb: **carbon buys hardness and strength, and the price is ductility, toughness and weldability.** Every 0.1% C is one turn of the dial from "bends" toward "snaps."

---

## PART 4 — THE ADVANCED PART: CHEATING THE DIAGRAM

The equilibrium diagram assumes diffusion completes. **Diffusion takes time** — it's a thermally activated, atom-by-atom random walk, and its rate collapses exponentially as temperature falls. Control the cooling rate and you control which structure actually forms. This is where a phase diagram stops being chemistry and becomes engineering.

### 4.1 Martensite — trapping the carbon

Heat steel into the austenite region (FCC, carbon fully dissolved). Now cool it *fast* — water or oil quench, hundreds of °C per second. The FCC→BCC change itself cannot be prevented — it happens by a near-instantaneous coordinated *shear* of whole planes of atoms, no diffusion needed. But the carbon *escape* is diffusional, and at quench speeds it gets no time at all. The lattice snaps toward BCC with carbon atoms still stuck inside gaps that are far too small for them.

The result: **BCT — a BCC cell stretched into a tetragon by the trapped carbon.** This is **martensite.** Why is it so hard? Metals deform when line defects called dislocations glide through the lattice (this is what "plastic deformation" is at the atomic scale). The severe strain fields around every trapped carbon atom pin these dislocations in place — nothing can glide — so martensite is the hardest thing you can make from plain steel. As-quenched, it is also glass-brittle and full of locked-in internal stress.

Key facts:
- Martensite starts forming below the **Ms temperature**, which *drops* as carbon rises (Ms ≈ 539 − 423×%C, in °C). High-carbon steels can even keep some untransformed austenite at room temperature ("retained austenite").
- Hardness rises with %C up to ~0.6%, then plateaus.
- Below ~0.3% C, quenching barely hardens anything — too little carbon to strain the lattice. This is why mild steel welds casually but welding a 0.5% C axle is risky: the small molten zone loses heat rapidly into the large cold part around it — it *quenches itself* — and forms brittle martensite in the heat-affected zone (HAZ). **Weldability is largely a carbon budget** (welding codes formalise it as the "carbon equivalent").

### 4.2 Tempering — trading hardness back for toughness

As-quenched martensite is too brittle to use. **Temper** it: reheat to 150–650 °C (below A1 — never re-enter austenite!) and hold. At these temperatures carbon gets just enough diffusional mobility to precipitate out as very fine carbide particles, relieving the lattice strain step by step. Hardness drops, toughness climbs — a smooth, controllable trade:

- 150–200 °C: stress relief, keeps most hardness → razor blades, files
- 300–450 °C: springs
- 500–650 °C: "quenched and tempered" structural parts — axles, grade 8.8/10.9 bolts, crankshafts

Almost nothing is used as-quenched. **Quench + temper is the canonical two-step of steel strengthening.**

### 4.3 The cooling-rate spectrum

Same steel, same heating, different cooling rate — four different materials:

| Cooling | Microstructure | Character |
|---|---|---|
| Furnace-slow (annealing) | Coarse pearlite + ferrite | Softest, easiest to machine |
| Air (normalising) | Fine pearlite | Stronger, uniform, refined grains |
| Oil quench | Bainite / martensite mix | Hard, less distortion |
| Water/brine quench | Martensite | Maximum hardness, maximum stress, crack risk |

**Bainite** (formed at intermediate rates, or by holding at ~250–450 °C — "austempering") is extremely fine ferrite + carbide needles — a good strength/toughness compromise without the drama of a full quench.

The industrial charts for all this are **TTT** (time–temperature–transformation) and **CCT** (continuous cooling) diagrams — the phase diagram's time-domain companions. The phase diagram tells you what is stable; TTT/CCT tell you how fast you must cool to avoid — or to hit — each structure. The "nose" of the pearlite curve (around 550 °C, sometimes under 1 second for plain steel) is the deadline: cool past the nose before pearlite starts, and you get martensite.

### 4.4 Hardenability vs hardness (people confuse these)

- **Hardness** = resistance to indentation (in martensite, set mostly by %C).
- **Hardenability** = how *deep* into a part martensite forms. The surface of a quenched bar cools fast; the core cools slowly (heat must conduct out through the surrounding metal). Alloying elements (Cr, Mo, Mn, Ni, B) slow the pearlite reaction, so even the slowly-cooling core misses pearlite and becomes martensite. That's what an alloy steel like 4140 buys over plain 1040: the same surface hardness, but hardened all the way through a 50 mm bar with only a gentle oil quench — less distortion, less cracking.

### 4.5 Heat treatments — cheat sheet

- **Full anneal:** austenitise, cool in the furnace. Softest state; the reset button.
- **Normalise:** austenitise, cool in air. Refines grain, evens out structure after forging.
- **Spheroidise:** hold just below A1 for hours; cementite plates ball up into rounded particles. Makes high-carbon steel machinable before final hardening.
- **Quench + temper:** the strength pipeline (4.1–4.2).
- **Austemper / martemper:** interrupted quenches for tougher or lower-distortion parts.
- **Case hardening (carburising):** hold a low-carbon steel gear at ~900 °C in a carbon-rich atmosphere; carbon diffuses about a millimetre into the surface. Quench: the high-carbon skin becomes hard martensite (wear surface) while the low-carbon core stays soft and tough (absorbs shock). Hard case, tough core — every gear in a car's gearbox.
- **Stress relieve:** hold at ~550–650 °C after welding or heavy machining; no phase change, just lets residual stresses relax.

### 4.6 Odds and ends that matter in practice

- **A2 (768 °C, Curie point):** iron loses its magnetism — not a phase change, but blacksmiths use "the magnet stops sticking" as a free thermometer for judging near-hardening heat.
- **Grain size:** finer austenite grains → stronger *and* tougher final steel (grain boundaries obstruct both dislocations and cracks — the Hall–Petch effect). Overheating coarsens grains; only re-normalising fixes it.
- **Retained austenite:** in quenched steel above ~0.8% C, some FCC survives (Ms dropped too low). It can transform slowly in service, changing dimensions — a problem for precision gauges and fine knife edges. Cryogenic treatment or higher tempering deals with it.
- **Alloying beyond hardenability:** Cr (corrosion resistance + carbides), Ni (toughness), Mo (resists softening during tempering), V (fine carbides that pin grain boundaries), Mn (deoxidiser + hardenability), Si (springs). Stainless steel (≥ ~11% Cr) has its own diagrams — your Fe–Fe₃C intuition transfers partially.

---

## PART 5 — SELF-TEST (do these against the simulator)

1. Set 0.4% C, cool slowly from 900 °C to room temperature. Before running it, predict the sequence of regions you'll cross and the final microstructure.
2. Set 0.8% C, quench 850 → 25 °C in 2 seconds. What forms, and why is Ms lower here than for 0.2% C?
3. Set 3.5% C. Why does the liquid region end so much lower in temperature than for 0.2% C, and what does that mean economically?
4. Why does heating any steel to only 700 °C never let you harden it by quenching?
5. What happens to a 0.2% C steel quenched from 900 °C — and why do welders care about the answer?

(All answers are derivable from Parts 2–4. If #4 doesn't click: no austenite → no dissolved carbon → nothing to trap.)

---

## The one-paragraph compression

Steel is iron exploiting a temperature-triggered lattice switch (BCC ↔ FCC) to move carbon around. FCC austenite dissolves carbon because its interstitial gaps are big enough; BCC ferrite rejects it because they aren't. Cool slowly and diffusion keeps up: you get soft ferrite plus layered pearlite, in proportions set by %C. Cool fast and diffusion loses the race: carbon is trapped in a strained BCT lattice — martensite — the hardest state, which you then temper back to something usable. Every heat treatment ever devised is just choosing a point on the diagram, and choosing how fast to leave it.
