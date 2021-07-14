import React, { Component } from 'react';
import tagMap from '../lib/tagMap';

import styles from './Tag.module.css';

class Tag extends Component {
  state = {};
  render() {
    var tagClassType = styles[tagMap[this.props.label]];
    var tagLabel = this.props.label;
    var tagActive = this.props.active;

    tagActive = tagActive ? 'on' : 'off';
    var tagClassActive = styles[tagActive];
    return (
      <div className={styles.Tag + ' ' + tagClassType + ' ' + tagClassActive}>
        {tagLabel}
      </div>
    );
  }
}

export default Tag;
