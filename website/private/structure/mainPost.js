import React, { Component } from 'react';
import getPostInfo from '../api/getPostInfo';
import databaseSearch from '../api/databaseSearch';
import MosaicSmall from '../components/mosaicSmall';
import Card from '../components/card';
import Loading from '../components/loading';

import styles from './mainPost.module.css';

class MainPost extends Component {
  state = { id: null };

  async componentDidMount() {
    this.componentDidUpdate();
  }
  async componentDidUpdate() {
    if (this.state.id == this.props.id) return;
    this.setState({ id: this.props.id });

    this.setState({
      text: await (await fetch('/' + this.props.id + '/index.md')).text(),
      ids: await databaseSearch({
        opr: 'like',
        tags: (await getPostInfo(this.props.id)).tags,
        excl: this.props.id,
        max: 4,
      }),
    });
  }

  render() {
    if (this.state.text === undefined || this.state.ids === undefined)
      return <Loading height="1000vh" />;

    //https://stackoverflow.com/questions/39758136/render-html-string-as-real-html-in-a-react-component
    //https://marked.js.org/using_advanced
    //https://stackoverflow.com/questions/5319754/cross-reference-named-anchor-in-markdown
    //https://forum.freecodecamp.org/t/links-rendered-by-marked-js-open-in-new-tab-markdown-previewer-project/197250/4
    //https://github.com/highlightjs/highlight.js/
    return (
      <React.Fragment>
        <p
          className={styles['marked'] + ' marked'}
          dangerouslySetInnerHTML={{
            __html: marked(
              this.state.text.replace(
                /\n#([^ #][^\n]+)/g,
                (a, b) => `\n<a name="${b}"></a>`
              ),
              {
                sanitize: false,
                highlight: function (code, lang) {
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
                      /~([^~]{1,4})~/g,
                      (a, b) => `<span class="hljs-operator">${b}</span>`
                    );
                  return va;
                },
              }
            )
              .replace(/<a/g, '<a target="_blank rel="noreferer"')
              .replace(
                /<img src="(.*)" alt="video">/g,
                (a, b) =>
                  `<video autoplay muted loop><source src="${b}"></video>`
              )
              .replace(
                /<img src="(.*)" alt="youtube">/g,
                (a, b) =>
                  `<div class="iframe"><iframe width="560" height="315" src="${b}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`
              ),
          }}
        ></p>
        <h1 className="markup-h1">Related Posts</h1>
        <br />
        <br />
        <MosaicSmall>
          {this.state.ids.map((id) => (
            <Card key={id} info={getPostInfo(id)} />
          ))}
        </MosaicSmall>
      </React.Fragment>
    );
  }
}

export default MainPost;
