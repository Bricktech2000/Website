import React, { Component } from 'react';
import SkillsGraph from './SkillsGraph';

import styles from './Skills.module.css';
import { Marked as marked } from '../Marked.module.css';

const Skills = () => {
  return (
    <div className={styles.Skills}>
      <a className={marked} name="skills" style={{ fontSize: 0 }} />
      <h1 className={marked}>Skills</h1>
      <SkillsGraph />
      {/* TODO: remove */}
      {/* <img
        className={styles.graph}
        src="skills-graph-placeholder.png"
        alt="skills graph placeholder"
      /> */}
    </div>
  );
};

export default Skills;
