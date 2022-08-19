import React, { Component } from 'react';

import styles from './Skills.module.css';
import { Marked as marked } from '../Marked.module.css';

const Skills = () => {
  return (
    <div className={styles.Skills}>
      <a className={marked} name="skills" />
      <h1 className={marked}>Skills</h1>
      {/* TODO: */}
      <img
        className={styles.graph}
        src="skills-graph-placeholder.png"
        alt="skills graph placeholder"
      />
    </div>
  );
};

export default Skills;
