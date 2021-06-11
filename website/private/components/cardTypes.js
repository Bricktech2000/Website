import React, { Component } from 'react';

import styles from './cardTypes.module.css';
import cardStyles from './card.module.css';

class CardTypes extends Component {
  state = {};
  render() {
    return (
      <div className={styles.container}>
        <fieldset className={styles.fieldset + ' ' + cardStyles.software}>
          <legend>Software</legend>
        </fieldset>
        <fieldset className={styles.fieldset + ' ' + cardStyles.hardware}>
          <legend>Hardware</legend>
        </fieldset>
        <fieldset className={styles.fieldset + ' ' + cardStyles.blog}>
          <legend>Blog</legend>
        </fieldset>
      </div>
    );
  }
}

export default CardTypes;
