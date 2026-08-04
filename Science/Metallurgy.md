# Metallurgy

Core mechanism: steel is iron + carbon. Past ~727°C the crystal structure becomes **austenite**, which dissolves carbon. Cooling speed decides the result: slow cooling → carbon migrates out → soft **pearlite**; fast cooling (oil quench) → carbon trapped in a distorted, stressed crystal → **martensite**, extremely hard but brittle. **Tempering** (reheat 150–250°C) trades a little hardness for toughness. Heat treatment = controlling how fast atoms are allowed to rearrange.

## EN31 / 52100 — main material (job: "alloy heat treatment")
- EN31 (British standard) and AISI 52100 (US standard) are the same steel — HS bearing steel, ~1.0% carbon, ~1.4% chromium. Used in automobile parts and fasteners.
- Composition is specified as a **range, not an exact percentage** (e.g. carbon ~0.95–1.10%, not exactly 1.00%). Why: no melt/cast process hits an exact number — a certified range is what a mill can reliably guarantee, and small variation within range doesn't meaningfully change performance. This matters for spectral testing: a reading slightly off "1%" is not automatically a defect — it must be checked against the actual spec range, not a round number.
- Why chosen for bearings: high carbon → 60+ HRC achievable after quench → resists wear and rolling fatigue. Chromium → deeper hardenability, so oil quench suffices — water would cool so fast that high-carbon parts crack.
- Typical full hardening treatment (book values, general knowledge — **not our process**): austenitize ~840–860°C, soak, oil quench; temper ~150–250°C; target ~58–63 HRC for bearings.
- **This factory does not quench** (it did quenching earlier, and has since stopped). 60+ HRC hardening physically requires a quench, so our actual EN31 process is something else — annealing/spheroidizing for machinability, tempering/stress relief, or a pre-treatment before another shop hardens. (Quench media and their trade-offs: see Quenching below.)

## Mild steel
- Everything else the factory processes that isn't EN31.

## Cast iron — the 2% line is only partially true
(Where cast iron comes from and why it melts low: see Pig iron below, and [[Manufacturing-Processes]].)
- Theory draws the steel/cast-iron boundary at ~2% carbon, but graded cast irons can sit below it. Why: the 2.1% figure comes from the pure iron–carbon diagram, and real cast irons are not pure Fe–C — they carry significant silicon, which shifts the eutectic. What actually governs classification is the **carbon equivalent** (roughly %C + (%Si + %P)/3), so an iron with less carbon but enough silicon still solidifies and behaves as cast iron. Higher-strength grey iron grades are also deliberately made with lower carbon, which is exactly where "graded" cast iron dips under the textbook line.

## Pig iron — the starting material of everything
- **Pig iron** is the direct output of a blast furnace: iron ore reduced with **coke** (carbon), which is why it comes out saturated with carbon at roughly **3.5–4.5%**. Made by large integrated mills (JSW and similar) who work from ore; foundries and steel mills buy it as a charge material rather than reducing ore themselves.
- Everything downstream is defined by what happens to that carbon: **steelmaking is the act of removing carbon** from pig iron down below ~2%, while **iron founding simply keeps it** — which is why cast iron is the cheaper route (it skips the refining step entirely).
- Why it melts so much lower than pure iron: pure iron melts at **1538°C**, cast iron at roughly **1150–1200°C**. Carbon dissolved in iron disrupts the single clean crystal lattice, so the mixture no longer has one preferred solid arrangement and begins melting lower. The minimum is the **eutectic at ~4.3% C, 1147°C** — the lowest-melting composition in the whole Fe–C system, and pig iron sits close to it by accident of how it's made. Practical upshot: cast iron is castable with ordinary foundry equipment and stays fluid enough to fill thin sections, while low-carbon steel needs ~1500°C and pours sluggishly. (Seen in practice at SuperEngiTech, melting ~1200°C — see [[Manufacturing-Processes]].)
- Melting is not composition-neutral: carbon and silicon oxidize and **burn off** during the melt, so a foundry recharging its own scrap must add alloying elements back on top to bring the melt to spec before pouring.

