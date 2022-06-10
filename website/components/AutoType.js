import React, { Component, useState, useEffect } from 'react';

import styles from './AutoType.module.css';

const AutoType = (props) => {
  const [string, setString] = useState('');

  useEffect(() => {
    var timeout;
    var currentKeyword = 0;
    var currentLength = 0;
    const update = () => {
      const keyword = props.keywords[currentKeyword];

      if (currentLength >= 2 * (keyword.length + 2)) {
        currentLength = 0;
        currentKeyword++;
        currentKeyword %= props.keywords.length;
        return (timeout = setTimeout(update, 0));
      }

      currentLength++;
      setString(
        keyword.substr(
          0,
          keyword.length - Math.abs(currentLength - keyword.length)
        ) // + '\xa0', //&nbsp;
      );

      return (timeout = setTimeout(
        update,
        100 -
          75 * (currentLength > keyword.length) +
          750 * (currentLength == keyword.length) +
          100 * (currentLength == 0)
      ));
    };

    update();
    return () => {
      clearTimeout(timeout);
    };
  }, [props.keywords]);

  return (
    <div
      className={styles.container}
      style={{
        width:
          props.keywords.reduce((acc, curr) => Math.max(curr.length, acc), 0) +
          3 +
          'ch',
      }}
    >
      {string}
      <div className={styles.cursor}>|</div>
    </div>
  );
};

export default AutoType;
