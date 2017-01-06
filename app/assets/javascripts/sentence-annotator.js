import React from "react";

class Word extends React.Component {
  render() {
    return <div className="word-annotator row">
      <div className="here-word double-row large-2 columns">{this.props.word}</div>
      <div className="large-8 columns">
        <div className="row">
          <div className="part-of-speech large-4 columns">part of speech</div>
          <div className="dictionary-form dict large-4 columns">dictionary form</div>
          <div className="here-form large-4 columns">here form</div>
        </div>
        <div className="row">
          <div className="dictionary-meanings dict large-12 columns">dictionary meaning</div>
        </div>
      </div>
      <div className="here-meaning double-row large-2 columns">here meaning</div>
    </div>;
  }
}

export default class SentenceAnnotator extends React.Component {
  render() {
    return <div className="sentence-annotator">{this.props.sentence.words.map((w,i) => <Word key={i} word={w.word} />)}</div>
  }
}
