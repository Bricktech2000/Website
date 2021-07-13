import React, { Component } from 'react';
import marked from '../../public/marked.min.js';
import hljs from '../../public/highlight.min.js';

class Marked extends Component {
  state = {};

  getMarkdown(text) {
    //https://stackoverflow.com/questions/39758136/render-html-string-as-real-html-in-a-react-component
    //https://marked.js.org/using_advanced
    //https://stackoverflow.com/questions/5319754/cross-reference-named-anchor-in-markdown
    //https://forum.freecodecamp.org/t/links-rendered-by-marked-js-open-in-new-tab-markdown-previewer-project/197250/4
    //https://github.com/highlightjs/highlight.js/
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
