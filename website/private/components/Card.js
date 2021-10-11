import React, { Component, useEffect, useState, useRef } from 'react';
import Tag from './Tag';
import Date from './Date';
import Marked from './Marked';
import Link from 'next/link';

import styles from './Card.module.css';
import { Marked as marked } from './Marked.module.css';

const Card = (props) => {
  const linkRef = useRef();
  const [dir, setDir] = useState(props.dir);

  useEffect(() => {
    //css media query parent width
    //https://stackoverflow.com/questions/12251750/can-media-queries-resize-based-on-a-div-element-instead-of-the-screen
    //https://reactjs.org/docs/refs-and-the-dom.html
    //https://stackoverflow.com/questions/55204205/a-way-to-count-columns-in-a-responsive-grid
    //https://stackoverflow.com/questions/36209432/how-to-dynamically-add-a-class-to-manual-class-nameshttps://stackoverflow.com/questions/36209432/how-to-dynamically-add-a-class-to-manual-class-namesS
    //https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
    //https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve
    if (linkRef.current !== null) {
      const observer = new ResizeObserver(() => {
        if (linkRef.current === null || linkRef.current.parentNode === null)
          return;
        const parentGridWidth = window
          .getComputedStyle(linkRef.current.parentNode)
          .getPropertyValue('grid-template-columns')
          .replace(/ ?0px ?/, '')
          .split(' ').length;

        if (parentGridWidth == 1) setDir(1);
        else setDir(props.dir);
      });
      observer.observe(linkRef.current.parentNode);
    }
  }, []);

  const direction = dir ? 'row' : 'col';
  const inverted = props.inv ? 'inv' : 'nor';
  const mini = props.mini ? 'mini' : '';
  const type = props.info.type;

  const CardHtml = React.forwardRef((props2, ref) => (
    <a
      ref={linkRef}
      className={
        styles.card +
        ' ' +
        styles[inverted] +
        ' ' +
        styles[direction] +
        ' ' +
        (styles[type] || '') +
        ' ' +
        (styles[mini] || '')
      }
      {...props2}
    >
      <img
        src={'/' + props.info.id + '/index.jpg'}
        alt={props.info.title + ' thumbnail image'}
      />
      <div className={styles.title}>
        <h2 className={marked}>{props.info.title}</h2>
      </div>
      <div className={styles.desc}>
        <Marked source={props.info.desc} />
      </div>
      <div className={styles.tags}>
        <Date date={props.info.date} className={styles.date} />
        {props.info.tags.map((tag) => (
          <Tag key={tag} label={tag} />
        ))}
      </div>
    </a>
  ));

  return (
    <Link href={'/' + props.info.id} replace={props.mini}>
      <CardHtml href={'/' + props.info.id} />
    </Link>
  );
};

export default Card;
