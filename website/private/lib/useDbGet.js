import React, { Component, useEffect, useState } from 'react';
import dbGet from './dbGet';

const useDbGet = (type, id) => {
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    (async () => {
      updateInfo(await dbGet(type, id));
    })();
  }, [type, id]);

  return info;
};

export default useDbGet;
