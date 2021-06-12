import React, { Component } from 'react';

export default function parallax(
  [componentDidMount, componentDidUnmount],
  callback
) {
  var parallaxRef = React.createRef();

  var scrollHandler = () => {
    if (!parallaxRef.current) return;
    var percentage =
      1 -
      parallaxRef.current.getBoundingClientRect().top /
        document.documentElement.clientHeight;
    percentage = Math.min(Math.max(percentage, 0), 1);

    callback(parallaxRef.current, percentage);
  };
  var componentDidMount = () => {
    document.addEventListener('scroll', scrollHandler);
  };
  var componentDidUnmount = () => {
    document.removeEventListener('scroll', scrollHandler);
  };

  return [componentDidMount, componentDidUnmount, parallaxRef];
}
