import React, { Component } from 'react';
import Button from '../Button';

import styles from './ErrorMain.module.css';
import { Marked as marked } from '../Marked.module.css';

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
const ErrorMain = (props) => {
  return (
    <div className={styles.ErrorMain}>
      <div />
      <h1 className={styles.imageColumn}>{props.info.id}</h1>
      <div className={styles.textColumn}>
        <h1 className={marked}>{props.info.title}</h1>
        <p>{props.info.desc}</p>
        <div className={styles.buttons}>
          {Object.keys(props.info.btns).map((key) => {
            let href = props.info.btns[key];
            return (
              <Button key={key} href={href}>
                {key}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ErrorMain;
