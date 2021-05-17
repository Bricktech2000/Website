//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';

export default async function getPostInfo(req, res) {
  //https://nextjs.org/docs/api-routes/dynamic-api-routes
  //https://nextjs.org/docs/api-routes/response-helpers
  var { ids } = JSON.parse(req.body);
  var infos = {};
  for (var id of ids) {
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
    infos[id] = { id: id, ...info };
  }
  res.status(200).json(infos);
}
