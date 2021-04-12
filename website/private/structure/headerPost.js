import React, { Component } from 'react';
import Tag from '../components/tag';
import Button from '../components/button';
import Loading from '../components/loading';

import styles from './headerPost.module.css';

class HeaderPost extends Component {
  state = {};

  async componentDidMount() {
    this.setState(await this.props.info);
  }

  render() {
    if (this.state.id === undefined)
      return (
        <header className={styles.Header}>
          <Loading />
        </header>
      );

    return (
      <header className={styles.Header}>
        <img src={'/' + this.state.id + '/index.jpg'} alt="" />
        <div className={styles['markup-h1'] + ' markup-h1'}>
          {this.state.title}
        </div>
        <p>{this.state.desc}</p>
        <div className="tags">
          {this.state.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
        <div className="btns">
          {Object.keys(this.state.btns).map((key) => {
            var href = this.state.btns[key].replace(/^:/, '');
            return (
              <Button
                key={key}
                label={key}
                blank={this.state.btns[key].match(/^:/)}
                href={
                  href.match(/^[\.#]/) ? '/' + this.state.id + '/' + href : href
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
