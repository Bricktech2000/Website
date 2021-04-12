import React, { Component } from 'react';
import tagMap from '../../private/api/tagMap';
import Tag from './tag';

import styles from './tagList.module.css';

class TagList extends Component {
  state = {};
  render() {
    return (
      <div className={styles.TagList}>
        <Tag
          key={'All'}
          label={'All'}
          active={(this.props.actives || ['posts']).includes('posts')}
        />
        {Object.keys(tagMap).map((label) => (
          <Tag
            key={label}
            label={label}
            active={(this.props.actives || []).includes(label)}
          />
        ))}
      </div>
    );
  }
}

export default TagList;
