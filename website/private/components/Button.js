import React, { Component } from 'react';
import Link from 'next/link';

import styles from './Button.module.css';

var Button = (props) => {
  var getIcon = () => {
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
      if (props.label.includes(icon)) return icons[icon];
  };

  var render = () => {
    var Html2 = React.forwardRef((props2, ref) => (
      <a
        className={styles['button-container'] + ' lg-hover'}
        href={props2.href}
        onClick={props2.onClick}
        {...props2}
      >
        <div
          className={
            styles.button +
            ' ' +
            (props.href.includes('#') ? styles['button-on'] : '')
          }
        >
          {props.label}
        </div>
      </a>
    ));

    if (props.blank) {
      return React.cloneElement(<Html2 />, {
        href: props.href,
        target: '_blank',
        rel: 'noreferer',
      });
    }
    return (
      <Link href={props.href}>
        <Html2 />
      </Link>
    );
  };
  return render();
};

export default Button;
