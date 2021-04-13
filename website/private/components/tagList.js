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
          scroll={this.props.scroll}
        />
        {Object.keys(tagMap).map((label) => (
          <Tag
            key={label}
            label={label}
            active={(this.props.actives || []).includes(label)}
            scroll={this.props.scroll}
          />
        ))}
      </div>
    );
  }
}

export default TagList;
