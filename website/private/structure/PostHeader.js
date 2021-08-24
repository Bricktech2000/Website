import React, { Component } from 'react';
import Tag from '../components/Tag';
import Date from '../components/Date';
import Button from '../components/Button';
import Marked from '../components/Marked';
import Loading from '../components/Loading';
import Card from '../components/Card';
import MosaicMini from '../components/MosaicMini';

import styles from './PostHeader.module.css';
import useDbGet from '../lib/useDbGet';

const PostHeader = (props) => {
  var info = null;
  if (props.info.parent) info = useDbGet('child', props.info.parent);

  if (typeof info === 'undefined') return <Loading height="1000vh" />;

  return (
    <header className={styles.PostHeader}>
      {props.info.parent && (
        <div className={styles.PostParentHeader}>
          <MosaicMini>
            {Object.keys(info).map((id) => (
              <Card
                key={id}
                info={{ ...info[id], type: props.info.id == id ? 'blog' : '' }}
              />
            ))}
          </MosaicMini>
        </div>
      )}
      <div className={styles.PostDataHeader}>
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
