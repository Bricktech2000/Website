import React, { Component } from 'react';
import Button from '../components/Button';

import styles from './ErrorMain.module.css';

//https://www.google.com/search?q=404+error+page&sxsrf=ALeKk02OhUGx_72KKVvWMhcLf36Nj0OOJw:1618849064091&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjOy6Pb2orwAhUKY8AKHcWTCI4Q_AUoAXoECAEQAw&biw=1872&bih=1007#imgrc=pEPgPbeNV1OloM
class ErrorMain extends Component {
  state = {};
  render() {
    //console.log(this.props.info);
    return (
      <div className={styles.container}>
        <div />
        <h1 className={styles.header + ' fade-right-3'}>
          {this.props.info.id}
        </h1>
        <div className={styles.content}>
          <h1 className={'markup-h1' + ' fade-right-1'}>
            {this.props.info.title}
          </h1>
          <p className={'fade-right-2'}>{this.props.info.desc}</p>
          <div className={styles.buttons + ' fade-right-3'}>
            {Object.keys(this.props.info.btns).map((key) => {
              var href = this.props.info.btns[key];
              return <Button key={key} label={key} blank={false} href={href} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorMain;
