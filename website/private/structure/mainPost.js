import React, { Component } from 'react';
import getPostInfo from '../../pages/api/getPostInfo';
import databaseSearch from '../api/databaseSearch';
import MosaicSmall from '../components/mosaicSmall';
import Card from '../components/card';
import Loading from '../components/loading';

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
    return (
      <React.Fragment>
        <p
          className="marked"
          dangerouslySetInnerHTML={{
            __html: marked(
              this.state.text.replace(
                /#([^ #][^\n]+)/g,
                (a, b) => `<a name="${b}"></a>`
              ),
              {
                sanitize: false,
              }
            ).replace(/<a/g, '<a target="_blank rel="noreferer"'),
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
