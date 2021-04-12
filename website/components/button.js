import React, { Component } from 'react';
import Link from 'next/link';

import styles from './button.module.css';

class Button extends Component {
  state = {};
  getIcon = () => {
    var icons = {
      'Try it!': '018-gamepad',
      Code: '047-coding',
      Demo: '019-play',
      View: '019-play',
      Github: '045-cat',
      List: '022-list',
      Image: '008-document',
      Photo: '008-document',
      Parts: '022-list',
      Settings: '036-cog',
      Update: '048-next',
      Previous: '012-arrow-2',
    };
    for (var icon of Object.keys(icons))
      if (this.props.label.includes(icon)) return icons[icon];
  };

  render() {
    var Html2 = React.forwardRef(({ onClick, href }, ref) => (
      <a
        className={styles['button-container'] + ' lg-hover'}
        href={href}
        onClick={onClick}
      >
        <div
          className={
            styles.button +
            ' ' +
            (this.props.href.startsWith('#') ? 'button-on' : '')
          }
        >
          {this.props.label}
        </div>
      </a>
    ));
    if (this.props.href.startsWith(':')) {
      //return this.props.href.replace(/^:/, '') target="_blank" rel="noreferrer";
    }
    return (
      <Link href={this.props.href}>
        <Html2 />
      </Link>
    );
  }
}

export default Button;
