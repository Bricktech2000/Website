Renderer = {
  render: function(data){
    //settings.log('Rendering...');
    const maxCurrent = 250;
    const maxPower = 3000;
    const maxAngularSpeed = 1500;
    const maxLinearAcceleration = 100;
    var p = settings.padding;
    var w = settings.width - p * 2;
    var h = settings.height - p * 2;
    var ctx = settings.ctx;
    var textPadding = p * 4;
    var sectionPadding = p * (10 / 3);
    var yc = p * 1;

    renderBackground();
    renderJoystick(p, yc, w / 2 - p / 2, w / 2 - p / 2, data.yaw, data.thr);
    renderJoystick(p + w / 2 + p / 2, yc, w / 2 - p / 2, w / 2 - p / 2, data.roll, data.pitch);
    yc += w / 2 + p * 1;
    renderText(p, yc, 'Throttle', settings.font);
    renderText(p + w, yc, Math.round((-data.thr + 1) * 100 / 2) + ' ' + '%', settings.font, 'right');
    yc += textPadding;
    renderProgressBar(p, yc, w, w / 8, 'RSSI', Math.round(data.rssi * 100), 0, 100, '%');
    yc += w / 8 + textPadding + p * 1 + sectionPadding;
    var xc = p * 2;
    var width = 8;
    renderVerticalProgressBar(xc, yc, w / width, w * 3 / 4, 'Sag', '  ' + oneDecimal(data.vmax - data.volts), 0, data.vmax - data.vmin, 'V')
    xc += ((w + p * 2) - (p * 2) * 2 - w / width) / 2;
    renderVerticalProgressBar(xc, yc, w / width, w * 3 / 4, 'Power', '  ' + Math.round(data.volts * data.amps), 0, maxPower, 'W');
    xc += ((w + p * 2) - (p * 2) * 2 - w / width) / 2;
    renderVerticalProgressBar(xc, yc, w / width, w * 3 / 4, 'Curr', Math.round(data.amps), 0, maxCurrent, 'A');
    yc += w * 3 / 4 + textPadding + textPadding + p * 1;
    renderProgressBar(p, yc, w, w / 8, 'Voltage', oneDecimal(data.volts), data.vmin, data.vmax, 'V');
    yc += w / 8 + textPadding + p * 1 + sectionPadding;
    var gyros = Math.hypot(data.gyro0, data.gyro1, data.gyro2);
    renderCircularProgressBar(p, yc, w / 2, w / 8, 'Gyro', Math.round(gyros), 0, maxAngularSpeed, '°/s');
    var accel = Math.hypot(data.acc0, data.acc1, data.acc2);
    renderVerticalProgressBar(w - p * 1 - w / 8, yc, w / 8, w / 2, 'Accel', Math.round(accel), 0, maxLinearAcceleration, 'm/s²');
    yc += w / 8 + textPadding + p * 1;
    yc += w / 8 + textPadding + p * 1 + sectionPadding * 2 / 3;
    var hroll = data.head0
    var hpitch = data.head1;
    var hyaw = data.head2;
    renderHorizon(p, yc, w, w / settings.fpvAspectRatio, hpitch - settings.cameraAngle, hroll);


    function renderRect(x, y, w, h, r, c){
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
      //ctx.stroke();
      ctx.fill();
    }
    function renderCircle(x, y, r, c){
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      //ctx.stroke();
      ctx.fill();
    }
    function renderText(x, y, text, font, align='left', base='top'){
      ctx.font = font;
      ctx.fillStyle = settings.accent;
      //ctx.textBaseline = 'middle';
      ctx.textBaseline = base;
      ctx.textAlign = align;
      ctx.fillText(text, x, y);
    }
    function renderLine(x1, y1, x2, y2, w, c){
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    function renderArc(x, y, r, w, v, c){
      ctx.strokeStyle = c;
      ctx.lineWidth = w;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + v * 2 * Math.PI);
      ctx.stroke();
    }
    function renderJoystick(x, y, w, h, xv, yv){
      var thumbSize = w / 16 + h / 16;
      renderRect(x, y, w, h, settings.borderRadius, settings.background2);
      renderCircle(x + w / 2 + w * xv / 2, y + h / 2 + h * yv / 2, thumbSize, settings.color);
    }
    function renderBackground(){
      renderRect(0, 0, settings.width, settings.height, 0, settings.background);
    }
    function renderProgressBar(x, y, w, h, name, val, min, max, unit = ''){
      var v = Math.min(Math.max(val, min), max); //prevent out of range values
      v = (v - min) / (max - min);
      renderLine(x + h / 2, y + h / 2, x + h / 2 + (w - h), y + h / 2, h, settings.background2);
      renderLine(x + h / 2, y + h / 2, x + h / 2 + (w - h) * v, y + h / 2, h, settings.color);
      if(name){
        renderText(x, y + h + p, name, settings.font);
        renderText(x + w, y + h + p, val + ' ' + unit, settings.font, 'right');
      }
    }
    function renderVerticalProgressBar(x, y, w, h, name, val, min, max, unit = ''){
      var v = Math.min(Math.max(val, min), max); //prevent out of range values
      v = (v - min) / (max - min);
      renderLine(x + w / 2, y + h - w / 2, x + w / 2, y + h - w / 2 - (h - w), w, settings.background2);
      renderLine(x + w / 2, y + h - w / 2, x + w / 2, y + h - w / 2 - (h - w) * v, w, settings.color);
      if(name){
        renderText(x + w / 2, y + h + p, name, settings.font, 'center');
        renderText(x + w / 2, y + h + textPadding, val + ' ' + unit, settings.font, 'center');
      }
    }
    function renderCircularProgressBar(x, y, r, w, name, val, min, max, unit = ''){
      r -= w;
      var v = Math.min(Math.max(val, min), max); //prevent out of range values
      v = (v - min) / (max - min);
      renderArc(x + r / 2 + w / 2, y + r / 2 + w / 2, r / 2, w, 1, settings.background2);
      renderArc(x + r / 2 + w / 2, y + r / 2 + w / 2, r / 2, w, v, settings.color);
      if(name){
        renderText(x + r / 2 + w / 2, y + r + w + p, name, settings.font, 'center');
        renderText(x + r / 2 + w / 2, y + r + w + textPadding, val + ' ' + unit, settings.font, 'center');
      }
    }
    function renderHorizon(x, y, w, h, pv, rv){
      ctx.save();
      pv = pv / settings.cameraFOV; //from -1 to 1
      pv = 2 / (1 + Math.exp(-pv * 1.25)) - 1; //bidirectionnal sigmoid
      pv = pv * h + h / 20; //pixels
      renderRect(x, y, w, h, settings.borderRadius, settings.background2);
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, settings.borderRadius, settings.background2);
      ctx.clip();
      var hypot = w / 2 - p;
      var xo = Math.cos(rv / 360 * 2 * Math.PI) * hypot;
      var yo = Math.sin(rv / 360 * 2 * Math.PI) * hypot;
      renderLine(x + w / 2 - xo, y + h / 2 - yo - pv, x + w / 2 + xo, y + h / 2 + yo - pv, w / 32);
      ctx.restore();
    }
    function oneDecimal(number){
      //https://stackoverflow.com/questions/4435170/how-to-parse-float-with-two-decimal-places-in-javascript
      return number.toFixed(1);
    }
  }
}
