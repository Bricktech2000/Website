import React, { Component } from 'react';
import tagMap from '../api/tagMap';

import styles from './tag.module.css';

class Tag extends Component {
  state = {};
  render() {
    var tagClassType = styles[tagMap[this.props.label]];
    var tagLabel = this.props.label;
    var tagActive = this.props.active;

    tagActive = tagActive ? 'on' : 'off';
    var tagClassActive = styles[tagActive];
    return (
      <div className={styles.tag + ' ' + tagClassType + ' ' + tagClassActive}>
        {tagLabel}
      </div>
    );
  }
}

export default Tag;
