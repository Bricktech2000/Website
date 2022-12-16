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
If you have **questions or feedback** about this website or any other project, or if you just want to say hi, [my inbox](mailto:${social.mail}) is always open. For the people who find e-mail a bit outdated, there are other ways to [contact me](https://edgie.emilien.ca/).

I am currently employed as a software engineer at [Zeptile Software](https://www.linkedin.com/company/zeptile-software-inc/) and am not actively seeking new job opportunities at this time. With that said, I am always interested in expanding my professional network and connecting with people who can offer valuable insights and learning opportunities. If you'd like to connect, don't hesitate to [reach out](https://edgie.emilien.ca/)!
          `}
        />
        <GameOfLife size={32} />
      </div>
    </div>
  );
};

export default Contact;
