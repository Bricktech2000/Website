import React, { Component, useEffect, useState, useRef } from 'react';
import Void from './Void.js';

import styles from './MapGrid.module.css';
import { useRouter } from 'next/router.js';

const MapGrid = (props) => {
  const children = props.children.filter((child) => child !== ' ');
  const router = useRouter();
  const [dragPosition, setDragPosition] = useState([0, 0]);
  const [lives, setLives] = useState(3);

  const mapgridStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 100vw)`,
    gridTemplateRows: `repeat(${props.size[1]}, 100vh)`,
    transform: `translate(calc(${-props.position[0] * 100}vw + ${
      dragPosition[0]
    }px), calc(${-props.position[1] * 100}vh + ${dragPosition[1]}px))`,
  };

  const minimapStyle = {
    gridTemplateColumns: `repeat(${props.size[0]}, 2em)`,
    gridTemplateRows: `repeat(${props.size[1]}, 2em)`,
    // 2.25 includes grid gap
    transform: `translate(${-props.position[0] * 2.25}em, ${
      -props.position[1] * 2.25
    }em)`,
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
          (prePosDelta[0] > 0 &&
            e
              .composedPath()
              .every((elem) => !elem.scrollLeft || elem.scrollLeft == 0)) ||
          (prePosDelta[0] < 0 &&
            e
              .composedPath()
              .slice(0, e.composedPath().indexOf(mapgridRef.current) - 1)
              .every(
                (elem) =>
                  elem.scrollLeft === undefined ||
                  elem.scrollLeft == elem.scrollWidth - elem.clientWidth
              ))
        )
          posDelta = [prePosDelta[0], 0];
        else posInitial = [posCurrent[0], posCurrent[1]];
      }

      if (isHorizontal == false) {
        if (
          (prePosDelta[1] > 0 &&
            e
              .composedPath()
              .every((elem) => !elem.scrollTop || elem.scrollTop == 0)) ||
          (prePosDelta[1] < 0 &&
            e
              .composedPath()
              .slice(0, e.composedPath().indexOf(mapgridRef.current) - 1)
              .every(
                (elem) =>
                  elem.scrollTop === undefined ||
                  // -1 below seems to fix a bug on mobile Edge
                  elem.scrollTop >= elem.scrollHeight - elem.clientHeight - 1
              ))
        )
          posDelta = [0, prePosDelta[1]];
        else posInitial = [posCurrent[0], posCurrent[1]];
      }
      setDragPosition(posDelta);
    };

    const touchEnd = (e) => {
      const threshold = (window.outerHeight + window.outerWidth) / 2 / 10;

      mapgridRef.current.children[0].style.transition = null;

      // https://stackoverflow.com/questions/23253976/how-to-properly-wait-for-browser-reflow-repaint-to-finish

      window.requestAnimationFrame(async () => {
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

        setDragPosition([0, 0]);
      });
    };

    var scrollIntegral = [0, 0];
    var scrollEndTimeout = null;
    const wheelHandler = (e) => {
      scrollIntegral[0] -= e.deltaX / 5;
      scrollIntegral[1] -= e.deltaY / 5;

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
      scrollEndTimeout = window.setTimeout(touchEnd, 50);
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

  // useEffect(() => {
  //   const initialPosition = [
  //     props.position[0] * mapgridRef.current.clientWidth,
  //     props.position[1] * mapgridRef.current.clientHeight,
  //   ];
  //   var finalPosition = null;
  //   mapgridRef.current.scrollTo({
  //     top: initialPosition[1],
  //     left: initialPosition[0],
  //   });

  //   const scrollStartHandler = (e) => {
  //     finalPosition = null;
  //   };

  //   // var currentPosition = initialPosition;
  //   const scrollHandler = (e) => {
  //     if (
  //       finalPosition !== null &&
  //       (finalPosition.top != mapgridRef.current.scrollTop ||
  //         finalPosition.left != mapgridRef.current.scrollLeft)
  //     )
  //       mapgridRef.current.scrollTo(finalPosition);

  //     //   currentPosition = [
  //     //     mapgridRef.current.scrollLeft,
  //     //     mapgridRef.current.scrollTop,
  //     // ];
  //   };

  //   const scrollEndHandler = (e) => {
  //     finalPosition = {
  //       top: mapgridRef.current.scrollTop,
  //       left: mapgridRef.current.scrollLeft,
  //     };

  //     props.onPositionChange([
  //       Math.round(
  //         mapgridRef.current.scrollLeft / mapgridRef.current.clientWidth
  //       ),
  //       Math.round(
  //         mapgridRef.current.scrollTop / mapgridRef.current.clientHeight
  //       ),
  //     ]);
  //   };

  //   window.addEventListener('touchstart', scrollStartHandler);
  //   mapgridRef.current.addEventListener('scroll', scrollHandler);
  //   window.addEventListener('touchend', scrollEndHandler);
  //   return () => {
  //     // mapgridRef.current.removeEventListener('scroll', scrollHandler);
  //     window.removeEventListener('touchend', scrollEndHandler);
  //   };
  // }, [props]);

  // useEffect(() => {
  //   const touchStart = (e) => {
  //     console.log('touchstart');
  //   };

  //   const touchMove = (e) => {
  //     console.log('touchmove');
  //   };

  //   const touchEnd = (e) => {
  //     console.log('touchend');
  //   };

  //   window.addEventListener('touchstart', touchStart, { passive: false });
  //   window.addEventListener('touchmove', touchMove, { passive: false });
  //   window.addEventListener('touchend', touchEnd, { passive: false });

  //   return () => {
  //     window.removeEventListener('touchstart', touchStart);
  //     window.removeEventListener('touchmove', touchMove);
  //     window.removeEventListener('touchend', touchEnd);
  //   };
  // }, [props]);

  useEffect(() => {
    if (
      children[props.position[0] + props.position[1] * props.size[0]] === null
    )
      setLives(--lives);

    if (lives == -1) setLives(2);
  }, [props.position]);

  return (
    <div className={styles.MapGrid}>
      <div className={styles.mapgridContainer} ref={mapgridRef}>
        <div className={styles.mapgrid} style={mapgridStyle}>
          {children.map((child, i) =>
            child == null ? <Void lives={lives} key={i} /> : child
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
