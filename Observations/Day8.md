# Day 8 — Observations (2026-07-25)

## SuperEngiTech visit — Unit 1 (corporate)
- Went via Kothariya Road (bad, village road), returned via Gondal Road (maintained highway — the one to use). Route and company profile promoted to [[Business]], Customers + The SuperEngiTech opportunity.
- Met the head of their Development Department, our existing heat-treatment contact — through him met one of the main directors.
- The director showed the final part's internal detail and said he wants to give us all of their heat treatment; a new unit near Padavla was discussed to serve it. **Not final** — our treated sample has gone to Germany first, and their response decides.
- They are a giant by our standards and considerable at Rajkot level, and they export. Why the German principal doesn't manufacture in-house — cheap Indian labour plus Europe's costly mandatory safety protocols — promoted to [[Business]], The SuperEngiTech opportunity.
- Key commercial finding: our decarb doesn't disqualify us on this part — it needs precision, not high strength or stress resistance.

## SuperEngiTech visit — Unit 2 (workshop)
- Full tour of the sand casting line: pattern → sand mould (soft and hard) → melt of pig iron + own scrap + added elements at ~1200°C → pour → shakeout, sand reused. Layout: mould making at the far end, pouring at the front near QA. Promoted to [[Manufacturing-Processes]].
- Melting theory: carbon lowers iron's melting point (1538°C pure → ~1200°C cast iron, eutectic 1147°C at ~4.3% C); pig iron comes from blast furnaces (JSW etc.) already carbon-saturated. Promoted to [[Metallurgy]], Pig iron.
- Machining hall: VMC, CNC (from **Jyoti**), turning, plus a 3D scanning camera for digital part inspection. Learned turning vs milling vs drilling vs boring. Promoted to [[Manufacturing-Processes]], Machining.
- Some internal veins are **500 microns** — no tool reaches them. Cleared by water jet spray only; they rely on casting accuracy for those features.
- Forging vs casting session: grain flow, strength, waste, shape freedom, and when to choose which. Promoted to [[Manufacturing-Processes]].

## Back at Vavdi
- **Furnace 9 has the oxygen probe** — so probes now sit on furnace 9 (Vavdi) and 12 (Bhaktinagar), not 12 alone. Same two furnaces carry the digital solenoid on the LPG relief system; furnaces 10 and 11 have neither. Promoted to [[Furnace-Engineering]].
- **Observation on furnace 9**: at cycle start the oxygen meter mV reading counts down 11, 10, 9, 8, 7 … to 0mV, then jumps straight to ~1100mV with nothing in between. Logged under [[Furnace-Engineering]], Oxygen probe / CP control.
- **N2 and LPG flow meters now installed at both factories**, connected to the bottles, reading litres per minute — the planned replacement for pressure-as-proxy-for-flow is now live. Promoted to [[Furnace-Engineering]], Gas consumption measurement.
- Data path to ESCAN: digital display → CPU over **RS232/RS485**, and it's **simplex** (thermocouple is a pure emitter, CPU never talks back). Simplex/half-duplex/full-duplex definitions promoted to [[Furnace-Engineering]], Data link.

## Lab sample handling
- Saw Sandeep cut a sample off a heat-treated coil, write the coil number on the piece, and hand it to a worker to take to the lab. The structure lab closes ~7 PM. Promoted to [[Lab-Testing]], Sending a sample out.
