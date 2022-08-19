import React, { Component } from 'react';
import Marked from '../Marked';

import ProjectsPinned from './ProjectsPinned';
import ProjectsAll from './ProjectsAll';

import styles from './Projects.module.css';

const Projects = () => {
  return (
    <div className={styles.Projects}>
      <Marked source="# Projects" />
      <Marked source="## Pinned" />
      <ProjectsPinned />
      <Marked source="## All" />
      <ProjectsAll />
    </div>
  );
};

export default Projects;
