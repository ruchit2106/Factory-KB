# Business — Leadership, Market, Ecosystem

## Leadership
| Name | Role | Notes |
|---|---|---|
| Father | Technical/Engineering | Knowledge is undocumented — lives in his head. His expertise operates as muscle memory rather than deliberate reasoning — he can look at a material and its details and dictate the furnace cycle directly, without visibly working it out. This is the tacit-knowledge extraction problem Ruchit is up against: it's not written down anywhere because it isn't consciously derived each time. Also handles all in-factory payments: worker payroll, Upaad advances, and paying the LPG vendor (see [[Workers]]). |
| Uncle | Management/commercial | GST, pricing, and client credit/outstanding via Miracle Software; handles the Master Excel Sheet. Strong customer-speaking skills — handles negotiation and collection calls (see [[Pricing]], Credit/Outstanding). |

**Accountant/auditor: Shailesh Somaiya ("Shailesh Bhai")** — not a CA himself, an auditor who works **onsite**, coming to the office roughly every **4–5 months**. He audits all bills, income statements and bank statements, income statements and everything else money-related for **GST filing**, working in **Miracle Software** — the same system uncle keeps credit/outstanding in (see [[Pricing]]). Each visit takes him **2–3 days** to complete.

Labourer/worker roster, roles, and worker-specific safety concerns are in [[Workers]].

The company's own banking, deposits and IPO applications are in [[Finance]].

The customer roster, the SuperEngiTech opportunity and the Pioneer dispute are in [[Customers]].

