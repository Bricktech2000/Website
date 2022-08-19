import React, { Component } from 'react';
import Button from '../Button';

import styles from './ErrorMain.module.css';
import { Marked as marked } from '../Marked.module.css';

// TODO: style error page from scratch

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
const ErrorMain = (props) => {
  return (
    <div className={styles.container}>
      <div />
      <h1 className={styles.header + ' fade-right-3'}>{props.info.id}</h1>
      <div className={styles.content}>
        <h1 className={marked}>{props.info.title}</h1>
        <p className={'fade-right-2'}>{props.info.desc}</p>
        <div className={styles.buttons + ' fade-right-3'}>
          {Object.keys(props.info.btns).map((key) => {
            var href = props.info.btns[key];
            return <Button key={key} label={key} blank={false} href={href} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ErrorMain;
