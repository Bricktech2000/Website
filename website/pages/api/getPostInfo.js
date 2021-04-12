export default async function getPostInfo(id) {
  var res = await fetch('./' + id + '/info.json');
  var info = await res.json();
  return { id: id, ...info };
}
