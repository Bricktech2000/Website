MiniML 1.0
//Copyright Emilien Breton


How it All Started
------------------

As for many of my projects, I first got the inspiration for this robot by watching {a YouTube video:: https://www.youtube.com/watch?v=86EJ05kBksA}. The author, {Robert Cowan:: https://www.youtube.com/channel/UCPOTPYuDsKnXP9I-ph4yMgg}, was simply talking about a antweight combat robot he made for a competition.
	""Antweight robots are some of the /smallest/ types of combat robots, weighing a maximum of [1 lb]. They are typically made of *plastic* and implement a fairly simple  weapon system. The goal of the design is to reduce weight while maximizing destruction against other bots.""
I used to think that /combat robots/ were enourmous machines that cost thousands to manufacture, just like {the ones on TV:: https://battlebots.com/}. However, this made me realize that competitions exist for robots of various sizes, from [1 lb] all the way up to [220 lb]. After watching a few hours worth of videos about the subject, I managed to piece together the first version of the design.

The First Design
----------------

# first
The design goal of the first version of the robot was very simple: *maximize mobility*. Here is a [3D render] of it:
	{{Assembly_1_2021-Feb-02_03-24-59PM-000_CustomizedView22055540780_png.png}}

I had previously identified that the lack of mobility of some bots caused them to loose matches. In order to combat this, the first version of my combat robot was reversible, meaning it could drive both *right side up* and *up side down*. Moreover, I decided to use omnidirectional wheels to make it as nimble as possible.
	""The Mecanum wheel is based on a tireless wheel, with a series of rubberized external rollers obliquely attached to the whole circumference of its rim. These rollers typically each have an axis of rotation at [45°] to the wheel plane and at [45°] to the axle line. Each Mecanum wheel is an independent non-steering drive wheel with its own powertrain [...].
	{Wikipedia:: https://en.wikipedia.org/wiki/Mecanum_wheel}""
This first version looked very promising, but the design was flawed in many ways. First, it weighed [1.98 kg] or [4.37 lb], meaningg it was way over the [3 lb] weight limit imposed for beetleweights. Second, the weapon could only store [23.65 J] of kinetic energy, which is completely useless for this weight class. Third, the [3D printed]chassis of the robot was simply too weak to withstand any kind of hit from opponents. For those reasons, I knew a complete redesign would be necesary.


The Second Design
-----------------

# second
The design goals of this second version were completely different from the initial ones: *use a simple and robust chassis to support a huge weapon*. Here is that second version:
	{{Assembly_2_2021-Mar-09_09-47-44PM-000_CustomizedView17152833616.png}}
I started the design with [68 x 36 mm] rubber tires, offering great traction. Then, I designed a completely custom wheel hub to accomodate said tires along with huge [30 x 42 x 7] ball bearings. Whereas most robots of this weight class use the motor shaft as a wheel axle, this assembly ensures that the wheel hubs are supported very effectively on both sides. Here is a [3D render] of it:
	{{Wheel_Assembly_2021-Mar-10_12-47-48AM-000_CustomizedView1437219039.png}}

After having designed the wheels, I immediately started prototyping the weapon. A few drafts and I landed on a design that is both robust and easy to manufacture. It consists of [24] steel bolts screwed into an aluminium tube, inside of which the motor bells press fit:
	{{Weapon_Assembly_2_2021-Mar-09_11-24-16PM-000_CustomizedView40034001050.png}}
This design also improves the moment of inertia of the weapon, which is crucial for such a drum spinner.
	""The moment of inertia is a quantity that determines the torque needed for a desired angular acceleration about a rotational axis [...]. It depends on the body's mass distribution and the axis chosen, with larger moments requiring more torque to change the body's rate of rotation.
	{Wikipedia:: https://en.wikipedia.org/wiki/Moment_of_inertia}""
In essence, by concentrating the mass of the weapon on its outer perimeter, the energy it stores is greately increased when rotating at a predetermined angular velocity. In layman's terms, the weapon hits *way* harder. The current version stores a theoretical [238.45 J] of kinetic energy and spins at an impressive [20 400 RPM].

All of the required components were then encapsulated within a very robust chassis. It is made of an [8 mm] thick aluminium exoskeleton with a symmetrical [3D printed] body. It consists of two completely identical halves which are then assembled together using /plastic pins/, facilitating their replacement if one of them ever breaks. Here is a render of the whole body assembly containing all necessary electrical components:
	{{869d4e23-790c-478a-9c14-9575de76ab20.PNG}}
# parts
Because of this robust chassis and its powerful weapon, I believe that this bot has a good chance of winning some matches! For anyone interested, here is a parts list for this version of the robot:
	* {Tattu R-Line 750mAh 3S LiPo:: https://www.aliexpress.com/item/4000410612116.html?spm=a2g0o.cart.0.0.46f03c00wseQoI&mp=1}
	* {Matek Systems PDB-XT60 W/ BEC 5V & 12V:: https://www.banggood.com/Matek-Systems-PDB-XT60-W-or-BEC-5V-and-12V-2oz-Copper-for-RC-Drone-FPV-Racing-Multi-Rotor-p-1049051.html?akmClientCountry=CA&cur_warehouse=CN}
	* {Flysky X6B 2.4G 6CH Receiver:: https://www.banggood.com/Flysky-X6B-2_4G-6CH-i-BUS-PPM-PWM-Receiver-for-AFHDS-i10-i6s-i6-i6x-i4x-Transmitter-p-1101513.html?akmClientCountry=CA&cur_warehouse=CN}
	* {10cm 18AWG XT60 Female Plug to XT30 Male Plug:: https://www.banggood.com/10cm-18AWG-XT60-Female-Plug-to-XT30-Male-Plug-Cable-Adapter-for-Battery-Charging-p-1254208.html?akmClientCountry=CA&cur_warehouse=CN}
	* {20A X 2 Dual-Way Bidirectional Brushed ESC:: https://www.aliexpress.com/item/1005001710529617.html?spm=a2g0o.cart.0.0.46f03c00wseQoI&mp=1}
	* {60A Double Sides Brushless ESC:: https://www.banggood.com/Double-Sides-Brushless-ESC-20-or-30-or-40-or-50-or-60-or-80A-Underwater-Thruster-RC-Car-Boat-Parts-p-1649988.html?akmClientCountry=CA&cur_warehouse=CN&ID=520180}
	* 2x {12V 1000RPM Brushed Gear Motor:: https://www.aliexpress.com/item/4001220881842.html?spm=a2g0o.cart.0.0.46f03c00wseQoI&mp=1}
	* 2x {D3530 1700KV 3-4S Brushless Motor:: https://www.aliexpress.com/item/4000896324917.html?spm=a2g0o.cart.0.0.46f03c00wseQoI&mp=1}
	* {2Pcs HS 18301 1/18 Scale Wheel:: https://www.banggood.com/2Pcs-HS-18301-18302-18311-18312-RC-Car-Wheel-For-1-or-18-Crawler-RC-Car-p-1351106.html?akmClientCountry=CA&cur_warehouse=CN}
	* 2x {2PCS 6806-2RS 30x42x7mm ball bearings:: https://www.ebay.ca/itm/1-10pcs-6800-2RS-to-6810-2RS-RS-2RS-Rubber-Sealed-Deep-Groove-Ball-Bearing/402183454980?var=672114177279}
	* 2x /Bottom plate/, [3D printed PLA]
	* 2x /Side plate/, [Laser cut aluminium]
	* 1x /Accessories/, [3D printed PLA]
	* [35 x 42 x 160 mm] /aluminium pipe/
	* 4x {M3x4 Countersunk Screws:: https://www.banggood.com/Suleve-MXCH10-1060Pcs-M2-M3-M4-M5-Carbon-Steel-Flat-Head-Countersunk-Hex-Socket-Screw-Hex-Screw-Metric-10_9-Grade-p-1659457.html?akmClientCountry=CA&}
	* 8x {M3x12 Countersunk Screws:: https://www.banggood.com/Suleve-MXCH10-1060Pcs-M2-M3-M4-M5-Carbon-Steel-Flat-Head-Countersunk-Hex-Socket-Screw-Hex-Screw-Metric-10_9-Grade-p-1659457.html?akmClientCountry=CA&}
	* 24x {M5x6 Socket Head Screws:: https://www.banggood.com/Suleve-M5CH3-50Pcs-M5-12_9-Grade-Carbon-Steel-Hex-Socket-Cap-Head-Screw-8-30mm-Optional-Length-p-1333415.html?akmClientCountry=CA&cur_warehouse=CN&ID=41225}
	* 8x {M5x16 Countersunk Screws:: https://www.banggood.com/Suleve-MXCH10-1060Pcs-M2-M3-M4-M5-Carbon-Steel-Flat-Head-Countersunk-Hex-Socket-Screw-Hex-Screw-Metric-10_9-Grade-p-1659457.html?akmClientCountry=CA&cur_warehouse=CN}
	* 8x {M5x20 Countersunk Screws:: https://www.banggood.com/Suleve-MXCH10-1060Pcs-M2-M3-M4-M5-Carbon-Steel-Flat-Head-Countersunk-Hex-Socket-Screw-Hex-Screw-Metric-10_9-Grade-p-1659457.html?akmClientCountry=CA&cur_warehouse=CN}

Updates Coming Soon!
--------------------

	When I get aroud to buying all the parts needed (totalling about [300 CAD]), I will update this post for you to follow along!
