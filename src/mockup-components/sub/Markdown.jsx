import React, { Component, PropTypes } from 'react';
import marked from 'marked';

marked.setOptions({
  sanitize: true
});

const defaultRenderer = new marked.Renderer();
const renderedWithoutLinks = new marked.Renderer();
renderedWithoutLinks.link = function (href, title, text) {
  return '<a>' + text + '</a>';
};

export default class Markdown extends Component {

  static propTypes = {
    source: PropTypes.string.isRequired,
    disableLinks: PropTypes.bool
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.source !== this.props.source ||
      nextProps.disableLinks !== this.props.disableLinks
    );
  }

  render() {
    const html = this.markdownToHTML(this.props.source);
    return (
      <div dangerouslySetInnerHTML={html}/>
    );
  }

  markdownToHTML(source) {
    let renderer = defaultRenderer;
    if (this.props.disableLinks) {
      renderer = renderedWithoutLinks;
    }
    const html = marked(this.props.source, { renderer });

    const safeHTML = { // we trust marked output
      __html: html
    };

    return safeHTML;
  };
}
