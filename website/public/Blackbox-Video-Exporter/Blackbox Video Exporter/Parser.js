Parser = {
  parse: async function(text){
    var headerMapBlackbox = {
      'time': val => ({key: 'time', val: val}),
      'rcCommand[0]': val => ({key: 'roll', val: val / 256 / 2}),
      'rcCommand[1]': val => ({key: 'pitch', val: val / 256 / 2}),
      'rcCommand[2]': val => ({key: 'yaw', val: val / 256 / 2}),
      'rcCommand[3]': val => ({key: 'thr', val: -val / 1000 * 2 + 3}),
      'rssi': val => ({key: 'rssi', val: val / 1000}),
      'vbatLatest': val => ({key: 'volts', val: val / 100}),
      'amperageLatest': val => ({key: 'amps', val: val / 100}),
      'gyroADC[0]': val => ({key: 'gyro0', val: val}),
      'gyroADC[1]': val => ({key: 'gyro1', val: val}),
      'gyroADC[2]': val => ({key: 'gyro2', val: val}),
      'accSmooth[0]': val => ({key: 'acc0', val: val / 208.78597766}),
      'accSmooth[1]': val => ({key: 'acc1', val: val / 208.78597766}),
      'accSmooth[2]': val => ({key: 'acc2', val: val / 208.78597766}),
      'heading[0]': val => ({key: 'head0', val: val / 2 / Math.PI * 360}),
      'heading[1]': val => ({key: 'head1', val: val / 2 / Math.PI * 360}),
      'heading[2]': val => ({key: 'head2', val: val / 2 / Math.PI * 360}),
    };
    var headerStartBlackbox = 'loopIteration';
    var headerMapTethered = {
      'timestamp': val => ({key: 'time', val: val * 1000}),
      'RC0': val => ({key: 'roll', val: (val - 1000) / 500 - 1}),
      'RC1': val => ({key: 'pitch', val: -(val - 1000) / 500 + 1}),
      'RC2': val => ({key: 'yaw', val: (val - 1000) / 500 - 1}),
      'RC3': val => ({key: 'thr', val: -(val - 1000) / 500 + 1}),
      'rssi': val => ({key: 'rssi', val: val / 1000}),
      'voltage': val => ({key: 'volts', val: val}),
      'amperage': val => ({key: 'amps', val: val}),
      'gyroscopeX': val => ({key: 'gyro0', val: val / 10}),
      'gyroscopeY': val => ({key: 'gyro1', val: val / 10}),
      'gyroscopeZ': val => ({key: 'gyro2', val: val / 10}),
      'accelerometerX': val => ({key: 'acc0', val: val / 208.78597766 * 1000}),
      'accelerometerY': val => ({key: 'acc1', val: val / 208.78597766 * 1000}),
      'accelerometerZ': val => ({key: 'acc2', val: val / 208.78597766 * 1000}),
      'kinematicsX': val => ({key: 'head0', val: -val}),
      'kinematicsY': val => ({key: 'head1', val: val}),
      'kinematicsZ': val => ({key: 'head2', val: val}),
    };
    var headerStartTethered = 'timestamp';
    if(text.startsWith('timestamp')) return await Parser._parse(text, headerMapTethered, headerStartTethered);
    else return await Parser._parse(text, headerMapBlackbox, headerStartBlackbox);
  },
  _parse: async function(text, headerMap, headerStart){
    settings.log('Parsing...');
    await sleep(1);
    var dataHeader;
    var obj = CSVParser.parse(text, function(obj, arr){
      if(arr[0] == headerStart){
        dataHeader = arr;
        obj.data = [];
        var cells = Math.round((obj.vbatref / 100) / (obj.vbatmaxcellvoltage / 100)) || 0;
        var vmax = (obj.vbatmaxcellvoltage / 100) * cells || 5;
        var vmin = (obj.vbatmincellvoltage / 100) * cells || 0;
        obj.vmax = vmax;
        obj.cells = cells;
        obj.vmin = vmin;
        return;
      }
      if(dataHeader){
        item = {};
        for(var h = 0; h < dataHeader.length; h++){
          var mapped = headerMap[dataHeader[h]];
          mapped = mapped && mapped(arr[h]);
          if(mapped) item[mapped.key] = mapped.val;
        }
        if(arr[0] != '') obj.data.push(item);
      }else obj[arr[0]] = arr[1]; //arr.slice(1);
    });
    //console.log(text);
    return obj;
  }
}
