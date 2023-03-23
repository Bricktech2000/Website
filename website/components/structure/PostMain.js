import React, { Component, useEffect } from 'react';
import PostSubHeader from './PostSubHeader';
import Marked from '../Marked';
import useParallax from '../../hooks/useParallax';
import scrollToHash from '../../hooks/scrollToHash';

import styles from './PostMain.module.css';

const PostMain = (props) => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.25) * -16
    }))`;
  });

  // https://stackoverflow.com/questions/9757625/jquery-how-to-scroll-to-certain-anchor-div-on-page-load
  // https://stackoverflow.com/questions/13905435/javascript-getting-specific-element-of-parent-by-name
  useEffect(scrollToHash, [props.info.source]);

  return (
    <div ref={parallaxRef} className={styles.PostMain}>
      {typeof props.info.children !== 'undefined' &&
        Object.values(props.info.children).map((child) => (
          <>
            <div className={styles.spacer}></div>
            <PostSubHeader info={child} />
            <Marked source={child.source} />
          </>
        ))}
      <Marked source={props.info.source} />
    </div>
  );
};

export default PostMain;
