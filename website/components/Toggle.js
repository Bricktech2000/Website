import React, { Component, useState, useEffect } from 'react';

import styles from './Toggle.module.css';

const Toggle = (props) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  return (
    <div
      onClick={props.onClick.bind(null, [active, setActive.bind(this)])}
      className={styles.Toggle + ' ' + (active ? styles.active : '')}
    >
      <div className={styles.child}>
        <div className={styles.thumb}></div>
      </div>
    </div>
  );
};

export default Toggle;
