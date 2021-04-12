import React, { Component } from 'react';
import Tag from './tag';
import Link from 'next/link';

import styles from './card.module.css';

class Card extends Component {
  state = {};

  render() {
    if (this.props.empty) {
      //return ...;
    }
    var Card2 = React.forwardRef(({ onClick, href }, ref) => (
      <a
        className={styles.card + ' ' + styles.nor + ' ' + styles.row}
        style={{ width: '30%' }}
        href={href}
        onClick={onClick}
      >
        <img src={'/' + this.props.info.id + '/thumbnail.jpg'} alt="" />
        <div
          className={styles.title + ' ' + styles['markup-h2'] + ' markup-h2'}
        >
          {this.props.info.title}
        </div>
        <div className={styles.desc}>{this.props.info.desc}</div>
        <div className={styles.tags}>
          {this.props.info.tags.map((tag) => (
            <Tag key={tag} label={tag} type={'auto'} mini={true} />
          ))}
        </div>
      </a>
    ));
    return (
      <Link href={'/' + this.props.id}>
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
