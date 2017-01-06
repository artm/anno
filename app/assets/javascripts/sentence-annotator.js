import React from "react";

export default class SentenceAnnotator extends React.Component {
  render() {
    return <div>{this.props.sentence.words.map((w,i) => <div key={i}>{w.word}</div>)}</div>
  }
}
