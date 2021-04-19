import React, { Component } from 'react';
import Button from '../components/button';

import styles from './mainError.module.css';
import errorTitleMap from '../api/errorTitleMap';
import errorDescMap from '../api/errorDescMap';

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
class MainError extends Component {
  state = {};
  render() {
    return (
      <div className={styles.container}>
        <div />
        <h1 className={styles.header}>{this.props.status}</h1>
        <div className={styles.content}>
          <h1 className="markup-h1">{errorTitleMap[this.props.status]}</h1>
          <p>{errorDescMap[this.props.status]}</p>
          <div className={styles.buttons}>
            <Button href="/" label="Go Home" />
          </div>
        </div>
      </div>
    );
  }
}

export default MainError;
