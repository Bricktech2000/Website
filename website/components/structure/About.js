import React, { Component } from 'react';
import Marked from '../Marked';
import useParallax from '../../hooks/useParallax';
import Button from '../Button';

import styles from './About.module.css';
import { Marked as marked } from '../Marked.module.css';
import { social, resume, domain } from '../../records/consts';

const About = () => {
  const parallaxRef = useParallax((current, value) => {
    current.style.transform = `translateY(calc(0.5em * ${
      (value - 0.75) * -16
    }))`;
  });

  return (
    <div className={styles.About} ref={parallaxRef}>
      <a className={marked} name="about" style={{ fontSize: 0 }} />
      <h1 className={marked}>About Me</h1>
      <div className={styles.row}>
        <img src="/picture.jpg" alt="author profile picture" />
        <Marked
          source={`
**Problem-solving** and **critical thinking** are two of my most prominent skills. I love exploring new hobbies and interests to find out where they take me. With that said, I often become unmotivated when not challenged; I can't stand inefficiency. In my opinion, coming up with creative ideas isn't sufficient. Acting on them and reflecting on the outcome is where the **learning and self-improvement** really take place.

I view myself as **organized and highly efficient**, from the way I [take notes](./Conceptual-Note-Taking/) conceptually in Markdown and [organize parts](./Modular-Containers-2-0/) in a modular manner to how I [write code](./Learning-Vim-Key-Bindings/) efficiently using Vim. I generally have **high standards** and strong opinions, which can lead to some friction &mdash; like that one day I got so fed up with math notation I [built my own](https://notes.${domain}/math%20notation/) from scratch. With that said, I enjoy getting my opinions challenged because that's what allows me to improve.

I am **curious, dedicated and independent** &mdash; the three traits that have enabled me to teach myself most of what I know. My interests range from software, hardware and mathematics to psychology, language, finance and business. I also **love to help** people and learn from those with more experience than myself.
          `}
        />
      </div>
      <div className={styles.buttons}>
        <Button blank href={social.github}>
          <i className="fa-lg fab fa-github" />
          GitHub
        </Button>
        <Button blank href={social.linkedin}>
          <i className="fa-lg fab fa-linkedin" />
          LinkedIn
        </Button>
        <Button blank href={resume}>
          <i className="fa-lg fas fa-file-lines" />
          My Resume
        </Button>
      </div>
    </div>
  );
};

export default About;
