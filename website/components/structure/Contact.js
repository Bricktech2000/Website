import React, { Component } from 'react';
import Marked from '../Marked';
import GameOfLife from '../GameOfLife';

import styles from './Contact.module.css';
import { Marked as marked } from '../Marked.module.css';
import { social } from '../../records/consts';

const Contact = () => {
  return (
    <div className={styles.Contact}>
      <a className={marked} name="contact" style={{ fontSize: 0 }} />
      <h1 className={marked}>Get in Touch!</h1>

      <div className={styles.row}>
        <Marked
          source={`
If you have **any questions** about this website or any other project, or if you just want to say hi, [my inbox](mailto:${social.mail}) is always open. For the people who find e-mail a bit outdated, there are [other ways to contact me](https://edgie.emilien.ca/).

I am currently looking for my **first internship as a software engineer** and am open to anything that will challenge me and allow me to learn new skills and grow as a person. If that sounds promising, let's [get in touch](https://edgie.emilien.ca/)!

\`\`\`rust
let job_type = match opinion {
  "boring"       => None,
  "impressive"   => Some(Job::Internship),
  "breathtaking" => Some(Job::FullTime),
}
\`\`\`
          `}
        />
        {/* <GameOfLife size={32} /> */}
      </div>
    </div>
  );
};

export default Contact;
