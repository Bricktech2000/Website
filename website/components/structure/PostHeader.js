import React, { Component } from 'react';
import Tag from '../Tag';
import Date from '../Date';
import Button from '../Button';
import Marked from '../Marked';

import styles from './PostHeader.module.css';
import { Marked as marked } from '../Marked.module.css';

const PostHeader = (props) => {
  return (
    <header className={styles.PostHeader}>
      <div />
      <div className={styles.imageColumn}>
        <img
          src={'/' + props.info.id + '/index.jpg'}
          alt={props.info.title + ' thumbnail image'}
        />
      </div>
      <div className={styles.textColumn}>
        <h1 className={marked}>{props.info.title}</h1>
        <p>
          <Marked source={props.info.desc} />
        </p>
        <div className={styles.tags}>
          <Date date={props.info.date} />
          {props.info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
      <div />
      <div className={styles.buttons}>
        {Object.keys(props.info.btns).map((key) => {
          var href = props.info.btns[key];
          const blank = !href.match(/^[\.#]/);
          const anchor = !!href.match(/^#/);
          const relative = !!href.match(/^\./);
          if (!blank) href = '/' + props.info.id + '/' + href;
          return (
            <Button key={key} blank={blank} href={href}>
              {anchor && (
                <i
                  className="fas fa-lg fa-play"
                  style={{ transform: 'rotate(90deg)' }}
                />
              )}
              {relative && <i className="fas fa-file" />}
              {!anchor && !relative && (
                <i className="fas fa-lg fa-external-link-alt" />
              )}

              {key}
            </Button>
          );
        })}
      </div>
    </header>
  );
};

export default PostHeader;
