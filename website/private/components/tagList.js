import React, { Component } from 'react';
import tagMap from '../../private/api/tagMap';
import Tag from './tag';

import styles from './tagList.module.css';

class TagList extends Component {
  state = {};
  render() {
    return (
      <div className={styles.TagList}>
        {Object.keys(tagMap).map((label) => (
          <Tag key={label} label={label} active={'off'} />
        ))}
      </div>
    );
  }
}

export default TagList;
