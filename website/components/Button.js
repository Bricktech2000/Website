import React, { Component } from 'react';
import Link from 'next/link';

import styles from './Button.module.css';

const Button = (props) => {
  const getIcon = () => {
    const icons = {
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
      if (props.children.includes(icon)) return icons[icon];
  };

  const ButtonHtml = React.forwardRef((props2, ref) => (
    <a className={styles['button-container']} {...props2}>
      {props.icon && <img src={'svgs/' + props.icon} />}
      <div
        className={
          styles.button + ' ' + (props.blank ? '' : styles['button-on'])
        }
      >
        {props.children}
      </div>
    </a>
  ));
  ButtonHtml.displayName = 'ButtonHtml';

  if (props.onClick) {
    return React.cloneElement(<ButtonHtml />, {
      onClick: props.onClick,
    });
  }
  if (props.blank) {
    return React.cloneElement(<ButtonHtml />, {
      href: props.href,
      target: '_blank',
      rel: 'noreferer',
    });
  }
  return (
    <Link href={props.href} passHref>
      <ButtonHtml />
    </Link>
  );
};

export default Button;
