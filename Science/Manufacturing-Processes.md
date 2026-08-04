# Manufacturing Processes — How the Part Exists Before It Reaches Us

This factory is job work: parts arrive already shaped, and we only change their internal structure. The shaping route the part took decides what internal structure arrives, how much strength the customer expects out of us, and how much they care about decarb.

**Which routes actually reach us:** all of them, in different proportions, and casting/forging is *not* the usual one. The bulk of intake is **steel coil/wire** (the 10–25mm wire specs the big furnaces are sized for — see [[Furnace-Engineering]], Inventory), which comes from **rolling and drawing**, not from casting or forging. Bearing-related and fastener customers sit on that route. Direct machine parts and ready-made finished parts arrive **sparsely** by comparison — a real but minor stream, and castings (SuperEngiTech, see [[Day8]]) sit inside it. Furnace allocation follows quantity and weight rather than part type (see [[Process]], What actually comes in). So read the sections below as a map of the possible upstream histories of an incoming part, not as one fixed pipeline.

## Rolling and drawing — the route most of our material takes
- **Hot rolling**: a cast billet from the mill is reheated and squeezed between rolls to reduce its cross-section. Done above the recrystallization temperature, so the deformed grains continuously re-form into new soft ones — large reductions are possible, but the surface finish and dimensional accuracy are poor, and the surface scales.
- **Cold drawing**: the rolled bar or rod is pulled through a die at room temperature to reduce it further. Grains cannot re-form at that temperature, so they stay deformed — the material **work-hardens**: it gets harder, stronger, and less ductile, with excellent surface finish and tight dimensional tolerance. This is what a "bright bar" is (the product line the Bright Corporation plot was set up for — see [[Business]]).
- **Why this is the route that generates our work.** Cold drawing is self-limiting: each pass work-hardens the wire further until it becomes too hard and brittle to draw again without cracking. To continue, the wire must be **annealed** — heated to soften it and restore ductility — and then it can be drawn again. That anneal is heat-treatment job work. So this factory sits inside the drawing cycle itself: draw → anneal → draw → anneal.
- This also explains the material state described elsewhere: incoming EN31 arrives annealed and machinable (pearlite/spheroidite — see [[Metallurgy]]), and spheroidize-annealing for machinability is the actual product this factory sells, not hardening.
- A ball-bearing customer's chain, end to end: mill casts and hot-rolls → cold-drawn to size (with anneals in between, our work) → cut and formed into balls/races → hardened → ground. Nothing in that chain is cast or forged near us.

## The two shaping routes (for parts that arrive already formed)

| | **Casting** | **Forging** |
|---|---|---|
| What happens | Metal is melted fully liquid and poured into a mould cavity | Metal is heated close to but **not** at melting (stays solid, just plastic) and pressed/hammered into shape |
| Shape freedom | Very high — complex, hollow, internal passages possible | Limited — has to be reachable by a die pressing from outside |
| Strength | Lower | Higher |
| Material waste | Less | More (flash trimmed off, plus machining allowance) |
| Typical parts | Engine blocks, hydraulic manifolds/valve bodies, pump housings, jewellery | Crankshafts, connecting rods, engine parts under constant stress, hammers, wrenches, high-pressure valves |

Both routes almost always still need **machining** (for finish/precision) and **heat treatment** (for properties) afterwards — the extent of each depends on how much precision and how much strength the part actually needs. That "afterwards" is where this factory sits in the chain.

### Why forging is stronger — grain flow
- In a cast part, the metal solidified from liquid, so the grains grew in whatever direction heat happened to leave: essentially random orientation, with grain boundaries running in all directions including straight across load paths. A crack only has to follow the boundaries that already point the wrong way.
- In forging, the metal was never liquid — the existing grains get physically squashed and stretched, so they end up **flowing along the contour of the part**, like the grain of wood bent around a shape rather than sawn across it. A crack trying to propagate across the part now has to cut across the grain flow instead of running along it, which takes far more energy.
- Second reason: casting solidification traps defects — gas porosity (dissolved gas coming out of solution as the metal freezes) and shrinkage cavities (the last liquid to freeze has nothing left to feed it). Forging pressure closes these up. So forged parts are both better-oriented and less voided.
- Consequence for us: a forged part is normally the one carrying real service stress, so it's the one where a soft decarbed skin actually matters (see [[Metallurgy]], Decarburization). A cast hydraulic body wants dimensional precision, not fatigue strength — which is exactly why our decarb doesn't disqualify us at SuperEngiTech (see [[Business]], Customers).

### Casting sub-methods
- **Sand casting** — the route seen at SuperEngiTech. Cheapest, largest sizes, roughest surface.
- **Investment casting** (lost wax) — a wax pattern is coated in ceramic, the wax melted out, metal poured into the resulting shell. Much better surface finish and dimensional accuracy, higher cost, smaller parts.
- **Die casting** — molten metal forced under pressure into a reusable **steel** die. Fast, repeatable, excellent finish, but the die is expensive and it's mostly limited to lower-melting metals (aluminium, zinc, magnesium) because a steel die does not survive repeated contact with molten iron.
- Note the terminology collision: in sand casting the cavity is formed by a **pattern** pressed into sand; "die" properly means the reusable metal tool of die casting/forging. On the shop floor both get called the die.

## Sand casting, as seen at SuperEngiTech
1. **Mould making.** A sample metal piece (the pattern) is pressed into sand to leave its negative image — this is the cavity the metal will fill. Both soft (green sand) and hard (chemically bonded) moulds are made.
2. **Melting.** The charge is a mix of **pig iron** bought from large integrated mills (JSW and similar, who reduce iron ore with coke) plus **the plant's own returned scrap**, with the remaining alloying elements added on top to hit the target composition. Melt runs around **1200°C**.
3. **Pouring** into the mould cavity.
4. **Shakeout.** Cooled, the sand mould is broken away — and the sand is recovered and reused.

