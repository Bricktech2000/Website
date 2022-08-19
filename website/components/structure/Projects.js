import React, { Component } from 'react';

import ProjectsPinned from './ProjectsPinned';
import ProjectsAll from './ProjectsAll';

import styles from './Projects.module.css';
import { Marked as marked } from '../Marked.module.css';

const Projects = () => {
  return (
    <div className={styles.Projects}>
      <h1 className={marked}>Projects</h1>
      <h2 className={marked}>Pinned</h2>
      <ProjectsPinned />
      <h2 className={marked}>All</h2>
      <ProjectsAll />
    </div>
  );
};

export default Projects;
