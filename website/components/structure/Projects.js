import React, { Component } from 'react';
import ProjectsPinned from './ProjectsPinned';
import ProjectsLatest from './ProjectsLatest';
import ToggleSubscribe from '../ToggleSubscribe';

import styles from './Projects.module.css';
import { Marked as marked } from '../Marked.module.css';

const Projects = () => {
  return (
    <div className={styles.Projects}>
      <a className={marked} name="projects" style={{ fontSize: 0 }} />
      <h1 className={marked}>Personal Projects</h1>
      <h2 className={marked}>Pinned Projects</h2>
      <ProjectsPinned />
      <h2 className={marked}>Latest Projects</h2>
      <ToggleSubscribe /> <br />
      <ProjectsLatest />
    </div>
  );
};

export default Projects;