Layout logic at that plant: mould making happens at one end of the shed, the mould then travels, and pouring is done at the front end near the QA department. Sensible flow — pouring is the hot, hazardous, quality-critical step, so it sits closest to inspection and to the exit rather than buried behind the mould line.

### Why the melt is only ~1200°C — the single most useful number here
- **Pure iron melts at 1538°C. Cast iron melts around 1150–1200°C.** Adding carbon *lowers* the melting point, dramatically.
- Why: pure iron is a single element packing into one clean crystal lattice, and it has one sharp melting point. Dissolve carbon into it and the carbon atoms disrupt that lattice — the mixture no longer has one preferred solid arrangement, so it starts becoming liquid at a lower temperature.
- The minimum sits at the **eutectic composition, ~4.3% carbon, at 1147°C** — the lowest-melting point of the whole iron–carbon system. Cast iron is deliberately parked near this composition, which is exactly why it's castable at all: a foundry can hit it with ordinary furnaces, and it stays fluid long enough to fill thin sections.
- This is also why **pig iron is the charge material.** Pig iron is the raw output of a blast furnace and carries ~3.5–4.5% carbon precisely because it sat in contact with coke — so it arrives already near-eutectic and already low-melting. Steelmaking is fundamentally the act of *removing* that carbon back down to <2%; a foundry making cast iron simply skips that step and keeps the cheap, low-melting material.
- Corollary worth holding on to: **a steel foundry has a much harder job than an iron foundry.** Low-carbon steel melts closer to 1500°C and is far more sluggish/viscous when liquid, so it fills thin sections badly. Complex thin-walled castings are made in cast iron for a reason.
- (The eutectic point, the 2.1% steel/cast-iron line, and why silicon shifts it are the same physics as the carbon-equivalent discussion in [[Metallurgy]], Cast iron.)

### Why scrap gets recharged, and why composition still has to be corrected
- Returned scrap (runners, risers, rejected castings — generated in-house) is remelted because it's already the right alloy and already paid for; buying it back as fresh pig iron would be pure waste.
- But melting is not composition-neutral: carbon and silicon **burn off** in the melt through oxidation, and the ratio drifts every cycle. That's why elements are "added on top" — the melt is corrected up to spec before pouring, and (in a well-run foundry) checked spectrally before it's allowed out. Same logic as our own spectral testing, one step upstream (see [[Lab-Testing]], Spectral test).

## Machining — the finishing stage
**A casting is never dimensionally perfect.** It shrinks unevenly as it solidifies, the sand mould itself moves, and the surface is rough. So every casting carries deliberate extra material (machining allowance) that gets cut away afterwards to reach final dimensions.

Machines seen at SuperEngiTech Unit 2 — genuinely top-tier for Rajkot:
- **Turning (lathe)** — **the workpiece rotates**, a stationary single-point tool is fed against it. Produces round/cylindrical shapes: shafts, bores, threads, tapers.
- **Milling / VMC (Vertical Machining Center)** — the reverse: **the tool rotates**, the workpiece is held still on a table that moves under it. "Vertical" = the spindle points down. Produces flat faces, slots, pockets, complex 3D contours.
- **Drilling** — creating a hole from solid with a rotating drill bit.
- **Boring** — enlarging and truing an *existing* hole. The distinction that matters: a drill follows its own path and can wander, so a drilled hole is accurate in diameter but not necessarily in position or roundness; boring uses a single-point tool on a rigid spindle to take the hole to exact size, position, and straightness. Precision holes are drilled first, then bored.
- **CNC (Computer Numeric Control)** — not a machine type but a *control* method: the tool path is driven from a program instead of a human turning handwheels. Applies to lathes and mills alike. The CNC machines there are from **Jyoti** (Jyoti CNC, Rajkot — a local manufacturer of national scale).
- **3D scanning camera** — builds a 3D digital model of the finished part in the computer, so actual geometry can be compared against the design model. This is dimensional QA, not machining.

### When a tool physically cannot reach
Some internal fluid veins in these hydraulic cores are as fine as **500 microns** (0.5 mm) — no cutting tool fits inside. Those passages are never machined at all. They are cleared with a **water jet spray** to blast out residual sand and impurities, and the plant simply relies on the casting itself having formed the passage accurately. This is the real reason casting precision is their obsession rather than strength: for those features, the as-cast surface *is* the final surface, with no second chance to correct it.

## The application: hydraulic control cores for earth movers
- SuperEngiTech's German contract part is the **main hydraulic core** of earth-moving machinery (JCB-type). Every arm, bucket, and boom on such a machine moves by hydraulic fluid, not by motors or cables.
- How it works: the operator's stick/lever doesn't move the arm — it re-routes fluid. The core is the central manifold that all hydraulic fluid passes through on its way to the cylinders, containing the complex internal routing that decides which cylinder gets pressurised. Pushing the stick switches the routing; the fluid does the work.
- Why hydraulics at all: a liquid is essentially incompressible, so pressure applied at one end transmits almost undiminished to the other, and a small piston acting on a large one multiplies force. That's how an operator's fingertip pressure becomes tonnes of digging force.
- Why this part is cast and not forged: it is a dense block riddled with internal passages that cannot be produced any other way — no press can form a closed internal network. It also lives under high internal pressure but not under cyclic bending/fatigue load, so casting's lower strength is acceptable while its shape freedom is indispensable.
- Consequence for us, and it's the commercially important one: **our decarb does not disqualify us on this part.** It doesn't need extreme surface strength and doesn't face severe cyclic stress — they care about the precision of the metal itself. (See [[Business]], Customers, for the deal this opens up.)
