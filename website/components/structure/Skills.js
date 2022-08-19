import React, { Component } from 'react';

import styles from './Skills.module.css';
import { Marked as marked } from '../Marked.module.css';

const Skills = () => {
  return (
    <div className={styles.Skills}>
      <h1 className={marked}>Skills</h1>
      {/* TODO: */}
      <div className={styles.graph} />
    </div>
  );
};

export default Skills;
