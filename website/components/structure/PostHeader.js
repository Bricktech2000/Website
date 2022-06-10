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
      <div className={styles.PostDataHeader}>
        <img
          src={'/' + props.info.id + '/index.jpg'}
          alt={props.info.title + ' thumbnail image'}
          className={'fade-right-3'}
        />
        <div className={styles.container}>
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
      </div>
    </header>
  );
};

export default PostHeader;
