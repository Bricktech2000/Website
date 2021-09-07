import React, { Component } from 'react';
import GetInTouch from '../components/GetInTouch';
import useParallax from '../lib/useParallax';

import styles from './HomeAbout.module.css';
import { Marked as marked } from '../components/Marked.module.css';

const HomeAbout = () => {
  const parallaxRef = useParallax((current, value) => {
    value = Math.min(value * 1.5, 1);
    current.style.transform = `translateY(calc(0.5em * ${Math.pow(
      1 - value,
      3
    ) * 16}))`;
    current.style.opacity = value;
  });

  return (
    <div className={styles.HomeAbout} ref={parallaxRef}>
      <h1 className={marked}>A Bit More About Me</h1>
      <img src="/icon.png" alt="author profile picture" />
      <p>
        {/*
            programming portfolio examples
            https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/
            https://www.dejan.works/about/
            https://www.dejan.works/files/Dejan_Markovic_CV.pdf
            */}
        Problem solving and critical thinking are two of my most prominent
        skills. I love exploring new hobbies and interests to find out where
        they take me. Despite this, I often become unmotivated when not
        challenged; I can't stand inefficiency. In my opinion, coming up with
        creative ideas isn't sufficient. Acting on them and reflecting on the
        outcome is where the learning and self-improvement really take place.
      </p>
      <div className={styles.GetInTouch}>
        <GetInTouch />
      </div>
    </div>
  );
};

export default HomeAbout;
