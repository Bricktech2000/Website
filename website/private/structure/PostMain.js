import React, { Component, useEffect } from 'react';
import Marked from '../components/Marked';
import useParallax from '../lib/useParallax';
import Loading from '../components/Loading';
import Card from '../components/Card';

import styles from './PostMain.module.css';
import useDbGet from '../lib/useDbGet';

const PostMain = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${(value - 0.25) *
      -20}))`;
    current.style.opacity = Math.max(value * 2 - 0.5, 0);
  });

  //https://stackoverflow.com/questions/9757625/jquery-how-to-scroll-to-certain-anchor-div-on-page-load
  //https://stackoverflow.com/questions/13905435/javascript-getting-specific-element-of-parent-by-name
  useEffect(() => {
    // const anchor = parallaxRef.current.querySelector(
    //   `[name='${window.location.hash.substring(1)}']`
    // );
    // anchor && anchor.scrollIntoView(true);

    //hacky, but seems to be the easiest way to scroll to location.hash
    setTimeout(() => {
      const anchor = document.createElement('a');
      anchor.href = window.location.hash;
      window.location.hash !== '' && anchor.click();
    }, 0);
  }, [props.info.source, window.location.hash]);

  // var childrenInfo = [];
  // if (props.info.children) childrenInfo = useDbGet('child', props.info.id);

  // if (typeof childrenInfo === 'undefined') return <Loading height="1000vh" />;

  return (
    // <React.Fragment>
    //   {Object.keys(childrenInfo).map((id) => (
    //     <Card key={id} info={childrenInfo[id]} />
    //   ))}
    <div ref={parallaxRef} className={styles.PostMain}>
      <Marked source={props.info.source} />
    </div>
    // </React.Fragment>
  );
};

export default PostMain;
