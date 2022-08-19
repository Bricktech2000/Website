import React, { Component } from 'react';
import Marked from '../Marked';

import Button from '../Button';

import styles from './About.module.css';
import { Marked as marked } from '../Marked.module.css';

const About = () => {
  return (
    <div className={styles.About}>
      <h1 className={marked}>About</h1>
      <div className={styles.row}>
        <img src="/picture.jpg" alt="author profile picture" />
        <Marked
          source={`
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
nunc et mi consequat porta a vel neque. Etiam dictum, elit a
elementum malesuada, sem tortor commodo tortor, vitae pellentesque
turpis magna nec diam.

Proin congue orci vitae magna rutrum bibendum. Nulla eleifend non
nisi sed congue. Pellentesque habitant morbi tristique senectus et
netus et malesuada fames ac turpis egestas. Aenean elit turpis,
pellentesque vel ante vitae, rutrum tincidunt nisi. Nunc molestie,
nulla at rhoncus molestie, dolor est gravida sem, a sollicitudin leo
orci sed turpis. Mauris vel ornare nulla, nec efficitur eros. Sed
commodo, odio aliquam pretium blandit, ligula est lacinia eros, sit
amet ullamcorper leo risus sed metus.

Nunc sed mi augue. Proin egestas tellus elit. Sed tincidunt eleifend
metus vel efficitur. Fusce sollicitudin, diam sit amet sollicitudin
euismod, ligula lorem porttitor nisl, vel lacinia leo lorem ut
ipsum.
          
        `}
        />
      </div>
      <div className={styles.buttons}>
        <Button blank={true} href="#TODO:">
          <i className="fa-lg fab fa-github" />
          GitHub
        </Button>
        <Button blank={true} href="#TODO:">
          <i className="fa-lg fas fa-file-lines" />
          Resume
        </Button>
      </div>
    </div>
  );
};

export default About;
