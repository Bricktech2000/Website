import React, { Component, useEffect, useState } from 'react';
import dbGet from './dbGet';

const useDbGet = (type, id) => {
  //https://stackoverflow.com/questions/53819864/how-to-async-await-in-react-render-function
  const [info, updateInfo] = useState();
  useEffect(() => {
    //https://youtu.be/f687hBjwFcM?t=1876
    updateInfo((info) => info);
    (async () => {
      updateInfo(await dbGet(type, id));
    })();
  }, [id]);

  return info;
};

export default useDbGet;
