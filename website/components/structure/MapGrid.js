import React, { Component, useEffect, useState } from 'react';
import Void from './Void.js';

import styles from './MapGrid.module.css';

const MapGrid = (props) => {
  const [position, setPosition] = useState(props.position);
  const children = props.children.filter((child) => child !== ' ');

  const mapgridStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 100vw)`,
    gridTemplateRows: `repeat(${props.size[1]}, 100vh)`,
    marginLeft: `${-position[0] * 100}vw`,
    marginTop: `${-position[1] * 100}vh`,
  };

  const minimapStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 2em)`,
    gridTemplateRows: `repeat(${props.size[1]}, 2em)`,
    marginLeft: `${-position[0] * 2}em`,
    marginTop: `${-position[1] * 2}em`,
  };

  useEffect(() => {
    const callback = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          setPosition((position) => [position[0] - 1, position[1]]);
          break;
        case 'ArrowRight':
          setPosition((position) => [position[0] + 1, position[1]]);
          break;
        case 'ArrowUp':
          setPosition((position) => [position[0], position[1] - 1]);
          break;
        case 'ArrowDown':
          setPosition((position) => [position[0], position[1] + 1]);
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
          {children.map((child) => (child == null ? <Void /> : child))}
        </div>
      </div>
      <div className={styles.minimapContainer}>
        <div className={styles.minimap} style={minimapStyle}>
          {children.map((child, i) =>
            child == null ? (
              <div className={styles.void} />
            ) : (
              <div
                className={
                  styles.child +
                  ' ' +
                  (i == position[0] + position[1] * props.size[0]
                    ? styles.selected
                    : null)
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MapGrid;
