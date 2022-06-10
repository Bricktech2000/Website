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
    linkRef.current.addEventListener('touchstart', touchStartHandler);
    linkRef.current.addEventListener('mouseenter', touchStartHandler);
    linkRef.current.addEventListener('mouseleave', touchEndHandler);
  });
  useEffect(() => {
    document.body.addEventListener('touchend', touchEndHandler);
    return () => document.body.removeEventListener('touchend', touchEndHandler);
  }, []);

  const CardHtml = React.forwardRef((props2, ref) => (
    <a ref={linkRef} className={styles.card} {...props2}>
      <img
        src={'/' + props.info.id + '/index.jpg'}
        alt={props.info.title + ' thumbnail image'}
      />
      <div className={styles.title}>
        <h2 className={marked}>{props.info.title}</h2>
      </div>
      <div className={styles.popupContainer}>
        <div className={styles.popup}>
          <div className={styles.desc}>
            <Marked source={props.info.desc} />
          </div>
          <div className={styles.tags}>
            <Date date={props.info.date} className={styles.date} />
            {props.info.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
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
