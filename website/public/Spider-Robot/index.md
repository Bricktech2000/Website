## The Problem

Version 3 of my spider robot (which you can learn more about [here](../Spider-Robot/)) had many issues. Here are a few:

- It was **very twichy**: the `servo motors` were constantly vibrating all over the place
- Its behavior was **very inconsistent**: as the current demand rose, the battery voltage was sagging way too much.
- The motors **kept breaking**: as soon as I kept the robot running for more than a few minutes, one of the motors always died for no apparent reason.

My first thought was that the voltage supplied to the motors was slightly too high, and so I ordered [a random 5V voltage regulator](https://www.banggood.com/DD2712SA-3_5A-Mini-5V-27V-to-3_7V-5V-12V-DC-DC-Step-Down-Buck-Power-Converter-Module-Voltage-Regulator-p-1651953.html?rmmds=myorder&cur_warehouse=CN&ID=519957) on _Banggood_, hoping it would help me fix some of the issues mentionned above. When I finally received it, I simply threw it in my _electronics_ drawer and completely forgot about it. However, during a boring physics class last week, I figured I would install it onto [the robot](../Spider-Robot/) just to see what would happen. Let me tell you:

> I did not expect this tiny modification to solve so many issues.

## How Everything Unfolded

As soon as I got the regulator installed, a massive difference was visible in the twichiness of the robot. The cheap servo motors were rated for `5V`, but the voltage of the LiPo battery ranged from `6.6V` when totally dischanrged to `8.4V` when fully charged. This meant three things:

- When the battery was fully charged, the servos caused the robot to be **way too twichy** because their low-quality controller couldn't handle such a higher voltage.
- When the battery was close to fully discharged, the robot was not as twichy, but its behavior was **very inconsistend** because of the caracteristic LiPo battery sag near `3.3V/cell`.
- The large voltage delta caused the low-quality servo controllers to burn out after a few minutes, meaning the motors **kept breaking** seemingly randomly.

At this point, anyone that has any experience with electronics would scream at me:

> Just feed the motors constant voltage!

And, as it turns out, this is exactly what a [voltage regulator](https://en.wikipedia.org/wiki/Voltage_regulator) is ment to achieve.

## The New Version

#demo
Below is a demo of version `V3.1` of my hexapod robot, which uses the voltage regulator along with some replacement servos. Enjoy!

![youtube](https://www.youtube.com/embed/dVLcFW495Oo)
