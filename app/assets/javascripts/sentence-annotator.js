import React from "react";

class PartOfSpeech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.anno.part_of_speech || ""};
    this.anno = props.anno;
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    this.anno.part_of_speech = event.target.value;
  }
  render() {
    return <input type="text" placeholder="part of speech" value={this.state.value} onChange={this.handleChange}/>;
  }
}

class DictionaryForm extends React.Component {
  render() {
    return <input type="text" placeholder="dictionary form" />;
  }
}

class HereForm extends React.Component {
  render() {
    return <input type="text" placeholder="here form" />;
  }
}

class HereMeaning extends React.Component {
  render() {
    return <input type="text" placeholder="here meaning" />;
  }
}

class Word extends React.Component {
  constructor(props) {
    props.word.anno = props.word.anno || {};
    super(props);
  }

  render() {
    return <div className="word-annotator row">
      <div className="here-word double-row medium-2 columns">{this.props.word.word}</div>
      <div className="medium-8 columns">
        <div className="row">
          <div className="part-of-speech medium-3 columns"><PartOfSpeech anno={this.props.word.anno}/></div>
          <div className="dictionary-form dict medium-4 columns"><DictionaryForm /></div>
          <div className="here-form medium-5 columns"><HereForm/></div>
        </div>
        <div className="row">
          <div className="dictionary-meanings dict medium-12 columns">dictionary meaning</div>
        </div>
      </div>
      <div className="here-meaning double-row medium-2 columns"><HereMeaning/></div>
    </div>;
  }
}

export default class SentenceAnnotator extends React.Component {
  actualWords() {
    return this.props.sentence.words.filter((w) => w.word);
  }

  wordComponents() {
    return this.actualWords().map((w,i) => {
      var key=this.props.sentenceKey + ":" + i;
      return <Word key={key} wordKey={key} word={w}/>
    });
  }

  render() {
    return <div className="sentence-annotator">{this.wordComponents()}</div>
  }
}