## Our own companies / plots
The factory operates under multiple registered company names across its two sites :
- **Vavdi**: "Alloy Heat Treatment" (active — see [[Furnace-Engineering]] for its furnaces) and "Bright Corporation" (a separate plot that was set up to manufacture Bright Bars — cold-drawn/polished steel bars, a different product line from heat treatment job-work. The product didn't sell, so that plot now sits unused; renting it out for passive income is being considered).
- **Bhaktinagar**: "Micro Heat Treaters and Engineers" and "Micro Processors."
### Ideas (not yet in practice)
- **Renting out the workers' cooking area at Bhaktinagar** — the space at the opposite end of the plot, where the disbanded/decommissioned furnace sits (see [[Furnace-Engineering]], Inventory). Under discussion between father, uncle and **Shailesh Bhai** (the auditor — see Leadership above), which is the right instinct: it's a tax and compliance question as much as a property one.
- What has to be checked before committing: **GIDC rules** on what may be sublet on an industrial plot, **property tax** implications, and everything else that lands on the cost side — the number that matters is **net** profit after all of it, not the headline rent.
- The decision is explicitly framed as **renting vs selling**, not rent-or-nothing.
- If renting: prefer a tenant that is a **registered LLC and trustworthy**, with the documentation done properly. Why it matters on an industrial plot — an informal tenant with no paperwork is the version of this that goes wrong, and getting a bad tenant out of a GIDC premises is far harder than never letting them in.
- Note the second idle asset already on record: the **Bright Corporation** plot at Vavdi, unused, with renting likewise "being considered" (above). These are the same decision twice — worth deciding together rather than separately.

The physical side of both plots — layout, offices, sheds, building upkeep, facility-wide safety — is in [[Site]].

## Acquaintances in the metal industry (no business with us)
Personal contacts of father and uncle who run metal-industry businesses. **We do no business with any of them** — they are contacts, not clients, suppliers or competitors. **Neither is in the heat treatment / metallurgy business, and neither has any view of that market or its players** — so they are not a source for competitor intelligence or market reads. They are an industry picture only.

- **Sanjay Seth** — a friend of father and uncle from when they were around 25, so a very long-standing one. Runs a factory near our **Bhaktinagar** unit, stocked mostly with **grinding machines**. Their product is **gauges** — go/no-go type checking tools sized so a correct part passes and an incorrect one doesn't. The point of them: an operator who **cannot read or write** can still do dimensional inspection, because the check is purely "does the piece go in and out," no number to read off an instrument. That's why it's a real business despite sounding trivial — it makes inspection possible at scale on a shop floor with a low-literacy workforce, which is exactly what **big mass-production industries** need. Niche, but with a genuine mass market underneath it.
- **Darshak Ghetiya** — lives in our society. Owns a **ball bearing assembling factory in Sapar**. Pure assembly: he takes in **balls, cages, inner rings and outer rings** as raw material — all bought in, none made — assembles them into finished bearings and supplies onward. Assembly only — no metallurgy, no heat treatment, and no involvement in that market.

## Competitors
- Shree Balaji Heat Treaters — a genuine outside competitor doing heat treatment in the city. Their samples are a useful benchmark when troubleshooting a quality issue (see [[Day3]]).
- **Accurate** — a competitor, and currently the most consequential one. They moved from a **gas furnace to an electric furnace**, and per Siddharth Bhai of Pioneer the market is now preferring them (see The market position has shifted below).
- **Ravi Metal Treatment** — a competitor.

## The market position has shifted
Delivered bluntly by **Siddharth Bhai** while raising his cracked-bar complaint: *"Micro is finished, everyone in the market is preferring Accurate"* and *"your golden period is over."* He was angry, and he is not technical — but stripped of the anger the underlying claim holds up.

- **Where the old advantage came from (10–15 years ago):** a genuine gap in the market, filled by **innovation, cheap rates and good quality at once**. The cost edge specifically came from the **no-pot innovation** — running without a pot where the industry standard was a two-pot/bell-pot setup, so no extra thermal mass to heat (see [[Furnace-Engineering]], bell pot, and [[Process]], the single-pot cost edge).
- **Why it eroded:** nothing was taken away — the rest of the market improved. Competitors caught up and in places passed us. **Accurate's move from gas to electric furnace** is the concrete instance: a capability upgrade on their side, not a failure on ours.
- **The strategic reading:** the original edge was a one-time innovation that was never followed by a second one. An advantage built on being first is a depreciating asset — it lasts exactly as long as it takes others to copy it. Read this alongside Decarb — business impact below: the quality problem and the lost technical lead are the same story, since the innovation that once differentiated us is now the ordinary baseline while our decarb consistency is not.


## Decarb — business impact
- Why this is the single biggest quality-trust risk in this business specifically: it's job work — a decarb defect surfaces at the customer's end, on parts the customer already paid for and is relying on, not as an internal scrap cost the factory quietly absorbs. That makes it a trust problem first and a technical problem second.
- Real evidence of the stakes: a customer has directly taunted the factory over it — "giving money to you scares me" (see [[Day3]] for the live investigation this came out of, involving Power's sample at 241 microns).
- Current response strategy: benchmarking against a competitor's samples (Shree Balaji, above) to see what's being done differently, and sourcing outside expertise (a decarb-control consultant found via Justdial — see External expertise & tools sourcing below). The underlying engineering troubleshooting (atmosphere control, instrumentation gaps) is in [[Furnace-Engineering]], Decarb — atmosphere control & troubleshooting.
- The market economics of decarb: the ~100-micron working ceiling ([[Metallurgy]]) is a set practice of this market — local customers accept it because it costs less and they don't need ultra-high precision. But 0 micron is genuinely achievable: Pelican EngiTech's benchmark report (see [[Customers]]) showed 0-micron decarb from their other heat treaters. Whether a job needs near-zero decarb is the customer's choice, driven by their precision requirement and spending limit — so the commercial variables to know are each customer's work, cost tolerance, and precision needs, weighed against competitors' pricing-vs-decarb offering.

Pricing strategy, cost structure, and per-kg rates are in [[Pricing]].

## External expertise & tools sourcing
- New tools or furnace improvements get sourced via two channels: physical industrial visits to other cities (father and uncle have been to Chennai, Vadodara, and Bangalore for this), and the internet — finding a company/expert's contact via sites like **Justdial** or the B2B site **IndiaMart**, then calling them directly.
- If a useful contact turns out to be based in Rajkot itself, the factory just visits them in person instead.
- Example: a decarb-control consultant was found this way (via Justdial) and called for advice — see [[Day3]].

## Scrap dealers ("Bhangaar" vale)
- Scrap dealers — called **"Bhangaar" vale** — come to collect the scrap the factory generates. They share their numbers, but the factory rarely contacts them: scrap isn't disposed of regularly, and the dealers come around on their own.
- The factory generates mostly metal scrap, so iron-scrap dealers come often; electric scrap is also collected (a dealer came for it specifically).

## Gas suppliers
- LPG dealer: workers also draw on the same common LPG supply for their own personal cooking, which is a factor in negotiation. Usage is tracked via the pressure-injection measurement described in [[Furnace-Engineering]], giving a factory-wide LPG ingestion rate to negotiate against.
- LPG bottles come in two types: Commercial/Industrial and Residential. Commercial bottles are blue with red strip ; residential bottles are complete red. The gas itself is identical — the price differs because the government subsidizes residential rates for households, so the factory's commercial bottles cost more even though workers can (and do) use the same bottles to cook. Bottles are ordered by referencing the factory's account number with the supplier (15012).
- Nitrogen supplier: usage tracked the same way (pressure injection). Heat treatment's nature means the factory consumes more nitrogen than a typical shop, which also factors into negotiation.