## Decarburization (decarb) — the science
- Above ~700°C, oxygen in air strips carbon from the steel surface. The skin (0.1–0.5 mm) becomes low-carbon and stays soft after any hardening.
- Why it causes field failure: a bearing's whole job happens at its surface. A soft decarbed skin on an otherwise-hard part fails in rolling fatigue in the field — and passes a lazy hardness test if the skin isn't ground off before testing. (For what this means for customer trust and the business, see [[Business]], Decarb — business impact. For how the furnace atmosphere is controlled to prevent it, see [[Furnace-Engineering]], Decarb — atmosphere control & troubleshooting.)
- Testing consequence: grind the surface before hardness testing, or test a cross-section. Surface readings on possibly-decarbed parts lie. (Test mechanics and scales: see [[Lab-Testing]].)
- This factory's actual working tolerance: up to ~100 microns is acceptable (the factory doesn't need ultra-precision here), with readings around ~41 microns considered comfortably fine. Above ~100 microns is treated as too much. Readings are inconsistent cycle to cycle for reasons not yet understood — sometimes ~0%, sometimes as high as 241 microns on nominally the same kind of job (see the Power-client sample investigation in [[Day3]], well above the 100-micron working ceiling).
- General industry context: demanding bearing-steel specs often call for tolerances in the tens-of-microns range, sometimes tighter than this factory's own ~100-micron working ceiling — worth knowing as an external reference point, though the number that actually governs day-to-day decisions here is the ~100-micron ceiling above.

## Carbon Potential (CP), surface carbon deposition, and Carburizing
- **Carbon Potential (CP)** is a way of describing how much carbon a furnace atmosphere will push into (or pull out of) a steel surface at a given temperature — essentially, whether the atmosphere is carbon-hungry (strips carbon = decarb) or carbon-rich (deposits surplus carbon) relative to the steel.
- A high positive CP **deposits surplus carbon onto the steel surface** — at this factory it's literally visible as black carbon sitting on top of the coil, enough to wipe off on a finger. Deposition alone does not push carbon into the steel: the carbon sits on the surface, it does not fuse inward.
- **Carburizing** is the distinct process where surplus carbon actually fuses into the steel's interior — and it needs a higher temperature than this factory's cycles ever reach. Why temperature is the gate: carbon only enters solid steel by diffusion, and diffusion mobility climbs steeply with temperature — below the carburizing range, carbon atoms can't migrate inward, so surplus carbon just piles up on the surface. So high-CP episodes here blacken the surface but cannot carburize the part. (Deliberate carburizing at ~900°C is how case-hardening shops make hard-skin gears — see the iron-carbon diagram notes, case hardening.)
- Decarb and carbon deposition are two sides of the same coin: the furnace atmosphere sits somewhere on a spectrum from carbon-stripping to carbon-depositing, and CP is the number that says exactly where. Controlling CP precisely is therefore the real target — not decarb prevention in isolation — since overcorrecting against decarb pushes the atmosphere far enough the other way to start depositing surplus carbon instead.
- See [[Furnace-Engineering]], Oxygen probe / Carbon Potential control, for how CP is actually measured and controlled here (an oxygen probe reading, translated to CP via chemical equilibrium).

## Quenching — media, ranked by severity
The factory used to do quenching; it no longer does (see EN31 above). The media, fastest to slowest:
1. **Brine quench** (water + NaCl): the fastest, most aggressive quench. Why faster than plain water: dissolved salt disrupts the **Leidenfrost effect** — the trapped vapor blanket that forms around hot steel in plain water and insulates it — so the liquid keeps direct contact with the steel. Maximum achievable hardness, but the most internal stress and cracking; used with low-carbon steel, which needs the severe quench and tolerates it.
2. **Water quench**: second fastest. Slower than brine because the Leidenfrost vapor layer limits steel–water contact. High hardness, still real internal-stress and cracking risk.
3. **Oil quench**: slowest. Oil's higher boiling point means less violent vapor formation and less thermal shock — lower hardness than water, but far less internal stress and cracking. (This is why EN31 shops oil-quench — see EN31 above.)

Why water extracts heat faster than oil at all: water has both a higher **specific heat capacity** (energy absorbed per degree of temperature rise) and a higher **thermal conductivity** (how fast it carries that heat away).

## Pearlite
- Slow-cooled structure: alternating microscopic layers of soft ferrite and hard cementite (mother-of-pearl look under a microscope, hence the name). Soft-ish, tough, machinable.
- Why it matters: it's what annealed incoming EN31 is — why a customer can machine it before sending it for treatment. (General shop knowledge: in quenching shops, pearlite instead of martensite = parts cooled too slowly. Not our process — we don't quench.)

