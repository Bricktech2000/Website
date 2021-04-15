export default async function getPostInfo(params) {
  //see getPostInfo
  return await (
    await fetch('/api/databaseSearch', {
      method: 'POST',
      body: JSON.stringify({ params: params }),
    })
  ).json();
}
