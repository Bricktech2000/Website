import React, { Component, useEffect } from 'react';
import PostSubHeader from '../structure/PostSubHeader';
import Marked from '../components/Marked';
import useParallax from '../lib/useParallax';

import styles from './PostMain.module.css';

const PostMain = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.25) * -16
    }))`;
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

  return (
    <div ref={parallaxRef} className={styles.PostMain + ' fade-right-3'}>
      {typeof props.info.children !== 'undefined' &&
        Object.values(props.info.children)
          .reverse()
          .map((child) => (
            <React.Fragment key={child.id}>
              <div className={styles.spacer}></div>
              <PostSubHeader info={child} />
              <Marked source={child.source} />
            </React.Fragment>
          ))}
      <Marked source={props.info.source} />
    </div>
  );
};

export default PostMain;
