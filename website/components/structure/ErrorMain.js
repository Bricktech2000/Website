import React, { Component } from 'react';
import Button from '../Button';

import styles from './ErrorMain.module.css';
import { Marked as marked } from '../Marked.module.css';

import errorMap from '../../records/errorMap';
import Loading from '../Loading';
import useDbGet from '../../hooks/useDbGet';

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
const ErrorMain = (props) => {
  var { status } = props ?? '400';

  const isError = errorMap.includes(status);
  if (!isError) status = '400';

  const info = useDbGet('exact', status);

  const loading = info === undefined || info[status] === undefined;

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading height="1000vh" />
      ) : (
        <React.Fragment>
          <div />
          <h1 className={styles.header + ' fade-right-3'}>{info[status].id}</h1>
          <div className={styles.content}>
            <h1 className={marked + ' fade-right-1'}>{info[status].title}</h1>
            <p className={'fade-right-2'}>{info[status].desc}</p>
            <div className={styles.buttons + ' fade-right-3'}>
              {Object.keys(info[status].btns).map((key) => {
                var href = info[status].btns[key];
                return (
                  <Button key={key} label={key} blank={false} href={href} />
                );
              })}
            </div>
          </div>
          <div />
        </React.Fragment>
      )}
    </div>
  );
};

export default ErrorMain;
