import '../styles/code.css';
import '../styles/globals.css';
import '../styles/fade-animation.css';
//https://stackoverflow.com/questions/42296499/how-to-display-svg-icons-svg-files-in-ui-using-react-component
//https://stackoverflow.com/questions/42522233/react-fontawesome-not-displaying-icons
//https://stackoverflow.com/questions/26867795/font-awesome-is-not-showing-icon
//https://stackoverflow.com/questions/52455614/install-font-awesome-5-with-npm (for discord logo)
import '@fortawesome/fontawesome-free/css/all.css';

import React, { Component, useEffect } from 'react';
import { useRouter } from 'next/router';

function App({ Component, pageProps }) {
  const router = useRouter();

  // hacky scroll to top when hash is empty
  useEffect(() => {
    if (window.location.hash === '') window.scrollTo(0, 0);
  }, [router.asPath]);

  return <Component {...pageProps} />;
}

export default App;
