//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';
import pageMap from '../../private/lib/pageMap';

export default async function dbGet(req, res) {
  //https://nextjs.org/docs/api-routes/dynamic-api-routes
  //https://nextjs.org/docs/api-routes/response-helpers
  var { type, id } = JSON.parse(req.body);
  var response = {};

  switch (type) {
    case 'exact':
      response[id] = await getSafe(id);
      break;
    case 'like':
      var tags = (await getSafe(id)).tags;
      var output = {};
      for (var id2 of pageMap) {
        output[id2] = await getSafe(id2);

        //https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
        output[id2].score = output[id2].tags.filter((value) =>
          tags.includes(value)
        ).length;
      }

      const count = 4;
      delete output[id]; //ignore the current post to find only different similar ones
      //https://stackoverflow.com/questions/11792158/optimized-javascript-code-to-find-3-largest-element-and-its-indexes-in-array
      //https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

      response = Object.fromEntries(
        Object.entries(output)
          .sort(([, a], [, b]) => b.score - a.score)
          .slice(0, count)
      );
      break;
    case 'all':
      if (typeof id === 'undefined') {
        for (var id2 of pageMap) {
          response[id2] = await getSafe(id2);
        }
      } else response[id] = await getSafe('502');
      break;
    default:
      response[id] = await getSafe('502');
      break;
  }

  res.status(200).json(response);
}

async function get(id) {
  var info = JSON.parse(
    await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
  );
  var source = (
    await fs.readFile(process.cwd() + '/public/' + id + '/index.md')
  ).toString();
  return { id, source, ...info };
}

async function getSafe(id) {
  try {
    return await get(id);
  } catch (e) {
    return await get('502');
  }
}
