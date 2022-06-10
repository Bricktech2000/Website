import React, { Component, useEffect, useState } from 'react';

const dbGet = async (type, id) => {
  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  if (!process.browser) return {};

  return await (
    await fetch('/api/dbGet/', {
      method: 'POST',
      body: JSON.stringify({ type, id }),
    })
  ).json();
};

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
