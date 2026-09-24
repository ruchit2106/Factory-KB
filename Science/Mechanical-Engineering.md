# Mechanical Engineering

Machine elements and the general mechanical reasoning behind them — power transmission, bearings, fasteners. How any specific machine here is built, and what went wrong with it, stays with that machine in its own file. Material behaviour is in [[Metallurgy]]; how a part was shaped before heat treatment is in [[Manufacturing-Processes]].

## Gear boxes — a gear train running in oil
- **A gear box is a gear train plus a sealed casing with the whole train submerged in oil.** Every gear, shaft and bearing inside is oil-dipped. That is the entire difference from an open gear train doing the same job in air, and it is why machines that must not stop — cranes especially — use one.
- **Why the oil:** it carries away the heat generated at the tooth contacts and keeps a film between the meshing faces, so friction and wear drop and the gears last far longer. The sealed casing does a second job the oil cannot — it keeps a dusty shop's grit and scale off the teeth, where an open train would grind them straight into the mesh.
- **Reading a gear train inside the box:** the incoming shaft from the motor turns a smaller gear, which in turn drives the final output gear. Each mesh from a larger gear to a smaller one, or the reverse, trades speed against torque — which is the point of the box beyond protecting the gears.
- **The oil is a serviceable item, not a sealed filling:** most gear boxes have an **oil input hole** to fill through and a **drain plug hole** at the bottom to let it out. That makes it maintainable — drained, inspected, replaced.
- **What draining it tells you.** Oil coming out with metal particles in it is the gear box reporting its own wear before it fails. It is the only condition signal a sealed box gives, and it costs nothing to read whenever the oil is changed.

## Bearings
- **Anything that rotates against a fixed part runs on ball bearings.** It is close to a general rule of mechanical engineering, and it holds everywhere inside a gear box. The bearing is what carries the shaft's load while letting it turn, replacing sliding contact with rolling contact — far less friction, far less wear, and the bearing is a cheap replaceable part standing in for an expensive shaft and housing that are not.

## Pressure: gauge vs absolute
- **A gauge (relative) reading measures against the surrounding atmosphere; an absolute reading measures against a perfect vacuum.** On a gauge scale atmospheric pressure is **0**, which is why a vacuum reads as a **negative** number rather than as a small positive one.
- **Gauge is the right choice for a vessel, not a shortcut.** What matters operationally is the *difference* between inside and outside: that difference is what drives leakage in or out, what holds a lid seal, and what says whether an atmosphere is being kept in or air pulled in.
- **And the absolute figure would carry no extra usable information**, because a perfect 0 vacuum is practically impossible to reach — the reference point itself is unreachable.

## Oil-flooded machines and their oil
- **An oil-flooded machine is soaked internally, and the oil does three jobs at once:** it **seals** the running clearances so the machine can hold a pressure difference at all, it **lubricates** the moving parts, and it **carries away the heat of compression**.
- **So bad oil does not announce itself.** A machine with degraded or contaminated oil does not fail loudly — it just quietly stops performing, because the seal the oil was providing has gone.
- **Water in the oil is the specific killer in vacuum service.** Water has a far higher vapour pressure than the oil does, so once water is in the charge the machine is boiling water off inside itself and can no longer reach a low pressure — the vacuum degrades with nothing mechanically wrong. Water also **emulsifies** the oil, destroying its sealing and lubricating ability, and **corrodes** the internals.
- **Contaminated and degraded are not the same thing, and only one is recoverable.** Filtering removes **contamination** — water and particles come out. It does nothing for **degradation**: heat cycling and oxidation break the oil down chemically, and no filter reverses that. Topping up with fresh oil **dilutes** the old charge rather than replacing it.

## Non-return valves (spring check NRV)
- **A purely mechanical one-way valve — no electrics, no control signal.** An internal spring holds a sealing sheet/disc against a seat. Forward pressure pushes the sheet off its seat and flows through; the moment forward pressure drops, the spring snaps the sheet back onto the seat and blocks reverse flow.
- **The blocking is automatic and instant because the loss of pressure *is* the trigger** — nothing has to detect the reversal for it to act.
- **A non-return valve does not isolate a vacuum, and that is orientation rather than a fault.** Suction applied on the downstream side pulls in the valve's *open* direction, so the valve simply opens and the suction carries straight back up the line. Reverse-flow protection and isolation are two different jobs needing two different devices.

## Thermal expansion in fixtures
- **Steel grows roughly a centimetre per metre of length over an 850°C rise.** Anything metal that will sit at furnace temperature has to be allowed that growth.
- **Constrain the position, not the expansion.** Clamp a long member hard at several points and that growth has nowhere to go: it buckles out of shape, or tears its own mounting. The correct fixing holds *where* the part sits while leaving it free to slide as it grows.
