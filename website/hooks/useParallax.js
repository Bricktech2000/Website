import React, { Component, useEffect, useRef } from 'react';

const useParallax = (callback, constrain = true) => {
  const parallaxRef = useRef(null);

  const scrollHandler = () => {
    if (!parallaxRef.current) return;
    let percentage =
      1 -
      parallaxRef.current.getBoundingClientRect().top /
        document.documentElement.clientHeight;
    if (constrain) percentage = Math.min(Math.max(percentage, 0), 1);

    callback(parallaxRef.current, percentage);
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    scrollHandler();
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return parallaxRef;
};

export default useParallax;
