export default function redirect(e) {
  //https://stackoverflow.com/questions/36316846/react-onclick-and-preventdefault-link-refresh-redirect
  //https://stackoverflow.com/questions/42576198/get-object-data-and-target-element-from-onclick-event-in-react-js
  //https://stackoverflow.com/questions/52177765/e-target-calling-wrong-target
  e.preventDefault();
  window.history.replaceState(null, null, e.currentTarget.href);
}
