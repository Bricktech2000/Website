//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export default async function dbGet(req, res) {
  //https://nextjs.org/docs/api-routes/dynamic-api-routes
  //https://nextjs.org/docs/api-routes/response-helpers
  var { id } = JSON.parse(req.body);
  var response = {};
  try {
    var info = JSON.parse(
      await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
    );
  } catch (e) {
    var id = 'Post-404';
    var info = JSON.parse(
      await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
    );
  }
  response[id] = { id: id, ...info };
  res.status(200).json(response);
}
