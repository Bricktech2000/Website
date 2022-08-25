import React, { Component } from 'react';
import Marked from '../Marked';
import GameOfLife from '../GameOfLife';

import styles from './Contact.module.css';
import { Marked as marked } from '../Marked.module.css';

const Contact = () => {
  return (
    <div className={styles.Contact}>
      <a className={marked} name="contact" style={{ fontSize: 0 }} />
      <h1 className={marked}>Get in Touch!</h1>

      <div className={styles.row}>
        <Marked
          source={`

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
nunc et mi **consequat** porta a vel neque. Etiam dictum, elit a
elementum malesuada, sem [tortor commodo tortor](#), vitae pellentesque
turpis magna nec diam.

Nunc sed mi augue. Proin egestas tellus elit. Sed tincidunt eleifend
metus vel efficitur. Fusce **sollicitudin**, diam sit amet **sollicitudin
euismod**, ligula lorem porttitor nisl, vel lacinia leo lorem ut
ipsum.
      `}
        />
        <GameOfLife size={32} />
      </div>
    </div>
  );
};

export default Contact;
