MiniML 1.0
//Copyright Emilien Breton


What is FPV
-----------

A few weeks ago, I installed an FPV camera to my 5-inch drone.
	""First-person view [...] is a method used to control a radio-controlled vehicle from the driver or pilot's view point. Most commonly it is used to pilot a radio-controlled aircraft or other type of unmanned aerial vehicle.
	{Wikipedia:: https://en.wikipedia.org/wiki/First-person_view_(radio_control)}""
Essentially, the FPV camera on the drone sends live video to VR-like goggles on your head, with a latency ranging from [22 - 35 ms]. Unfortunately, since it is very low, image quality must be sacrificed. Here is an example image from a gopro followed by the image from an FPV camera:


<<<
	var path = '/pages/7TN3D/';
  yield include('../../body/partial/mosaic/img.html', {
    srcs: [
    	path + 'gopro.min.jpg',
	  	path + 'dvr.min.jpg',
    ]
  })
>>>

# parts
On a side note, here is a list of the parts I used to install an FPV system on {my 5-inch drone: ../98772/}:
	* {Foxeer Razer Mini 1/3 CMOS Camera:: https://www.banggood.com/Foxeer-Razer-Mini-13-CMOS-HD-5MP-2_1mm-M12-Lens-1200TVL-43169-NTSCPAL-Switchable-FPV-Camera-For-RC-Drone-p-1578759.html?akmClientCountry=CA&rmmds=cart_middle_products&ID=6269620530498522237&cur_warehouse=USA}
	* {Eachine TX805 5.8GHz RP-SMA Female:: https://www.banggood.com/Eachine-TX805-5_8G-40CH-25-or-200-or-600-or-800mW-FPV-Transmitter-TX-LED-Display-Support-OSD-or-Pitmode-or-Smart-Audio-p-1333984.html?rmmds=search&ID=512671&cur_warehouse=USA}
	* {Realacc RHCP mini Stubby RP-SMA Male:: https://www.banggood.com/Realacc-RHCP-Super-mini-AXII-Stubby-5_8GHz-1_6dBi-Antenna-For-TX-RX-Fatshark-Goggles-p-1221877.html?akmClientCountry=CA&rmmds=cart_middle_products&ID=512670&cur_warehouse=CN}
	* {Eacine EV100 720*540 5.8G 72CH Googles - Black:: https://www.banggood.com/Eachine-EV100-720+540-5_8G-72CH-FPV-Goggles-With-Dual-Antennas-Fan-7_4V-1000mAh-Battery-Case-For-RC-Drone-p-1182469.html?cur_warehouse=CN&ID=6157193&rmmds=search}

As soon as I saw how amazing it was to fly, I immediately ordered an action camera similar to the {Gopro Session:: https://gopro.com/en/us/update/hero_session}, the {Caddx Orca:: https://www.banggood.com/Caddx-Orca-4K-HD-Recording-Mini-FPV-Camera-FOV-160-Degree-WiFi-Anti-Shake-DVR-Action-Cam-for-Outdoor-Photography-RC-Racing-Drone-Airplane-p-1590162.html?cur_warehouse=CN&rmmds=search}, to be able to get high definition footage from the drone. I also designed a [3D-printed] mount and attached it to the drone using zip ties. Here is are some pictures of them:


<<<
  var path = '/pages/7TN3D/';
  yield include('../../body/partial/mosaic/img.html', {
    srcs: [
    	path + 'IMG_20210310_185350_5.min.jpg',
    	path + 'IMG_20210310_185247_8.min.jpg',
    	path + 'IMG_20210310_185720_6.min.jpg',
    	path + 'IMG_20210310_185705_8.min.jpg',
    ]
  })
>>>
//Finally, I created {a special program:: ./Music Offset Generator/index.html} which allows me to fly the drone synchronized to the music. To do so, it plays the music [8 beats] earlier in the left ear, meaning I can predict what the music will sound like.
 

# demo
Demo Footage
------------

Using the [3D-printed] camera mount and the {Caddx Orca:: https://www.banggood.com/Caddx-Orca-4K-HD-Recording-Mini-FPV-Camera-FOV-160-Degree-WiFi-Anti-Shake-DVR-Action-Cam-for-Outdoor-Photography-RC-Racing-Drone-Airplane-p-1590162.html?cur_warehouse=CN&rmmds=search}, I managed to record some pretty awesome footage. Just ignore the two crashes right into snow...
	<div class="iframe-container"><iframe width="560" height="315" src="https:\/\/www.youtube.com\/embed\/KpCdQ5Hc82w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>


Final Words
-----------

I did not think it would be, but it is truly awesome to be able to fly just as if you were in the cockpit of the drone. I will probably post a lot more FPV footage on my {YouTube channel:: https://www.youtube.com/channel/UCGj6pfxZ0XYJU29XNwXPPxg}, so don't forget to check it out!
