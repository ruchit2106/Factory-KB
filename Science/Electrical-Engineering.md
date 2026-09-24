# Electrical Engineering

The general electrical science the factory runs on — supply, machines, and the reasoning behind both. Electrical work sits alongside metallurgy and mechanical as a core discipline here, because so much of the plant is electrical equipment rather than metal. Any particular installation — the furnace's own circuits, the panels, the incoming supply — stays with the plant file that owns it.

## AC fundamentals: RMS, peak, and the two 3-phase voltages
- **Every AC figure quoted anywhere — nameplate, panel meter, supply rating — is the RMS value, never the peak.** RMS is the DC-equivalent value: the DC voltage that would push the same power into the same resistance. That is why it is the number used, and it is the number every heating and power calculation here is done in.
- **A 3-phase supply carries two voltages, not one.** **L-N** is one phase measured against neutral (single phase to neutral); **L-L** is one phase measured against another phase. Every AC voltage in the factory is one or the other, and which one is meant has to be said — the unqualified word "voltage" on a 3-phase system is ambiguous by a factor of 1.73.
- **The two formulas everything reduces to:**
  - **V(any)_peak = √2 × V(any)_rms** — applies to L-N and L-L alike (≈1.414×).
  - **V(L-L) = √3 × V(L-N)** — holds for peak and RMS alike, since it is a ratio between the two measurements and does not care which scale they are on (≈1.732×).
- **Why √3:** the phases are displaced **120°**, so at any instant two phases sit at different points in their cycles. Their difference never reaches twice the value of one — it works out to √3 times it.
- **Why √2 matters separately from RMS:** the insulation, the contactor gap and the thyristor stand off the **peak**, which is ~41% above the plate figure, twice every cycle. Power is sized on RMS; insulation and clearances are sized on peak. The two numbers do different jobs and must not be swapped.
- **The working values on this supply:**
  - **V(L-N)_rms = 220–230 V**
  - **V(L-L)_rms = 380–400 V**
- **Which of the two a device sees depends on how it is wired, and it changes the power by 3×.** A device across phase and neutral sees V(L-N); one across two phases sees V(L-L), 1.73× higher — and since power goes as voltage squared, that is 3× the power.
- **A 3-phase machine is rated by its L-L voltage.** No neutral runs to it, so L-L is the only voltage it ever sees — a "400 V motor" means 400 V line-to-line. Reading the L-N figure off a plate and treating it as the machine's rating is the common way to get this wrong.

## Motors: stator, rotor, and the squirrel cage
- **The rule, and it runs both directions.** **Current flows in the stator** — either we feed it in, or the machine produces it there. **The rotor is the magnet, and it rotates** — either we turn it, or it is turned. A motor and a generator are the same machine read in opposite directions: put current into the stator and the rotor is driven round; drive the rotor round and the stator produces current. The names are positional — stator from stationary, rotor from rotating — which is why they survive the change of direction while "input" and "output" do not.
- **The squirrel-cage induction motor is the most-used industrial motor design**, and nearly every industrial crane motor in Rajkot is one.
- **How it works:** the 3-phase currents in the stator produce a magnetic field that **rotates on its own**, with no switching device needed to make it turn — the 120° displacement between the phases is what makes the field sweep round. That rotating field drags the rotor after it.
- **Why it lasts:** the rotor is a cage of conducting bars shorted at both ends, with **nothing connected to it electrically** — no brushes, no slip rings, no commutator. There is nothing on the rotor to wear out or replace, which is why the design survives in a dusty shed with no maintenance and starts straight off the supply with no drive electronics in between.
- **It cools itself:** a **fan** on the shaft pushes air over the frame whenever the machine is running.

## Resistance heating elements: Kanthal vs Nichrome
- **A heating element is resistance wire wound into a coil.** The coil shape exists to fit a long resistance length into a compact space — that is how any electric heating coil is built.
- **Kanthal (FeCrAl — iron-chromium-aluminium)** grows a protective **aluminium-oxide skin** at high temperature which stops the wire burning away. That skin is what buys the higher maximum temperature and the longer element life, and it is the reason FeCrAl is chosen over cheaper nichrome for sustained high-temperature work.
- **Nichrome (NiCr)** has lower electrical resistance and heats up faster, which is why it is the standard choice for quick-response, lower-temperature commercial appliances (e.g. toasters). It does not hold up at the sustained high temperatures Kanthal's oxide layer survives.
- **Different tool for a different job:** Nichrome optimises for fast response at moderate temperature, Kanthal for surviving sustained high temperature.
- **An element is a consumable, not a fixture.** Over its life the oxide skin spalls away, the wire thins, its resistance rises and the power it delivers drops.
- **Any reduction in cross-section along a resistive element is a hot spot, and therefore the next failure site.** Less metal at a point means more resistance there, more resistance means more heat dissipated there, so a thinned, pinched or joined section runs hotter than the element around it and breaks first. The repair worth making is the one that restores full cross-section rather than building in a new weak point.

