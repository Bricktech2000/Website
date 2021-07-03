import React, { Component } from 'react';
import Tag from '../components/tag';
import Date from '../components/date';
import Button from '../components/button';
import Marked from '../components/marked';
import Loading from '../components/loading';

import styles from './headerPost.module.css';

class HeaderPost extends Component {
  state = { info: null };

  async componentDidMount() {
    this.componentDidUpdate();
  }

  async componentDidUpdate() {
    if (this.state.info == (await this.props.info)) return;
    this.setState({ info: await this.props.info });
  }

  render() {
    if (this.state.info === undefined || this.state.info === null)
      return (
        <header className={styles.Header}>
          <Loading />
        </header>
      );

    return (
      <header className={styles.Header}>
        <img src={'/' + this.state.info.id + '/index.jpg'} alt="" />
        <div className={styles['markup-h1'] + ' markup-h1' + ' fade-right-1'}>
          {this.state.info.title}
        </div>
        <p className={'fade-right-2'}>
          <Marked source={this.state.info.desc} />
        </p>
        <div className={styles.tags + ' fade-right-3'}>
          <Date date={this.state.info.date} />
          {this.state.info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className={styles.buttons + ' fade-right-3'}>
          {Object.keys(this.state.info.btns).map((key) => {
            var href = this.state.info.btns[key].replace(/^:/, '');
            return (
              <Button
                key={key}
                label={key}
                blank={this.state.info.btns[key].match(/^:/)}
                href={
                  href.match(/^[\.#]/)
                    ? '/' + this.state.info.id + '/' + href
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

export default HeaderPost;
