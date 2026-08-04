# Day 9 — Observations (2026-07-28)

Vavdi visit.

## Pressure and gas plumbing
- Analog pressure gauge is on **all** furnaces including 8; digital only on 9 and 12. All readings, analog or digital, are **relative (gauge) pressure**, not absolute — and a pure 0 vacuum is practically impossible anyway. Promoted to [[Furnace-Engineering]], Pressure measurement.
- **2 flow meters total**, one per site, each shared by that site's two big furnaces — one furnace at a time, like the shared vacuum pump. Furnace 8 takes gas straight from the bottle. Each meter meters LPG and N2 separately, then both gases **merge into one unified pipe** to the selected furnace, entering at the **bottom** through a spring check NRV. Promoted to [[Furnace-Engineering]], Gas distribution topology.
- Learned the **spring check NRV**: mechanical one-way valve, internal spring + sealing sheet on a seat, blocks reverse flow automatically the instant pressure drops. Flow meters contain them too. Promoted to [[Furnace-Engineering]].

## Furnace 9 pressure leak — solved
- Furnace 9 was losing pressure. Cause traced to the **NRV**: its internal sealing sheet was deformed and no longer seating.
- Fix: extracted the valve, established its flow direction by blowing air through it by mouth, confirmed the direction by **comparing against a known-working NRV taken from the flow meter**, flattened the deformed sheet by tapping a tester through it, refitted, and **drew a white-marker arrow** on the valve marking flow direction. Leak resolved. Logged in [[Furnace-Engineering]], Incident log.

### Two working lessons from this
1. **When you're unsure how something works and no documentation is at hand, copy from an existing working example.** Comparing the bad NRV against a proven-good one settled the direction question immediately — safest and fastest route, no theory needed.
2. **Fix so it can't recur.** The arrow on the valve means nobody has to re-derive the direction next time — same idea as labelling furnace numbers on thermocouple wires in the panel. Build a small physical system — an arrow, a label, a note — for anything that will be repeated. Don't rely on memory, least of all when the work is critical. This is the reason note-taking works at all.

## Unloading + loading, in full
- Watched the complete changeover: pre-load the next coil → open the wheels → open the main vacuum ball valve (pressure jumps -ve to 0 as air rushes in) → lift lid → lift hot coil holder out to cool → load next → **screws moderately tight, not fully**, so the rubber seal can draw in under vacuum → attach probe/solenoid wiring → vacuum pump on at 200–300°C as a **pre-bake** driving off air, impurities and coil moisture → then tighten fully → raise temperature → vacuum again at ~500°C, process starts. Promoted to [[Furnace-Engineering]], Unloading and loading.
- Next batch is started as soon as the previous finishes wherever possible, to keep the furnace's residual heat and cut electricity cost. Promoted to [[Process]], Back-to-back batching.
- **The vacuum pumps are old**: only about **-0.5 kgf/cm²** now, well down from new, through wear and tear — equally so at both sites.
- The pre-process routine is the same for essentially all coils; only the cycle that follows differs by material, and those are pre-determined for common materials. Parts and samples can differ.

## Managing workers
- Be a strict taskmaster and keep authority, but be playful about genuine human problems so a bond forms — friend and disciplinarian at once. Learn each worker's nature and communication style individually. There is no HR department; in a small factory you are Production, Quality and HR at once. Promoted to [[Workers]], Managing the workers.
