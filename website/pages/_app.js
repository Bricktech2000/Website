import '../styles/code.css';
import '../styles/globals.css';
import '../styles/fade-animation.css';
//https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
//https://stackoverflow.com/questions/42522233/react-fontawesome-not-displaying-icons
//https://stackoverflow.com/questions/26867795/font-awesome-is-not-showing-icon
//https://stackoverflow.com/questions/52455614/install-font-awesome-5-with-npm (for discord logo)
import '@fortawesome/fontawesome-free/css/all.css';

import React, { Component, useEffect } from 'react';
import scrollToHash from '../hooks/scrollToHash';

function App({ Component, pageProps }) {
  useEffect(scrollToHash, []);
  return <Component {...pageProps} />;
}

export default App;
