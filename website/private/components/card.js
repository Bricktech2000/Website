import React, { Component } from 'react';
import Tag from './tag';
import Loading from './loading';
import Link from 'next/link';

import styles from './card.module.css';

class Card extends Component {
  state = { info: null };

  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  async componentDidMount() {
    this.setState({ dir: this.props.dir });
    this.componentDidUpdate();
  }
  async componentDidUpdate() {
    //css media query parent width
    //https://stackoverflow.com/questions/12251750/can-media-queries-resize-based-on-a-div-element-instead-of-the-screen
    //https://reactjs.org/docs/refs-and-the-dom.html
    //https://stackoverflow.com/questions/55204205/a-way-to-count-columns-in-a-responsive-grid
    //https://stackoverflow.com/questions/36209432/how-to-dynamically-add-a-class-to-manual-class-nameshttps://stackoverflow.com/questions/36209432/how-to-dynamically-add-a-class-to-manual-class-namesS
    //https://stackoverflow.com/questions/6492683/how-to-detect-divs-dimension-changed
    var node = this.ref.current;
    if (node !== null) {
      new ResizeObserver(() => {
        if (node.parentNode === null) return;
        var parentGridWidth = window
          .getComputedStyle(node.parentNode)
          .getPropertyValue('grid-template-columns')
          .replace(' 0px', '')
          .split(' ').length;

        if (this.lastParentGridWidth == parentGridWidth) return;
        this.lastParentGridWidth = parentGridWidth;

        if (parentGridWidth == 1) this.setState({ dir: 1 });
        else this.setState({ dir: this.props.dir });
      }).observe(node.parentNode);
    }

    if (this.state.info == this.props.info) return;
    this.setState({ info: this.props.info });

    this.setState(await this.props.info);
  }

  render() {
    var direction = this.state.dir ? 'row' : 'col';
    var inverted = this.props.inv ? 'inv' : 'nor';
    if (this.state.id === undefined) return <Loading height="100vh" />;

    var Card2 = React.forwardRef(({ onClick, href }, ref) => (
      <React.Fragment>
        <a
          ref={this.ref}
          className={
            styles.card + ' ' + styles[inverted] + ' ' + styles[direction]
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
