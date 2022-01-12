import React, { Component } from 'react';
import GetInTouch from '../components/GetInTouch';
import useParallax from '../lib/useParallax';
import Marked from '../components/Marked';
import Tag from '../components/Tag';

import { Marked as marked } from '../components/Marked.module.css';
import styles from './HomeAbout.module.css';
import HomePinned from './HomePinned';

const HomeAbout = () => {
  const parallaxRef = useParallax((current, value) => {
    value = Math.min(value * 1.5, 1);
    current.style.transform = `translateY(calc(0.5em * ${
      Math.pow(1 - value, 3) * 16
    }))`;
    current.style.opacity = value;
  });

  return (
    <div className={styles.HomeAbout} ref={parallaxRef}>
      <h1 className={marked}>A Bit More About Me</h1>
      <img src="/picture.jpg" alt="author profile picture" />
      <p className={marked}>
        {/*
            programming portfolio examples
            https://www.freecodecamp.org/news/15-web-developer-portfolios-to-inspire-you-137fb1743cae/
            https://www.dejan.works/about/
            https://www.dejan.works/files/Dejan_Markovic_CV.pdf
            */}
        <strong>Problem solving</strong> and <strong>critical thinking</strong>{' '}
        are two of my most prominent skills. I love exploring new hobbies and
        interests to find out where they take me. Despite this, I often become
        unmotivated when not challenged; I can't stand inefficiency. In my
        opinion, coming up with creative ideas isn't sufficient. Acting on them
        and reflecting on the outcome is where the{' '}
        <strong>learning and self-improvement</strong> really take place.
      </p>
      <div className={styles.about}>
        <h2 className={marked}>Background</h2>
        <p className={marked}>
          I am currently a <strong>Computer Science student</strong> at the
          University of Ottawa. I come from the province of Quebec in Canada
          and, due to differences in educational institutions, I was allowed to
          enroll in university one year early. I've always had difficulty
          dealing with the rate at which students are expected to learn, and so
          this leap proved very helpful.
        </p>
        <p className={marked}>
          Even though this seems to be a rarity among university students, I
          view myself as <strong>organized</strong> &mdash; maybe even to the
          point of minimalism. As a few examples,
        </p>
        <ul className={marked}>
          <li>
            My class notes are taken conceptually, which means that they cannot
            possibly become unorganized;
          </li>
          <li>
            I use Notion for time management, which allows me to organize tasks
            and deadlines in a clear and straightforward manner;
          </li>
          <li>
            My tools and supplies are sorted in parts organizers and storage
            cabinets for efficient access;
          </li>
          <li>
            I have a clearly defined folder structure for all my files, allowing
            me to find them quickly.
          </li>
        </ul>
        <p className={marked}>
          One of my long-term goals includes getting to work in a high-paying
          job in the field of <strong>software engineering</strong>. I also want
          to learn to manage money wisely and to take advantage of the
          exponential growth of <strong>long-term investments</strong> through
          compound interest.
        </p>
        <h2 className={marked}>Interests</h2>
        <p className={marked}>
          I am a very <strong>curious and dedicated</strong> person who has
          always loved tinkering in my free time. I taught myself programming at
          the age of 11, and I've since fallen in love with it. Other hobbies
          and interests of mine include playing the piano and the trumpet,
          building and flying FPV drones, 3D design and 3D printing, electronics
          and robotics, and investing. As for languages, I already speak French
          and English fluently and Spanish at an intermediate level, and I am
          currently getting into learning Russian.
        </p>
        <div className={styles.languagesToolsSkills}>
          <div>
            <strong className={marked}>Programming Languages</strong>
            <br />
            <Tag label={'JavaScript'} />
            <Tag label={'HTML'} />
            <Tag label={'CSS'} />
            <Tag label={'C++'} />
            <Tag label={'Python'} />
            <Tag label={'Rust'} />
            <Tag label={'React'} />
            <Tag label={'NextJS'} />
            <Tag label={'NodeJS'} />
            <Tag label={'Express'} />
          </div>
          <div>
            <strong className={marked}>Development Tools</strong>
            <br />
            <Tag label={'Linux'} />
            <Tag label={'Bash'} />
            <Tag label={'Git'} />
            <Tag label={'Github'} />
            <Tag label={'VS Code'} />
            <Tag label={'Vim'} />
          </div>
          <div>
            <strong className={marked}>Other Skills</strong>
            <br />
            <Tag label={'Markdown'} />
            <Tag label={'LaTeX'} />
            <Tag label={'JSON'} />
            <Tag label={'C'} />
            <Tag label={'Notion'} />
            <Tag label={'Fusionn 360'} />
            <Tag label={'Cura'} />
            <Tag label={'Figma'} />
            <Tag label={'Raspberry Pi'} />
            <Tag label={'Assembly'} />
            <Tag label={'Arduino'} />
          </div>
        </div>
      </div>
      <div className={styles.GetInTouch}>
        <GetInTouch />
      </div>
    </div>
  );
};

export default HomeAbout;
