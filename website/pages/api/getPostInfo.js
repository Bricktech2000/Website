export default async function getPostInfo(id) {
  var res = await fetch('/' + id + '/index.json');
  var info = await res.json();
  return { id: id, ...info };
}
