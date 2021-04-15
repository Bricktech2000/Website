import { promises as fs } from 'fs';
import pageMap from '../../private/api/pageMap';

export default async function databaseSearch(req, res) {
  //see getPostInfo
  //import fetch from 'node-fetch';
  //const fetch = require('node-fetch');
  //https://javascript.info/modules-dynamic-imports

  var { params } = JSON.parse(req.body);
  var { opr, tags, max, excl } = params;

  const maxWords = 10;

  var words;
  if (opr == 'search') {
    query = encodeURIComponent(tags[0].replace(/ /g, '+'));
    //https://www.datamuse.com/api/
    var text = await (
      await fetch('https://api.datamuse.com/words?ml=' + query)
    ).text();
    _words = JSON.parse(text).slice(0, maxWords);
    words = [];
    for (var word of _words) if (word.score >= 40000) words.push(word);
    _words = tags[0].split(' ');
    for (var word of _words) words.push({ word: word, score: 100000 });
  }
  var ids = pageMap;
  var scores = [];
  for (var id of ids) {
    var score = opr == 'and' ? 1 : 0;
    var infoText = await fs.readFile(
      process.cwd() + '/public/' + id + '/index.json'
    );
    var indexText = await fs.readFile(
      process.cwd() + '/public/' + id + '/index.json'
    );
    var info = JSON.parse(infoText);
    for (var paramTag of tags) {
      var match = false;
      for (var infoTag of info.tags) {
        switch (opr) {
          case 'or':
            if (infoTag == paramTag) score = 1;
            break;
          case 'and':
            if (infoTag == paramTag) match = true;
            break;
          case 'like':
            if (infoTag == paramTag) {
              score++;
              match = true;
            }
            break;
          case 'search':
            var str = '';
            str += infoText;
            str += indexText;
            var scr = 0;
            function escapeRegExp(string) {
              return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
            }
            //https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
            for (var word of words)
              scr +=
                ((str.match(new RegExp(escapeRegExp(word.word), 'gi')) || [])
                  .length *
                  Math.pow(word.score, 2)) /
                str.length;
            score += scr;
            break;
        }
      }
      if (opr == 'and' && !match) score = 0;
    }
    //score = tags that match
    //score -= tags that do not match
    if (opr == 'like') score -= tags.length + info.tags.length - score;
    scores.push({ id: id, score: score });
    //yield await include(incl, param);
  }
  var sortedScores = scores.sort(function (element1, element2) {
    if (element1.score == element2.score) return 0;
    else return element1.score < element2.score ? 1 : -1;
  });
  var sortedIds = [];
  var max = max;
  for (var i = 0; i < max && i < sortedScores.length; i++)
    if (
      (excl == 'zero' && sortedScores[i].score == 0) ||
      sortedScores[i].id == excl
    )
      max++;
    else sortedIds.push(sortedScores[i].id);

  res.status(200).json(sortedIds);
}
