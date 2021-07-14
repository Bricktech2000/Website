import React, { Component } from 'react';
import Tag from './Tag';
import Date from './Date';
import Loading from './Loading';
import Marked from './Marked';
import Link from 'next/link';

import styles from './Card.module.css';

class Card extends Component {
  state = { info: null };

  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.mounted = false;
  }

  async componentDidMount() {
    this.mounted = true;
    this.setState({ dir: this.props.dir });
    this.componentDidUpdate();
  }
  componentWillUnmount() {
    this.mounted = false;
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
          .replace(/ ?0px ?/, '')
          .split(' ').length;

        if (this.lastParentGridWidth == parentGridWidth) return;
        this.lastParentGridWidth = parentGridWidth;

        if (!this.mounted) return;
        if (parentGridWidth == 1) this.setState({ dir: 1 });
        else this.setState({ dir: this.props.dir });
      }).observe(node.parentNode);
    }

    if (this.state.info == this.props.info) return;
    this.setState({ info: this.props.info });
  }

  render() {
    var direction = this.state.dir ? 'row' : 'col';
    var inverted = this.props.inv ? 'inv' : 'nor';
    if (this.state.info === null) return <Loading height="100vh" />;

    var Card2 = React.forwardRef(({ onClick, href }, ref) => (
      <a
        ref={this.ref}
        className={
          styles.card +
          ' ' +
          styles[inverted] +
          ' ' +
          styles[direction] +
          ' ' +
          styles[this.state.info.type]
        }
        href={href}
        onClick={onClick}
      >
        <img src={'/' + this.state.info.id + '/index.jpg'} alt="" />
        <div
          className={styles.title + ' ' + styles['markup-h2'] + ' markup-h2'}
        >
          {this.state.info.title}
        </div>
        <div className={styles.desc}>
          <Marked source={this.state.info.desc} />
        </div>
        <div className={styles.tags}>
          <Date date={this.state.info.date} />
          {this.state.info.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </a>
    ));
    return (
      <Link href={'/' + this.state.info.id}>
        <Card2 href={'/' + this.state.info.id} />
      </Link>
    );
  }
}

export default Card;
