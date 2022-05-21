//https://nextjs.org/docs/basic-features/data-fetching
import { promises as fs } from 'fs';
import postMap from '../../private/lib/postMap';
import pinnedMap from '../../private/lib/pinnedMap';

export default async function dbGet(req, res) {
  //https://nextjs.org/docs/api-routes/dynamic-api-routes
  //https://nextjs.org/docs/api-routes/response-helpers
  const { type, id } = JSON.parse(req.body);
  var response = {};

  switch (type) {
    case 'exact':
      response[id] = await getSafe(id);
      break;
    case 'like':
      const info = await getSafe(id);
      var output = {};
      for (var id2 of postMap) {
        output[id2] = await getSafe(id2);

        //https://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
        output[id2].score = output[id2].tags.filter((value) =>
          info.tags.includes(value)
        ).length;
      }

      delete output[id]; //ignore the current post
      //https://stackoverflow.com/questions/11792158/optimized-javascript-code-to-find-3-largest-element-and-its-indexes-in-array
      //https://stackoverflow.com/questions/1069666/sorting-object-property-by-values

      response = Object.fromEntries(
        Object.entries(output).sort(([, a], [, b]) => b.score - a.score)
      );
      break;
    case 'all':
      if (typeof id === 'undefined') {
        for (var id2 of postMap) {
          response[id2] = await getSafe(id2);
        }
      } else response[id] = await getSafe('502');
      break;
    case 'pinned':
      if (typeof id === 'undefined') {
        for (var id2 of Object.keys(pinnedMap)) {
          response[id2] = await getSafe(id2);
          response[id2].pinned = pinnedMap[id2];
        }
      } else response[id] = await getSafe('502');
      break;
    default:
      response[id] = await getSafe('502');
      break;
  }

  res.status(200).json(response);
}

async function getRaw(id) {
  const info = JSON.parse(
    await fs.readFile(process.cwd() + '/public/' + id + '/index.json')
  );
  const source = (
    await fs.readFile(process.cwd() + '/public/' + id + '/index.md')
  ).toString();

  return { id, source, ...info };
}

async function get(id) {
  const data = await getRaw(id);

  if (typeof data.children !== 'undefined') {
    data.children = Object.fromEntries(
      await Promise.all(
        data.children.map(async (childId) => [
          childId,
          await getSafe(`${id}/${childId}`),
        ])
      )
    );

    const tag_union = [
      ...new Set([
        ...Object.values(data.children)
          .reverse()
          .map((child) => child.tags)
          .reduce((acc, cur) => acc.concat(cur), []),
      ]),
    ];

    const button_union = Object.values(data.children)
      .reverse()
      .map((child) => child.btns)
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    data.tags = tag_union;
    data.btns = button_union;
  }

  return data;
}

async function getSafe(id) {
  try {
    return await get(id);
  } catch (e) {
    return await get('502');
  }
}
