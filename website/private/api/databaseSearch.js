export default async function getPostInfo(params) {
  //see getPostInfo
  if (!process.browser) return [];

  return await (
    await fetch('/api/databaseSearch/', {
      method: 'POST',
      body: JSON.stringify({ params: params }),
    })
  ).json();
}
