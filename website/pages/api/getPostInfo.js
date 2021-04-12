export default async function getPostInfo(id) {
  var info = await (await fetch('/' + id + '/index.json')).json();
  return { id: id, ...info };
}
