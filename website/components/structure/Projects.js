import React, { Component } from 'react';
import ProjectsPinned from './ProjectsPinned';
import ProjectsAll from './ProjectsAll';
import ToggleSubscribe from '../ToggleSubscribe';

import styles from './Projects.module.css';
import { Marked as marked } from '../Marked.module.css';

const Projects = () => {
  return (
    <div className={styles.Projects}>
      <a className={marked} name="projects" style={{ fontSize: 0 }} />
      <h1 className={marked}>Projects</h1>

      <h2 className={marked}>Pinned Projects</h2>
      <ProjectsPinned />
      <h2 className={marked}>All Projects</h2>
      <ToggleSubscribe />
      <ProjectsAll />
    </div>
  );
};

export default Projects;
