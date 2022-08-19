import React, { Component } from 'react';
import Marked from '../Marked';

import styles from './Skills.module.css';

const Skills = () => {
  return (
    <div className={styles.Skills}>
      <Marked
        source={`
# Skills

TODO:
        `}
      />
    </div>
  );
};

export default Skills;
