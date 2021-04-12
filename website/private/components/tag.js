import React, { Component } from 'react';
import Link from 'next/link';
import tagMap from '../api/tagMap';

import styles from './tag.module.css';

class Tag extends Component {
  state = {};
  render() {
    var tagClassType = styles[tagMap[this.props.label]];
    var tagClassMini = this.props.mini ? styles.mini : '';
    var tagLabel = this.props.label;
    var tagActive = this.props.active;

    if (tagActive === undefined) {
      tagActive =
        {
          Blog: 'on',
          Software: 'on',
          Hardware: 'on',
        }[this.props.label] || 'off';
    }
    var tagClassActive = styles[tagActive];
    var tag = (
      <div
        className={
          styles.tag +
          ' ' +
          tagClassType +
          ' ' +
          tagClassMini +
          ' ' +
          tagClassActive
        }
      >
        {tagLabel}
      </div>
    );

    if (this.props.mini) {
      return tag;
    }
    return <Link href={'/' + this.props.label.replace(/ /g, '-')}>{tag}</Link>;
  }
}

export default Tag;
