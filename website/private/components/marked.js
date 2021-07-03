import React, { Component } from 'react';

class Marked extends Component {
  state = {};

  getMarkdown(text) {
    return {
      __html: marked(
        text.replace(/\n#([^ #][^\n]+)/g, (a, b) => `\n<a name="${b}"></a>`),
        {
          sanitize: false,
          highlight: function(code, lang) {
            //const hljs = require('highlight.js');
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            var va = hljs
              .highlight(
                code.replace(
                  /[\[\]\+\-=%\?\^\(\)\[\]\!;<>]|<<|>>/g,
                  (a) => `~${a}~`
                ),
                { language }
              )
              .value.replace(
                /<span class="hljs-params">(.*?)<\/span>/g,
                (a, b) => b
              )
              .replace(
                /~([^~]{1,4})~/g,
                (a, b) => `<span class="hljs-operator">${b}</span>`
              );
            return va;
          },
        }
      )
        .replace(/<a/g, '<a target="_blank" rel="noreferer"')
        .replace(
          /<img src="(.*)" alt="video">/g,
          (a, b) => `<video autoplay muted loop><source src="${b}"></video>`
        )
        .replace(
          /<img src="(.*)" alt="youtube">/g,
          (a, b) =>
            `<div class="iframe"><iframe width="560" height="315" src="${b}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
        ),
    };
  }

  render() {
    return (
      <span
        className={'marked'}
        dangerouslySetInnerHTML={this.getMarkdown(this.props.source)}
      ></span>
    );
  }
}

export default Marked;
