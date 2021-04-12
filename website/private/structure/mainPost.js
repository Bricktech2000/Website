import React, { Component } from 'react';

class MainPost extends Component {
  state = {};

  async componentDidMount() {
    this.setState({
      text: await (await fetch('/' + this.props.id + '/index.md')).text(),
    });
  }

  render() {
    if (this.state.text === undefined) return '';

    return (
      <React.Fragment>
        <p className="">{this.state.text}</p>
      </React.Fragment>
    );
  }
}

export default MainPost;