## Power control: contactors and thyristors
- **Contactor** — an electromechanical switch. When the controller calls for more heat it closes and delivers **full (100%) power** in discrete on/off bursts. This is **on/off (bang-bang) control**, and it reads on a temperature graph as a stepped/sawtooth pattern rather than a smooth curve.
- **Thyristor (SCR)** — a solid-state switch that can deliver a controlled *percentage* of power smoothly instead of only 100 or 0, giving finer temperature control and having no moving parts to wear.
- **Why contactors wear out:** every switching cycle draws an **arc** across the contacts as they open and close. Over thousands of cycles that arcing pits and erodes the contact surface. The two failure ends are **welded shut** — stuck ON, runaway overheating — and **failing to make contact** — stuck OFF, no heating, and the cycle fails silently. This is a known, expected wear mode of contactor-based control, not a one-off fault; it is the direct mechanical price of the simpler, cheaper switching technology.
- **What a thyristor is actually worth is element life, not the electricity bill.** A contactor dumps full power into a resistive element in a fraction of a second — an electrical and thermal shock on every switching cycle — while a thyristor brings it up gradually. Since elements are a consumable that thins over time (see Resistance heating elements above), the gain shows as a slower slide in element condition rather than as fewer outright burnouts. Lower power consumption is real, but secondary.

## PID control and time-proportioning
- **PID (Proportional-Integral-Derivative)** compares the actual reading against the setpoint and computes an output from three terms: **Proportional** reacts to how far off the current reading is right now; **Integral** corrects the persistent small offset that P alone leaves behind, by accumulating error over time; **Derivative** reacts to how fast the error is changing, to stop the temperature overshooting past setpoint before it settles. This is the standard algorithm behind virtually all industrial temperature control.
- **Time-proportioning is what lets a PID loop drive an on/off device.** A PID controller's raw output is a continuous value — "62% power" — but a contactor can only be fully on or fully off, so the controller switches it on and off within a fixed short window such that on average it is on for roughly the commanded percentage of the time: on for ~6 seconds out of every 10. The control logic stays continuous; only the delivery becomes discrete.
- **Two things follow, and both are visible.** The temperature trace shows discrete on/off bursts even though the loop underneath is continuous; and the contactor accumulates an enormous number of switching cycles, which is what wears it out (see Power control above). A thyristor needs none of this workaround, since it can output a true continuous percentage directly.
- **Terminology:** a **thermocouple** is only the sensing element — it measures temperature and nothing else. A **thermostat** is the control unit that takes that reading and acts on it, running the PID logic and opening/closing the contactors accordingly.
- **Sensor drift is the failure mode that hides.** A drifted sensor drives its whole loop off-spec while the display continues to look entirely normal.

## Serial links and communication modes
- **Simplex** — data flows only A to B; B cannot transmit. Like a keyboard to a CPU: the CPU never talks back to the keyboard.
- **Half duplex** — both ends can transmit, but only one at a time. Like a walkie-talkie.
- **Full duplex** — both transmit simultaneously. Like a modern phone call.
- **Why the mode matters practically:** on a simplex link the receiving end has **no way to acknowledge, request a retry, or poll for a missed reading**. If a value is corrupted or dropped in transit, nothing in the protocol notices — so a data-integrity fix has to be applied at the destination, not at the link.
- **RS232 vs RS485:** RS232 is single-ended, short-range and point-to-point. RS485 is **differential** and rejects electrical noise far better over long cable runs — which is the property that matters anywhere near contactors switching 3-phase heating loads.

## Protection: fuses in series
- **Two fuse sets wired in series on the same phase are a redundancy layer, not a doubled rating.** If the primary set fails to open under fault — rare, but possible — the second set is the backstop. Cheap insurance against the fire or equipment-damage event that a single fuse layer missed.
- **Fuse quality is a safety property, not only a reliability one.** A fuse that does not trip at its rated point defeats the whole redundancy design, and an under-tripping fuse means unprotected fault current.

## The fluid–electrical analogy
A gas or fluid network can be reasoned about as an electrical circuit, and the mapping is exact enough to reason with:

| Electrical | Gas / fluid |
|---|---|
| Voltage | Pressure |
| Current | Flow |
| Resistance | Orifice size — inversely: a wider hole is less resistance |

- **Branches in parallel all see essentially the same pressure**, the way parallel resistors share one voltage. What small differences exist come from the resistance of the pipe run feeding them.
- **If those branches differ in orifice size they differ in resistance, so each carries a different flow** — exactly as parallel resistors of different values draw different currents off one voltage.
- **The consequence:** with pressure common to every branch, orifice size is the only thing setting how the total flow splits between them. Sizing the orifices is how the distribution gets tuned.
