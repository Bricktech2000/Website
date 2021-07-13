import React, { Component } from 'react';
import getPostInfo from '../api/getPostInfo';
import databaseSearch from '../api/databaseSearch';
import MosaicSmall from '../components/mosaicSmall';
import Card from '../components/card';
import Marked from '../components/marked';
import Loading from '../components/loading';
import parallax from '../api/parallax';

import styles from './postMain.module.css';

class PostMain extends Component {
  state = { id: null };

  constructor(props) {
    super(props);

    [
      this.componentDidMount2,
      this.componentWillUnmount,
      this.parallaxRef,
    ] = parallax((current, value) => {
      current.style.transform = `translateY(calc(var(--smart-unit) * ${(value -
        0.25) *
        -20}))`;
      current.style.opacity = Math.max(value * 2 - 0.5, 0);
    });
  }

  async componentDidMount() {
    this.componentDidMount2();
    this.componentDidUpdate();
  }
  async componentDidUpdate() {
    if (this.state.id == this.props.id) return;
    this.setState({ id: this.props.id });

    var ids = await databaseSearch({
      opr: 'like',
      tags: (await getPostInfo([this.props.id]))[this.props.id].tags,
      excl: this.props.id,
      max: 4,
    });
    this.setState({
      text: await (await fetch('/' + this.props.id + '/index.md')).text(),
      ids: ids,
      postInfos: await getPostInfo(ids),
    });
  }

  render() {
    return 'PostMain';
    /*
    if (
      this.state.text === undefined ||
      this.state.ids === undefined ||
      this.state.postInfos === undefined
    )
      return <Loading height="1000vh" />;

    return (
      <React.Fragment>
        <div ref={this.parallaxRef} className={styles['marked']}>
          <Marked source={this.state.text} />
        </div>
        <h1 className="markup-h1">Related Posts</h1>
        <br />
        <br />
        <MosaicSmall>
          {this.state.ids.map((id) => (
            <Card key={id} info={this.state.postInfos[id]} />
          ))}
        </MosaicSmall>
      </React.Fragment>
    );*/
  }
}

export default PostMain;
