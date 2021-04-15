export default async function getPostInfo(ids) {
  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  return await (
    await fetch('/api/getPostInfo', {
      method: 'POST',
      body: JSON.stringify({ ids: ids }),
    })
  ).json();
}
