# Lab Testing & Reports

How material gets tested and how to read the lab reports that come back.

## Labs & full-panel reports
- **Rajkot Metlab** — a metallurgical testing laboratory that does the full panel of tests in one report. Many labs only do a few (some only spectral, some only structure); full-panel labs like this one do everything.
- Example of a full-panel report — Pelican EngiTech's benchmark report (see [[Business]], Customers, and [[Day7]]), all tests by this one lab:
  1. Spectral — Optical Emission Spectrometer
  2. Rockwell hardness (HRC)
  3. Tensile (with stress-strain curve)
  4. Torsional (torque applied, N·m)
  5. Microstructure examination (grains; etched with Nital)
  6. Decarb depth (microns)
  7. Coating thickness
  8. Salt spray The decarb-specific gotcha (a decarbed skin lies to a surface hardness test — grind first or test a cross-section) is in [[Metallurgy]], Decarburization.

## Sending a sample out — the actual workflow
1. Worker cuts a sample piece off a heat-treated coil.
2. The **coil number is written directly on the cut piece** — this is what ties the lab result back to a specific lot (see [[Process]], Material identification).
3. The piece is handed to a worker, who carries it to the lab.
- The structure-test lab **closes around 7 PM**, which is the real constraint on this loop: a sample cut after that waits until the next day, so a cycle finishing late in the evening can't be verified until the following day — by which time the coil may already have moved on.

## Hardness tests
- **Rockwell** — measures **indentation depth**. Scales HRA, HRB, HRC differ in indenter and load, matched to the expected hardness of the part:
  - **Hard metal ball** — used on softer materials (Rockwell B). A diamond would over-penetrate a soft material and give an unreliable reading.
  - **Diamond cone tip** — used on hard/hardened materials (Rockwell A and C; HRC is the scale bearing-steel specs are written in). A ball would deform or fail to penetrate consistently on very hard steel.
  - Why multiple scales exist at all: one indenter/load combination can't stay accurate across the full soft-to-hard range — the scale is chosen to match the part.
- **Scales actually used here**: **HRB and HRC**. **HRA is effectively useless for our work** — it's for thin material like metal sheets. Indenter and load per scale:
  - **HRC** — diamond cone tip, **150 kg** total load. The scale bearing-steel and hardened-part specs are written in.
  - **HRB** — steel ball indenter, **100 kg** total load.
  - The loose weights that make up these loads are kept at the rig itself.
- **Brinell** — measures **indentation width**. HBW uses a tungsten carbide ball (W = Wolfram); HBS uses a steel ball. The wide indentation covers a much larger area than a Rockwell point, so the reading averages out local variation — a big ball pressed across many grains reads the bulk hardness rather than whatever single spot a small tip happens to land on.
- The hardness testing rig here is kept outside the factory building.

### Reading the dials
- Three concentric circular scales on the main dial: an **outer scale in black**, a **middle scale in black**, and an **innermost scale in red** marked HB — the red one is the HRB scale. **HRC is read off the middle scale.**
- A separate **small inner dial** shows how far the minor (preload) load has been applied — it is what tells you the seating stage is complete.

### Measuring HRC — procedure
1. **Clean the surface** of the machine part or coil sample (hand-wiping is enough) so no foreign particle sits under the indenter and skews the depth reading. Fit the **diamond tip** as indenter and load the weights at the back of the machine to make **150 kg**.
2. Fit the appropriate **holder/anvil**: a **flat** one for a machine part, a **curved** one for a coil sample — the seat must match the part's geometry or the part rocks and the depth reading is meaningless.
3. Set the right-hand lever **towards you**.
4. Raise the holder by **rotating it upwards** until the part touches the indenter, then keep tightening until the main dial has swung around roughly **3 times** and the small inner dial has dropped to about **3** — this is the minor load being seated.
5. Push the right-hand lever **outwards** to apply the major load. Wait until the dial stops dropping and settles — the value it settles at doesn't matter, only that it is stable.
6. Pull the lever back **towards you**. The reading is now on the dial — **middle scale for HRC**.
- **Repeat 2–3 times on different spots** and average. Why: no surface is perfectly uniform in hardness, and there is always some measurement error — a single reading is not a result.
- Corollary seen in practice: differing readings across one part are normal, not a defect signal. Deliberately hardening only chosen regions of a part is its own thing — **spot hardening** (see [[Metallurgy]]).
- Worked example: a PreVal special-grade stainless machine component read **40 HRC before** our stress relieving and **47–48 HRC after**, which is how the process was confirmed successful (see [[Metallurgy]], and [[Day10]]).

## UTS (Ultimate Tensile Strength) test
- The ultimate breakpoint of a material bar — the stress at which the bar finally breaks, seen at the end of the material's stress-strain curve.
- Destructive by nature, so it's done on a dedicated **test bar**: a separate bar processed through the entire chain from the mill up to and including heat treatment, then pulled to destruction. The bar is sacrificed so the real material isn't.
- Why the bar must go through the whole chain: only then does its strength represent the actual delivered material — a bar skipping any step would measure a different history.
- A heat-treatment consultant advised running UTS as part of the decarb investigation (see [[Day5]]).

## Spectral test (composition)
- Finds the **material composition** — the ratios of iron, carbon, chromium, and so on. ("Spectral" = the component wavelengths the radiation is made of.)
- Formerly done with chemical processes; the modern way is **OES (Optical Emission Spectroscopy)**: a high-energy spark/arc vaporizes a tiny amount of the metal sample; the vaporized atoms emit a unique light spectrum; a spectrometer analyzes the wavelengths and intensities of that light to determine the exact chemical composition of the alloy. High precision.
- Reading gotcha: judge results against the material's **spec range**, not a round number — a reading slightly off "1%" carbon is not automatically a defect (see [[Metallurgy]], EN31).

## Structure test (microstructure)
- A different test from spectral: it shows the **grain structure** of the steel — e.g. the pearlite rings ([[Metallurgy]]).
- The sample is treated with an **etchant** (Nital — nitric acid in alcohol) to make the grain boundaries visible under the microscope; polished bare steel shows nothing.
- What a good spheroidize-annealed result looks like in the report: **white pure-Fe ferrite with black Fe3C circles** (see [[Metallurgy]], Spheroidite).
- Decarb is also directly visible in a structure report, at the top surface of the steel.
