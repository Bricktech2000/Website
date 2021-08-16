import React, { Component } from 'react';
import Tag from '../components/Tag';
import Date from '../components/Date';
import Button from '../components/Button';
import Marked from '../components/Marked';

import styles from './PostHeader.module.css';

const PostHeader = (props) => {
  return (
    <header className={styles.PostHeader}>
      <img
        src={'/' + props.info.id + '/index.jpg'}
        alt={props.info.title + ' thumbnail image'}
      />
      <div className={styles['markup-h1'] + ' markup-h1' + ' fade-right-1'}>
        {props.info.title}
      </div>
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
          const href = props.info.btns[key].replace(/^:/, '');
          return (
            <Button
              key={key}
              label={key}
              blank={props.info.btns[key].match(/^:/)}
              href={
                href.match(/^[\.#]/) ? '/' + props.info.id + '/' + href : href
              }
            />
          );
        })}
      </div>
    </header>
  );
};

export default PostHeader;
