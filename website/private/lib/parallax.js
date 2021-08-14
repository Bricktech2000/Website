import React, { Component, useEffect, useRef } from 'react';

const parallax = (callback) => {
  const parallaxRef = useRef(null);

  const scrollHandler = () => {
    if (!parallaxRef.current) return;
    var percentage =
      1 -
      parallaxRef.current.getBoundingClientRect().top /
        document.documentElement.clientHeight;
    percentage = Math.min(Math.max(percentage, 0), 1);

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

export default parallax;
