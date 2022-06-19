import React, { Component, useEffect, useState } from 'react';
import Void from './Void.js';

import styles from './MapGrid.module.css';
import { useRouter } from 'next/router.js';

const MapGrid = (props) => {
  const children = props.children.filter((child) => child !== ' ');
  const router = useRouter();

  const mapgridStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 100vw)`,
    gridTemplateRows: `repeat(${props.size[1]}, 100vh)`,
    marginLeft: `${-props.position[0] * 100}vw`,
    marginTop: `${-props.position[1] * 100}vh`,
  };

  const minimapStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 2em)`,
    gridTemplateRows: `repeat(${props.size[1]}, 2em)`,
    marginLeft: `${-props.position[0] * 2}em`,
    marginTop: `${-props.position[1] * 2}em`,
  };

  useEffect(() => {
    const callback = (e) => {
      switch (e.key) {
        case 'a':
          router.push('/about');
          break;
        case 'i':
          router.push('/');
          break;
        case 'p':
          router.push('/posts');
          break;
      }
    };

    window.addEventListener('keydown', callback);
    return () => window.removeEventListener('keydown', callback);
  }, []);

  return (
    <div className={styles.MapGrid}>
      <div className={styles.mapgridContainer}>
        <div className={styles.mapgrid} style={mapgridStyle}>
          {children.map((child, i) =>
            child == null ? <Void key={i} /> : child
          )}
        </div>
      </div>
      <div className={styles.minimapContainer}>
        <div className={styles.minimap} style={minimapStyle}>
          {children.map((child, i) =>
            child == null ? (
              <div className={styles.void} key={i} />
            ) : (
              <div
                className={
                  styles.child +
                  ' ' +
                  (i == props.position[0] + props.position[1] * props.size[0]
                    ? styles.selected
                    : null)
                }
                key={i}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MapGrid;
