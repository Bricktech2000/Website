export default async function getPostInfo(id) {
  //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  if (!process.browser) return {};

  return await (
    await fetch('/api/dbGet/', {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
  ).json();
}
