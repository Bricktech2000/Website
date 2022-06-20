import React, { Component } from 'react';

import { useRouter } from 'next/router';

import Button from '../Button';
import { Marked as marked } from '../Marked.module.css';

const Void = (props) => {
  const router = useRouter();
  const { lives } = props;

  return (
    <div
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {lives > 0 ? (
        <p style={{ textAlign: 'center' }}>Looks like you fell into the void</p>
      ) : (
        <React.Fragment>
          <h2 className={marked}>Game Over!</h2>
          <p>You ran out of lives</p>
        </React.Fragment>
      )}
      <div>
        {new Array(3)
          .fill(0)
          .map((_, i) =>
            i < lives ? (
              <i className="fas fa-heart" key={i} />
            ) : (
              <i className="far fa-heart" key={i} />
            )
          )}
      </div>
      <br />
      {lives > 0 ? (
        <Button
          label={'Go Back'}
          blank={false}
          onClick={() => {
            router.replace(router.asPath);
          }}
        />
      ) : (
        <React.Fragment>
          <Button
            label={'Go Home'}
            blank={false}
            onClick={() => {
              router.replace('/');
            }}
          />
          <a
            style={{
              fontSize: '0.66em',
              color: 'var(--color-l)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            onClick={() => router.replace(router.asPath)}
          >
            Go Back Instead
          </a>
        </React.Fragment>
      )}
    </div>
  );
};

export default Void;
