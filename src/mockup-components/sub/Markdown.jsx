import React, { Component, PropTypes } from 'react';
import marked from 'marked';

marked.setOptions({
  sanitize: true
});

export default class Markdown extends Component {

  static propTypes = {
    source: PropTypes.string.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.source !== this.props.source;
  }

  render() {
    const html = marked(this.props.source);
    const safeHTML = { // we trust marked output
      __html: html
    };
    return (
      <div dangerouslySetInnerHTML={safeHTML}/>
    );
  }
}
