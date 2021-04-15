import React, { Component } from 'react';
import Tag from './tag';
import Loading from './loading';
import Link from 'next/link';

import styles from './card.module.css';

class Card extends Component {
  state = { info: null };

  async componentDidMount() {
    this.componentDidUpdate();
  }
  async componentDidUpdate() {
    if (this.state.info == this.props.info) return;
    this.setState({ info: this.props.info });

    this.setState(await this.props.info);
  }

  render() {
    this.direction = this.props.dir ? 'row' : 'col';
    this.inverted = this.props.inv ? 'inv' : 'nor';
    if (this.state.id === undefined) return <Loading height="100vh" />;

    var Card2 = React.forwardRef(({ onClick, href }, ref) => (
      <React.Fragment>
        <a
          className={
            styles.card +
            ' ' +
            styles[this.inverted] +
            ' ' +
            styles[this.direction]
          }
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
      </React.Fragment>
    ));
    return (
      <Link href={'/' + this.state.id}>
        <Card2 />
      </Link>
    );
  }
}

export default Card;
