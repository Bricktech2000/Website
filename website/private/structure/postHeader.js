import React, { Component } from 'react';
import Tag from '../components/tag';
import Date from '../components/date';
import Button from '../components/button';
import Marked from '../components/marked';
import Loading from '../components/loading';

import styles from './postHeader.module.css';

class PostHeader extends Component {
  render() {
    return (
      <header className={styles.Header}>
        <img src={'/' + this.props.info.id + '/index.jpg'} alt="" />
        <div className={styles['markup-h1'] + ' markup-h1' + ' fade-right-1'}>
          {this.props.info.title}
        </div>
        <p className={'fade-right-2'}>
          <Marked source={this.props.info.desc} />
        </p>
        <div className={styles.tags + ' fade-right-3'}>
          <Date date={this.props.info.date} />
          {this.props.info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className={styles.buttons + ' fade-right-3'}>
          {Object.keys(this.props.info.btns).map((key) => {
            var href = this.props.info.btns[key].replace(/^:/, '');
            return (
              <Button
                key={key}
                label={key}
                blank={this.props.info.btns[key].match(/^:/)}
                href={
                  href.match(/^[\.#]/)
                    ? '/' + this.props.info.id + '/' + href
                    : href
                }
              />
            );
          })}
        </div>
      </header>
    );
  }
}

export default PostHeader;
