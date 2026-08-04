# Process — Job Work Flow

## Business model: job work
- Core work of the factory. Customers send their own semi-finished parts or Coil; the factory heat-treats and returns them. The material is never owned — the product sold is process + trust.
- Consequences: (1) a lost/damaged lot is the customer's material — trust damage exceeds the money; (2) revenue is per-kg processing charges, so furnace utilization is the profit lever; (3) under GST, job-work goods move on delivery challans, not invoices.
- **Why this factory is viable against big players:** heat treatment is expensive for large operators to run economically at small/mid volumes. This factory's core edge is doing it with a single pot/tank setup instead of the conventional two-pot arrangement, at low cost — that cost structure is the reason the business is profitable.

## What actually comes in
- **Steel coils are the standard intake** — the routine, high-volume material the plant is built around (the big furnaces are sized for 10–25 mm wire at 2.5 ton/lot, see [[Furnace-Engineering]]).
- **Direct machine parts and ready-made finished parts come in sparsely** by comparison — a real but minor stream.
- **Which furnace absorbs a job is decided by quantity and weight, not by part type.** A small quantity/low weight of parts goes into furnace 8 (the small single-zone furnace); a large one goes into a big furnace. So "machine parts" and "furnace 8" correlate only because those jobs usually arrive small — a large enough consignment of machine parts is run on a big furnace like any other lot.
- Upstream, that means most incoming material arrives via rolling and drawing, not casting or forging — see [[Manufacturing-Processes]].

## Tempering on sample parts
- Besides the main coil work, **tempering** is also run here on sample parts — the controlled reheat after hardening (see [[Metallurgy]], Vocabulary). Furnace 8 is the unit sized for this kind of small-quantity sample and machined-part work (see [[Furnace-Engineering]], Inventory).

## Material flow
```
Customer part arrives → inward entry (challan ref, weight/qty, LOT assigned)
→ waits → loaded into furnace charge → heat treatment cycle
→ hardness test → outward entry → challan + e-way bill (Rasik) → dispatch
```

## Back-to-back batching
- Where possible the next batch is started **as soon as the previous one finishes**, so the furnace is still hot and less energy is needed to bring it back up to temperature — a direct saving on the electricity bill.
- This is why the changeover is pre-loaded and run fast (see [[Furnace-Engineering]], Unloading and loading): the coil for the next batch is made ready before the lid is opened, so no heat is lost to a furnace standing open and waiting.
- The pre-process routine before the cycle is **the same for essentially every coil** regardless of material; only the heat-treatment cycle itself varies, and those cycles are already pre-determined for most of the common materials treated here (see Repeat-job reference system below). Individual parts and samples can deviate from the coil routine.

## Material identification
- Incoming material identified by **diameter (e.g. 20 mm) + material grade**. This is the basic spec key used to match a part to its correct process.
- A **heat number** (see [[Metallurgy]]) travels with material as a batch ID tied to the parent mill coil/rolling. Used like a lot number, but assigned upstream by the steelmaker, not by this factory.
- Everything is logged in an Excel sheet (see Paper/GST flow below).
- ⚠️ **Safety concern (material handling):** hot and cold steel look visually identical below ~500°C — a part at 400°C looks room-temperature and will take skin off. Never handle parts moving through the furnace charge/output stage without checking temperature first (spit-drop, IR thermometer, or ask).

## Lot system
- A lot = one customer's batch tracked as a unit from inward to outward.
- Why lots exist — traceability: if parts test soft or off-spec, the lot tells you which furnace run they were in and whose other parts shared it. Without it the options are re-treat everything or ship and pray. Lots also prevent the unforgivable job-work sin: mixing two customers' visually identical parts.
## Repeat-job reference system
- When unsure what process a given customer's material needs, the practice is: check the master Excel of past jobs first — the same customer generally sends the same kind of part, so ~80% of the time the past record is the answer rather than re-deriving the process from scratch.
- Workers themselves carry a separate handybook for cycle parameters — see [[Workers]]. The master Excel is still trusted over the handybook when the two would differ.
- Many customers supply their own cycle parameters directly (shared over WhatsApp) rather than the factory deriving them — the factory runs the customer's cycle as given, tweaking it only if needed.

## Paper / GST flow
- Delivery challan: job-work material moves without sale, so it travels on challans. Goods must return to the sender within the statutory window (inputs: 1 year) or GST treats the movement as a sale — a lot sitting too long becomes a tax event.
- E-way bill: electronic transport document required above value thresholds. Rasik (office boy) generates them; if he's absent, someone else in the office steps in.

## Master Excel sheet
- The complete inward/outward tracking system: which furnace is running which lot, its challan, the customer's company details — all tracked as one inward/outward record. Mostly maintained by uncle/Rasik.
- Why Excel and not a dedicated online system: this area gets frequent power cuts, so a cloud/online tool would leave the factory unable to work during an outage. Excel is written locally regardless of power/internet status, then syncs once power/internet returns — the record-keeping never blocks on connectivity.
- A software project ("FactoryManagementSystem") was started to replace this with proper automation, got roughly half-built, then stalled on exactly this problem: it needed constant internet/sync and couldn't handle the power-cut gaps gracefully, so Excel remained the working system.
- All physical bills are kept in a file behind where father sits (payroll/Upaad notebooks are the equivalent behind uncle's seat — see [[Workers]]).
