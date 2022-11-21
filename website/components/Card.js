import React, { Component, useEffect, useRef } from 'react';
import Tag from './Tag';
import Date from './Date';
import Marked from './Marked';
import Link from 'next/link';

import styles from './Card.module.css';
import { Marked as marked } from './Marked.module.css';

const Card = (props) => {
  const linkRef = useRef();

  const touchStartHandler = () => linkRef.current.classList.add(styles.hover);
  const touchEndHandler = () => linkRef.current.classList.remove(styles.hover);

  useEffect(() => {
    touchEndHandler();
    linkRef.current.addEventListener('touchstart', touchStartHandler, {
      passive: true,
    });
    linkRef.current.addEventListener('mouseenter', touchStartHandler, {
      passive: true,
    });
    linkRef.current.addEventListener('mouseleave', touchEndHandler, {
      passive: true,
    });
  });
  useEffect(() => {
    document.body.addEventListener('touchend', touchEndHandler);
    return () => document.body.removeEventListener('touchend', touchEndHandler);
  }, []);

  const CardHtml = React.forwardRef((props2, ref) => (
    <a ref={linkRef} className={styles.Card} {...props2}>
      <img
        src={'/' + props.info.id + '/index.jpg'}
        alt={props.info.title + ' thumbnail image'}
      />
      {props.pinned && (
        <div className={styles.pin}>
          <i className="fas fa-thumbtack"></i>
        </div>
      )}
      <div className={styles.details}>
        <strong className={marked}>{props.info.title}</strong>
        <div className={styles.desc}>
          <Date date={props.info.date} className={styles.date} />
          <Marked source={props.info.desc} />
        </div>
      </div>
    </a>
  ));
  CardHtml.displayName = 'CardHtml';

  return (
    <Link href={'/' + props.info.id} replace={props.mini} passHref>
      <CardHtml />
    </Link>
  );
};

export default Card;
