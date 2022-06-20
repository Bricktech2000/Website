import React, { Component } from 'react';

import { useRouter } from 'next/router';

import Button from '../Button';
import { Marked as marked } from '../Marked.module.css';

const Secret = (props) => {
  const router = useRouter();

  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={props.actual ? 'fade-right-3' : ''}
    >
      {props.actual ? (
        <React.Fragment>
          <p className={marked}>
            The wise know secrets
            <br />
            often hide deeper truths
          </p>
          <Button
            label={'Claim Prize'}
            blank={false}
            onClick={() => {
              router.replace('/');
            }}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2 className={marked}>You should not be here</h2>
          <p className={marked}>It looks like you found a secret</p>
          <Button
            label={'Go Home'}
            blank={false}
            onClick={() => {
              router.replace('/');
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default Secret;
