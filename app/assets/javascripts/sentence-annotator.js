import React from "react";

class Word extends React.Component {
  render() {
    return <div className="word-annotator">
      {this.props.word}
    </div>;
  }
}

export default class SentenceAnnotator extends React.Component {
  render() {
    return <div className="sentence-annotator">{this.props.sentence.words.map((w,i) => <Word key={i} word={w.word} />)}</div>
  }
}
