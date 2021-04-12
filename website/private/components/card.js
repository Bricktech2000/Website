import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import Tag from './tag';
import Link from 'next/link';

import styles from './card.module.css';

class Card extends Component {
  state = {};

  async componentDidMount() {
    this.setState(await this.props.info);
  }

  render() {
    if (this.state.id === undefined) return '';
    if (this.props.empty) {
      //return ...;
    }
    var Card2 = React.forwardRef(({ onClick, href }, ref) => (
      <React.Fragment>
        <a
          className={styles.card + ' ' + styles.nor + ' ' + styles.row}
          style={{ width: '30%' }}
          href={href}
          onClick={onClick}
        >
          <img src={'/' + this.state.id + '/index.jpg'} alt="" />
          <div
            className={styles.title + ' ' + styles['markup-h2'] + ' markup-h2'}
          >
            {this.state.title}
          </div>
          <div className={styles.desc}>{this.state.desc}</div>
          <div className={styles.tags}>
            {this.state.tags.map((tag) => (
              <Tag key={tag} label={tag} mini={true} />
            ))}
          </div>
        </a>
        <Tag key={'Try it Now'} label={'Try it Now'} mini={false} />
      </React.Fragment>
    ));
    return (
      <Link href={'/' + this.state.id}>
        <Card2 />
      </Link>
      /*<<
              if(<<<yield vars.empty>>>) return;
              var card = document.querySelector('.card-<<<yield vars.id>>>');
              var func = () => {
                if(!document.body.contains(card)){
                  window.removeEventListener('resize', func);
                  return;
                }
                var forcePortrait = window.matchMedia('(max-aspect-ratio: 8/7)').matches;
                var dir = forcePortrait ? 'row' : <<<yield JSON.stringify(params.dir)>>>;
                var inv = <<<yield JSON.stringify(params.inv)>>> ? 'inv' : 'nor';
                card.classList.remove('row');
                card.classList.remove('col');
                card.classList.add(dir);
                card.classList.add(inv);
              }
              func();
              window.addEventListener('resize', func);
            >>*/
    );
  }
}

export default Card;
