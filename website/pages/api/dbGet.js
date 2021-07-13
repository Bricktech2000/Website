//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export default async function dbGet(req, res) {
  //https://nextjs.org/docs/api-routes/dynamic-api-routes
  //https://nextjs.org/docs/api-routes/response-helpers
  var { type, id } = JSON.parse(req.body);
  var response = {};

  switch (type) {
    case 'exact':
      response[id] = await getSafe(id);
      break;
    default:
      response[id] = await getSafe('Post-404');
      break;
  }

  res.status(200).json(response);
}

async function get(id) {
  var info = JSON.parse(
    await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
  );
  var source = await fs.readFile(process.cwd() + '/public/' + id + '/index.md');
  return { id, source, ...info };
}

async function getSafe(id) {
  try {
    return await get(id);
  } catch (e) {
    return await get('Post-404');
  }
}
