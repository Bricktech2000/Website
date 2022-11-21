## Introduction

After months of design and planning, it was finally time to build my combat robot. I divided this post into a few sections, representing the main parts of the building process. Since most of the design was done back when I had no experience with [mills](<https://en.wikipedia.org/wiki/Milling%20(machining)>) or [lathes](https://en.wikipedia.org/wiki/Lathe), I now realize that it is not optimal. Regardless, I hope you enjoy the read!

## Initial Assembly

Generally, when I work on projects, I try my best to start with the highest risk steps; this way, if the project turns out to be more difficult than I initially anticipate, I can decide to put the project on hold without having spent large amounts of time and money on it.

For this project, however, I decided to start with one of the lower risk steps: the initial assembly. My reasonning was that I would be able to start by [3D prinding](https://en.wikipedia.org/wiki/3D_printing) most of the metal parts using my 3D printer &mdash; the [Ender 3](https://www.creality.com/products/ender-3-3d-printer) &mdash; to make sure everything fit together fine, after which I would be able to incrementally "upgrade" the robot with the required metal parts and polyeurethane wheels. This turned out to be a good decision.

Once I had recieved the electronics I had ordered, I started building. I faced a few issues during this phase:

- It turned out that there was **not enough room** in the robot for the electronics I wanted to use. To fis this issue, I decided to remove the _Power Distribution Board_ and replace it with a simple solder joint protected by [heat shrink](https://en.wikipedia.org/wiki/Heat_shrink_tubing) tubing.
- The brushed drive motors did **not have enough torque** to move the robot precisely. To fix this issue, I started by attempting to soak the wheel ball bearings in [isopropyl alcohol](https://en.wikipedia.org/wiki/Isopropyl_alcohol) to remove the thitk lubricant they contained. This improved the situation somewhat. I then decided to order brushed motors with a higher gear reduction, which meand they would have more torque at the expense of reducing the top speed of the robot. In the end, the robot is plenty fast enough and is relatively controllable.

#build-images

Here are some pictures of the initial assembly of the robot:

| ![brushless motor order](Building-the-Robot/20220617_133821.jpg) | ![battery and brushed ESC order](Building-the-Robot/20220621_164409.jpg) | ![brushless ESC order](Building-the-Robot/20220711_170836.jpg) | ![PDB order](Building-the-Robot/20220617_145346.jpg) | ![soldering the PDB](Building-the-Robot/20220621_172344.jpg) | ![attaching the brushless motors](Building-the-Robot/20220618_070454.jpg) | ![attaching the brushed motors](Building-the-Robot/20220621_174913.jpg) | ![wiring the brushed motors](Building-the-Robot/20220621_174919.jpg) | ![lining up the weapon](Building-the-Robot/20220621_202012.jpg) | ![test fitting up the weapon](Building-the-Robot/20220622_185321.jpg) | ![moving to a black chassis](Building-the-Robot/20220721_185948.jpg) | ![fitting everything into the black chassis](Building-the-Robot/20220721_190021~4.jpg) | ![final black chassis assembly](Building-the-Robot/20220721_184927.jpg) |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
|                                                                  |                                                                          |                                                                |                                                      |                                                              |                                                                           |                                                                         |                                                                      |                                                                 |                                                                       |                                                                      |                                                                                        |                                                                         |

## Molding the Weels

The next step in the build was molding the wheels using polyeurethane. I opted for [Vytaflex 40](https://www.smooth-on.com/products/vytaflex-40/) as it comes in two liquid parts that are mixed together to form solid rubber. It has a `40A` hardness, which I believed was appropriate for my combat robot. I sourced a lot of the information on molding combat robot wheels from [this video](https://youtu.be/U-_xxI6qvlg) from [Team Just 'Cuz Robotics](https://www.youtube.com/@JustCuzRobotics) and [this video](https://youtu.be/ZgznRSDI7W8) from [Robert Cowan](https://www.youtube.com/@RobertCowanDIY). The former recommended _mica powder_ for pigmentation, which is what I ended up going with.

I designed a mold in [Fusion 360](https://www.autodesk.com/products/fusion-360/overview) making sure to include the proper demolding features, and then 3D printed it using my [Ender 3](https://www.creality.com/products/ender-3-3d-printer). Using the Vytaflex density from its datasheet and the 3D design volume Fusion 360 was reporting, I calculated that I would need a little less than `40g` of polyeurethane to mold one wheel. I used `1/8 TSP` of mica powder for each wheel, which turned out to work just fine. This was the first time I ever molded polyeurethane, and I ran into one main issue during this step of the build:

- I thought it would be viable to use some `WD-40` as mold release, which ended up being wrong. For both wheels I had to destroy one half of the mold to remove the polyeurethane from it. Next time, I will make sure to use proper mold release, especially when using 3D-printed molds.

Here are some pictures of the molding process:

| ![molding setup](Building-the-Robot/20220907_150630.jpg) | ![preparing the mica powder](Building-the-Robot/20220908_021533.jpg) | ![mixing both polyeurethane parts](Building-the-Robot/20220907_151122.jpg) | ![pooring in the first half of the polyeurethane](Building-the-Robot/20220907_151248.jpg) | ![pouring in the second half of the polyeurethane](Building-the-Robot/20220907_151940.jpg) | ![demolding the first wheel](Building-the-Robot/20220907_235558.jpg) | ![robot with the newly molded wheels on](Building-the-Robot/20220909_200653.jpg) |
| -------------------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
|                                                          |                                                                      |                                                                            |                                                                                           |                                                                                            |                                                                      |                                                                                  |

## Machining the Side Plates

I then decided to continue the build by ordering the side plates from [SendCutSend](https://sendcutsend.com/). I chose `1/4"` thick `6061` aluminum for the side plates, as SendCutSend did not provide this specific thickness in `7075` aluminum. This makes the side plates more prone to bending during a fight, but I figured they were thick enough for that not to be much of an issue.

I needed to countersink the holes on the side plates of the robot, which meant I had finally reached the point at which I needed to learn how to use a [mill](<https://en.wikipedia.org/wiki/Milling%20(machining)>) to be able to continue with the build. Thankfully, [uOttawa](https://www2.uottawa.ca/en) has a machine shop open to all students, the [Brunsfield Centre](https://www2.uottawa.ca/faculty-engineering/spaces/brunsfield-centre). I signed up for the [training offered by CEED](https://www.eventbrite.ca/o/the-manufacturing-training-centre-8474302765), after which I was allowed in. Thanks to the amazing staff, I machined the side plates without running into any problems. That is, apart from breaking a tiny `M3` tap in the part... it was bound to happen.

Here are some pictures of the machining process:

| ![side plate order](Building-the-Robot/20221101_174054.jpg) | ![setting up the mill](Building-the-Robot/20221102_150511.jpg) | ![countersinking the first holes](Building-the-Robot/20221102_160212.jpg) | ![preparing to drill the side holes](Building-the-Robot/20221102_165339.jpg) | ![drilling the side holes](Building-the-Robot/20221102_170328.jpg) | ![tapping the side holes](Building-the-Robot/20221102_172902.jpg) | ![finished side plates](Building-the-Robot/20221102_185923.jpg) | ![finished side plates on the robot](Building-the-Robot/20221103_001344.jpg) |
| ----------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
|                                                             |                                                                |                                                                           |                                                                              |                                                                    |                                                                   |                                                                 |                                                                              |

## Machining the Weapon

The final step was to machine the weapon. This was by far the riskiest part of the whole build because it consisted of a multitude of steps, and failing a single one meant starting the machining process again from scratch. I planned for potential complications by buying a `2 ft`-long aluminum round bar stock, which would give me the leeway for screwing up around three times while still having enough material left for anether attempt. My confidence really was this low.

Thankfully, I did not have to start over from scratch and machined the weapon without any issues. I did not care about the surface finish of the weapon, so I figured I would machine half of it using a [lathe](https://en.wikipedia.org/wiki/Lathe), then flip it around in the chuck to machine the other. In the end, the jaws only left very minor marks on the weapon.

Here are some pictures of the machining process:

| ![aluminum stock](Building-the-Robot/20221107_152053.jpg) | ![cut aluminum stock](Building-the-Robot/20221107_153117.jpg) | ![aluminum stock in the lathe](Building-the-Robot/20221107_154551.jpg) | ![aluminum stock spinning in the lathe](Building-the-Robot/20221107_155148.jpg) | ![initial surface pass](Building-the-Robot/20221107_155657.jpg) | ![pilot hole drilled](Building-the-Robot/20221107_160242.jpg) | ![drilling the rough inner diameter](Building-the-Robot/20221107_164934.jpg) | ![finishing the inner face with a boring bar](Building-the-Robot/20221107_171512.jpg) | ![first half of the weapon finished](Building-the-Robot/20221107_180548.jpg) | ![calibrating the jaws for the second half](Building-the-Robot/20221107_180922.jpg) | ![finished facing on the second half](Building-the-Robot/20221107_182759.jpg) | ![finished the lathe work](Building-the-Robot/20221107_185705.jpg) | ![drilling the side holes in a mill](Building-the-Robot/20221107_192809.jpg) | ![finished drilling the side holes](Building-the-Robot/20221107_194146.jpg) | ![installing the weapon on the robot](Building-the-Robot/20221107_202709.jpg) | ![finished combat robot](Building-the-Robot/20221107_204949.jpg) |
| --------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------- |
|                                                           |                                                               |                                                                        |                                                                                 |                                                                 |                                                               |                                                                              |                                                                                       |                                                                              |                                                                                     |                                                                               |                                                                    |                                                                              |                                                                             |                                                                               |                                                                  |

## Final Design

#build-demo

With the build finished, I was able to test the combat robot fully for the first time. Below is a video of the robot hitting an older frame piece at around `35%` power.

![youtube](HKeHfn3wcko)

#build-parts

And, for anyone interested, here is the final parts list for the robot:

- [Tattu R-Line 750mAh 3S LiPo](https://www.aliexpress.com/item/4000410612116.html)
- [Flysky FS-IA6 2.4G 6CH Receiver](https://www.aliexpress.com/item/1005001768467211.html)
- [20A X 2 Dual-Way Bidirectional Brushed ESC](https://www.aliexpress.com/item/1005002100212968.html)
- 2x [HTIRC Hornet 40A 2-4S Two Way Brushless ESC](https://www.aliexpress.com/item/32822927867.html)
- 2x [12V 640RPM Brushed Gear Motor](https://www.aliexpress.com/item/32891288219.html)
- 2x [D3530 1700KV 3-4S Brushless Motor](https://www.aliexpress.com/item/32955143630.html)
- [6PCS 6806-2RS 30x42x7mm ball bearings](https://www.aliexpress.com/item/4000036518935.html)
- 2x Bottom plate, 3D printed PLA
- 2x Wheel Rim, 3D printed PLA
- 80g [Vytaflex 40A Polyurethane Rubber](https://www.smooth-on.com/products/vytaflex-40/)
- 2x Side plate, laser cut 6061 aluminum
- 1x Accessories, 3D printed PLA
- 1.75" x 160 mm 6061 aluminum round bar stock
- 2x [10PCS M5x40 Countersunk Screws](https://www.aliexpress.com/item/32968616563.html)
- 2x [5PCS M8x10 Countersunk Screws](https://www.aliexpress.com/item/32968616563.html)
- 2x [10PCS M5x16 Countersunk Screws](https://www.aliexpress.com/item/32968616563.html)
- 1x [10PCS M3x10 Countersunk Screws](https://www.aliexpress.com/item/32968616563.html)
- 12x M3x10 Button Head Screws
- 4x M3 Nut

The final weight of the robot is `1288.8g`, which is `72g` under the `3lb` weight limit. Including unused parts such as the leftover aluminum stock, the two extra bearings, the leftover Vytaflex and the four unused brushed motors, the total cost of the robot is `460.96 CAD`. Note that this excludes all necessary tools, such as a mill and a lathe, a 3D printer, proper soldering equipment, molding supplies such as mixing cups and protective gloves, a LiPo charger, a transmitter, and so on.

## Final Words

I learned a lot while working on this project, from how to use mills and lathes to how to tap threads and mold polyeurethane rubber. In the end, I am very happy with how the robot turned out. I hope you enjoyed reading about my experience building this robot, and I hope you learned something from it as well.
