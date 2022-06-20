import React, { Component, useEffect, useState, useRef } from 'react';
import Void from './Void';

import styles from './MapGrid.module.css';

const MapGrid = (props) => {
  const children = props.children.filter((child) => child !== ' ');
  const [dragPosition, setDragPosition] = useState([0, 0]);
  const [lives, setLives] = useState(5);

  const mapgridStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, var(--screenWidth))`,
    gridTemplateRows: `repeat(${props.size[1]}, var(--screenHeight))`,
    transform: `translate(calc(${-props.position[0]} * var(--screenWidth) + ${
      dragPosition[0]
    }px), calc(${-props.position[1]} * var(--screenHeight) + ${
      dragPosition[1]
    }px))`,
  };

  const minimapStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 2em)`,
    gridTemplateRows: `repeat(${props.size[1]}, 2em)`,
    // 2.25 includes grid gap
    transform: `translate(${-props.position[0] * 2.25}em, ${
      -props.position[1] * 2.25
    }em)`,
  };

  const mapgridRef = useRef();

  useEffect(() => {
    // https://www.cssscript.com/draggable-touch-slider-carousel/
    var posInitial = null;
    var posDelta = [0, 0];
    var isHorizontal = null;

    const touchMove = (e) => {
      e.stopPropagation();

      const threshold = 20;
      mapgridRef.current.children[0].style.transition = 'none';

      if (
        children[props.position[0] + props.position[1] * props.size[0]] === null
      )
        return;

      const posCurrent = [e.touches[0].clientX, e.touches[0].clientY];
      if (posInitial === null) posInitial = [posCurrent[0], posCurrent[1]];
      const prePosDelta = [
        posCurrent[0] - posInitial[0],
        posCurrent[1] - posInitial[1],
      ];

      if (
        (Math.abs(prePosDelta[0]) > threshold ||
          Math.abs(prePosDelta[1]) > threshold) &&
        isHorizontal === null
      ) {
        isHorizontal = Math.abs(prePosDelta[0]) > Math.abs(prePosDelta[1]);
      }

      // https://stackoverflow.com/questions/39245488/event-path-is-undefined-running-in-firefox
      if (isHorizontal == true) {
        if (
          (posCurrent[0] - posInitial[0] >= 0 &&
            e
              .composedPath()
              .every((elem) => !elem.scrollLeft || elem.scrollLeft <= 2)) ||
          (posCurrent[0] - posInitial[0] <= 0 &&
            e
              .composedPath()
              .slice(0, e.composedPath().indexOf(mapgridRef.current) - 1)
              .every(
                (elem) =>
                  elem.scrollLeft === undefined ||
                  elem.scrollLeft >= elem.scrollWidth - elem.clientWidth - 2
              ))
        )
          posDelta = [prePosDelta[0], 0];
        else isHorizontal = -1; // prevent all scrolling
      }

      if (isHorizontal == false) {
        if (
          (prePosDelta[1] >= 0 &&
            e
              .composedPath()
              .every((elem) => !elem.scrollTop || elem.scrollTop <= 2)) ||
          (prePosDelta[1] <= 0 &&
            e
              .composedPath()
              .slice(0, e.composedPath().indexOf(mapgridRef.current) - 1)
              .every(
                (elem) =>
                  elem.scrollTop === undefined ||
                  // -2 below seems to fix a bug on mobile Edge
                  elem.scrollTop >= elem.scrollHeight - elem.clientHeight - 2
              ))
        )
          posDelta = [0, prePosDelta[1]];
        else isHorizontal = -1; // prevent all scrolling
      }

      // ensure the transition has been applied
      setTimeout(() => {
        setDragPosition(posDelta);
      }, 0);
    };

    const touchEnd = async (e) => {
      const threshold = (window.outerHeight + window.outerWidth) / 2 / 10;

      mapgridRef.current.children[0].style.transition = null;

      if (
        Math.abs(posDelta[0]) > threshold ||
        Math.abs(posDelta[1]) > threshold
      ) {
        setTimeout(() => {
          mapgridRef.current.children[0].children[
            props.position[0] + props.position[1] * props.size[0]
          ].scrollTo({
            top: 0,
            left: 0,
          });
        }, 1000 * 0.25);
      }

      if (posDelta[0] > threshold)
        await props.onPositionChange([
          props.position[0] - 1,
          props.position[1],
        ]);
      if (posDelta[0] < -threshold)
        await props.onPositionChange([
          props.position[0] + 1,
          props.position[1],
        ]);
      if (posDelta[1] > threshold)
        await props.onPositionChange([
          props.position[0],
          props.position[1] - 1,
        ]);
      if (posDelta[1] < -threshold)
        await props.onPositionChange([
          props.position[0],
          props.position[1] + 1,
        ]);

      posInitial = null;
      posDelta = [0, 0];
      isHorizontal = null;

      // ensure the transition has been applied
      setTimeout(() => {
        setDragPosition([0, 0]);
      }, 0);
    };

    var scrollIntegral = [0, 0];
    var scrollEndTimeout = null;
    const wheelHandler = (e) => {
      if (e.shiftKey) scrollIntegral[0] -= e.deltaY / 2;
      else scrollIntegral[0] -= e.deltaX / 2;
      if (e.shiftKey) scrollIntegral[1] -= e.deltaX / 2;
      else scrollIntegral[1] -= e.deltaY / 2;

      touchMove({
        touches: [
          {
            clientX: scrollIntegral[0],
            clientY: scrollIntegral[1],
          },
        ],
        stopPropagation: () => {},
        composedPath: e.composedPath.bind(e),
      });

      window.clearTimeout(scrollEndTimeout);
      scrollEndTimeout = window.setTimeout(touchEnd, 100);
    };

    window.addEventListener('touchmove', touchMove);
    window.addEventListener('touchend', touchEnd);
    window.addEventListener('wheel', wheelHandler);

    return () => {
      window.removeEventListener('touchmove', touchMove);
      window.removeEventListener('touchend', touchEnd);
      window.removeEventListener('wheel', wheelHandler);
    };
  }, [props]);

  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  // useEffect(() => {
  //   const resizeHandler = () => {
  //     mapgridRef.current.style.setProperty(
  //       '--screenWidth',
  //       window.innerWidth + 'px'
  //     );
  //     mapgridRef.current.style.setProperty(
  //       '--screenHeight',
  //       window.innerHeight + 'px'
  //     );
  //   };

  //   window.addEventListener('resize', resizeHandler);
  //   // const interval = setInterval(resizeHandler, 100);
  //   return () => {
  //     window.removeEventListener('resize', resizeHandler);
  //     // clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    if (
      children[props.position[0] + props.position[1] * props.size[0]] === null
    )
      setLives((--lives + 5) % 5);
  }, [props.position]);

  return (
    <div className={styles.MapGrid}>
      <div className={styles.mapgridContainer} ref={mapgridRef}>
        <div className={styles.mapgrid} style={mapgridStyle}>
          {children.map((child, i) =>
            child === null ? <Void lives={lives} key={i} /> : child
          )}
        </div>
      </div>
      <div
        className={styles.minimapContainer}
        style={{
          opacity:
            children[props.position[0] + props.position[1] * props.size[0]] ===
            null
              ? '0'
              : null,
        }}
      >
        <div className={styles.minimap} style={minimapStyle}>
          {children.map((child, i) =>
            child === null ? (
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
                onClick={() =>
                  props.onPositionChange([
                    i % props.size[0],
                    Math.floor(i / props.size[0]),
                  ])
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
