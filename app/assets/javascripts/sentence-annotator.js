import React from "react";

class Word extends React.Component {
  render() {
    return <div className="word-annotator row">
      <div className="here-word double-row medium-2 columns">{this.props.word}</div>
      <div className="medium-8 columns">
        <div className="row">
          <div className="part-of-speech medium-4 columns">part of speech</div>
          <div className="dictionary-form dict medium-4 columns">dictionary form</div>
          <div className="here-form medium-4 columns">here form</div>
        </div>
        <div className="row">
          <div className="dictionary-meanings dict medium-12 columns">dictionary meaning</div>
        </div>
      </div>
      <div className="here-meaning double-row medium-2 columns">here meaning</div>
    </div>;
  }
}

export default class SentenceAnnotator extends React.Component {
  render() {
    return <div className="sentence-annotator">{this.props.sentence.words.map((w,i) => <Word key={i} word={w.word} />)}</div>
  }
}
