import React, { Component } from 'react';
import { useRouter } from 'next/router';

import styles from './Nav.module.css';

const Nav = () => {
  const router = useRouter();

  //https://stackoverflow.com/questions/57946028/issue-with-window-object-on-a-functional-react-component
  //https://nextjs.org/docs/api-reference/next/router
  return (
    <div
      className={styles.Nav}
      onClick={() =>
        typeof window !== 'undefined' && window.history.length <= 2
          ? router.push('/')
          : router.back()
      }
    >
      <i class="fa fa-4x fa-angle-double-left"></i>
    </div>
  );
};

export default Nav;
