import React, { Component, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import styles from './Nav.module.css';

const Nav = () => {
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [rotate, setRotate] = useState(false);

  useEffect(() => {
    const [href, hash] = router.asPath.split('#');
    if (href == '/' && !hash) setDisplay(false);
    else setDisplay(true);

    if (!hash) setRotate(false);
    else setRotate(true);
  }, [router.asPath]);

  // https://stackoverflow.com/questions/57946028/issue-with-window-object-on-a-functional-react-component
  // https://nextjs.org/docs/api-reference/next/router

  return (
    <div
      className={`${styles.Nav} ${display ? styles.display : ''} ${
        rotate ? styles.rotate : ''
      }`}
      onClick={() =>
        window.history.length <= 2 ? router.push('/') : router.back()
      }
    >
      <i className="fas fa-3x fa-play" />
    </div>
  );
};

export default Nav;
