const scrollToHash = () => {
  // hacky, but seems to be the easiest way to scroll to location.hash
  const anchor = document.createElement('a');
  anchor.href = window.location.hash;
  window.location.hash !== '' && anchor.click();
};

export default scrollToHash;
