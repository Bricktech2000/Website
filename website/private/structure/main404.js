import React, { Component } from 'react';
import Button from '../components/button';

import styles from './main404.module.css';

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
class Main404 extends Component {
  state = {};
  render() {
    return (
      <div className={styles.container}>
        <div />
        <h1 className={styles.header}>404</h1>
        <div className={styles.content}>
          <h1 className="markup-h1">Page Not Found</h1>
          <p>
            The page you are looking for doesn't exist or was moved elsewhere.
          </p>
          <div className={styles.buttons}>
            <Button href="/" label="Go Home" />
          </div>
        </div>
      </div>
    );
  }
}

export default Main404;
