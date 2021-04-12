import React, { Component } from 'react';

import HTML from '../svgs/015-logo.svg';
import Code from '../svgs/047-coding.svg';
import styles from './footer.module.css';

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className={styles.Footer}>
        <div className="hr"></div>
        <div>
          Icons made by{' '}
          <a
            className="markup-link"
            href="https://www.flaticon.com/authors/dave-gandy"
            target="_blank"
            rel="noreferrer"
            title="Dave Gandy"
          >
            Dave Gandy
          </a>{' '}
          from{' '}
          <a
            className="markup-link"
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noreferrer"
            title="Flaticon"
          >
            www.flaticon.com
          </a>
        </div>
        <div>
          <p>Created with&nbsp;</p>
          <a
            href="https://en.wikipedia.org/wiki/HTML5"
            target="_blank"
            rel="noreferrer"
          >
            <HTML />
          </a>
          &nbsp;
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            <Code />
          </a>
          <p>
            &nbsp;by{' '}
            <a
              className="markup-link"
              href="https://github.com/Bricktech2000/"
              target="_blank"
              rel="noreferrer"
            >
              Emilien Breton
            </a>
          </p>
          <br />
        </div>
        <div>
          <p>
            Copyright <font className="copy">&copy;</font>{' '}
            {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