## Spheroidite
- The spheroidize-annealed structure: the same cementite as pearlite, but balled up into rounded Fe3C particles sitting in a ferrite matrix. In a structure-test report it reads as **white pure-Fe ferrite with black Fe3C circles** — that is what a good annealing result looks like on paper (see [[Lab-Testing]], structure test).
- Why spheres mean soft and machinable: with the hard cementite gathered into rounded particles instead of continuous plates, a cutting tool mostly passes through soft ferrite. This is the target structure for the annealing/spheroidizing work this factory actually does on EN31 (see EN31 above; the how of spheroidizing is in the iron-carbon diagram notes).

Hardness testing mechanics (Rockwell/Brinell scales, indenters, the test rig) are in [[Lab-Testing]].

## Stress relieving on special-grade stainless — hardness goes UP
- Job seen: a **PreVal machine component in a special-grade stainless steel**. PreVal had already **solution treated** it (~1000°C); our job was the **stress relieving**.
- **Solution treatment** = heat high enough to dissolve alloying elements back into a single uniform solid solution, then cool fast to hold them there. It leaves the steel in a soft, supersaturated, unstable state.
- For this grade, the subsequent lower-temperature hold **raises hardness** rather than lowering it: the held-in-solution elements come back out as fine precipitates, which obstruct dislocation movement and strengthen the metal. Measured on the shop floor: **40 HRC before → 47–48 HRC after** ([[Lab-Testing]], [[Day10]]).
- Why this is worth flagging: it runs opposite to the usual heat-treatment intuition, where a post-treatment reheat (tempering) *softens*. Which direction hardness moves depends on the alloy and its prior state, not on the reheat alone.

## Spot hardening
- Deliberately hardening only **specific regions** of a part rather than the whole of it — the regions that actually see wear or contact stress — leaving the rest at its original hardness for toughness and machinability.
- Practical consequence when testing: hardness genuinely varies across a part's surface, so a hardness figure is only meaningful with the measured location stated (see [[Lab-Testing]], Measuring HRC).

## Heat number
- Industry term: a "heat" = one specific melt/cast batch from the steelmaker, with its own certified composition. The **heat number** is the traceability ID tied to that parent melt — conceptually like a batch/lot number, but assigned by the mill, not by us.
- Why it matters: if a spectral test shows an out-of-spec reading, the heat number is what lets you trace the anomaly back to a specific melt at the customer's mill rather than guessing it's a factory process error. (See the low-carbon spectral finding in [[Day2]] — this is exactly the kind of dispute a heat number should be able to settle.)

## Vocabulary
| Term | Meaning | Why it matters |
|---|---|---|
| Austenite | High-temp structure that dissolves carbon | Starting point of every hardening cycle |
| Martensite | Trapped-carbon hard brittle structure from fast quench | The product of full hardening (not made here) |
| Pearlite | Layered soft structure from slow cooling | Incoming material state; also the classic "soft parts" failure mode elsewhere |
| Hardenability | How deep a steel hardens (not how hard) | Why EN31 oil-quenches in shops that harden it; why section size matters |
| Soak time | Time held at temperature | Too short = core never fully transforms = inconsistent result |
| Tempering | Controlled reheat after hardening; trades hardness away for toughness | Untreated hardened steel is dangerously brittle |
| Solution treatment | High-temp hold (~1000°C) dissolving alloying elements into one uniform solution, then fast cool | Leaves stainless soft and supersaturated — the setup for the hardness *rise* on stress relieving above |
| Stress relieving | Lower-temperature hold to remove internal residual stress | On special-grade SS it raises hardness (see section above) |
| Spot hardening | Hardening only chosen regions of a part | Why hardness legitimately varies across one component |
| HRC / HRB | Rockwell C / Rockwell B hardness scales | The numbers customers accept/reject parts on |
| Heat number | Mill-assigned melt/batch ID | Traceability back to raw material source |
| TTT/CCT diagram | Maps of cooling speed vs resulting structure | The physics behind every hardening recipe |
| Pig iron | Blast-furnace output, ~3.5–4.5% C | Raw charge for both steelmaking and iron founding |
| Eutectic | Lowest-melting composition of an alloy system (Fe–C: ~4.3% C, 1147°C) | Why cast iron is castable and pure iron isn't practically |
| Grain flow | Grain orientation following a forged part's contour | Why forged parts out-fatigue cast ones ([[Manufacturing-Processes]]) |

## References
- Practical Heat Treating — Boyer / ASM International. Standard shop-floor-level text for exactly this kind of work.
