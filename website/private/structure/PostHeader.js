import React, { Component } from 'react';
import Tag from '../components/Tag';
import Date from '../components/Date';
import Button from '../components/Button';
import Marked from '../components/Marked';

import styles from './PostHeader.module.css';
import { Marked as marked } from '../components/Marked.module.css';

const PostHeader = (props) => {
  // copied to Card.js
  if (props.info.children !== undefined) {
    const tag_union = [
      ...new Set([
        ...Object.values(props.info.children)
          .reverse()
          .map((child) => child.tags)
          .reduce((acc, cur) => acc.concat(cur), []),
      ]),
    ];

    const button_union = Object.values(props.info.children)
      .reverse()
      .map((child) => child.btns)
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    props.info.tags = tag_union;
    props.info.btns = button_union;
  }

  return (
    <header className={styles.PostHeader}>
      <div className={styles.PostDataHeader}>
        <img
          className={'fade-right-3'}
          src={'/' + props.info.id + '/index.jpg'}
          alt={props.info.title + ' thumbnail image'}
        />
        <h1 className={marked + ' fade-right-1'}>{props.info.title}</h1>
        <p className={'fade-right-2'}>
          <Marked source={props.info.desc} />
        </p>
        <div className={styles.tags + ' fade-right-3'}>
          <Date date={props.info.date} />
          {props.info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className={styles.buttons + ' fade-right-3'}>
          {Object.keys(props.info.btns).map((key) => {
            var href = props.info.btns[key];
            const blank = !href.match(/^[\.#]/);
            if (!blank) href = '/' + props.info.id + '/' + href;
            return <Button key={key} label={key} blank={blank} href={href} />;
          })}
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
