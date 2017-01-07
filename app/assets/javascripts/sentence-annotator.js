import React from "react";

class AnnoInput extends React.Component {
  constructor(props) {
    super(props);
    this.anno = props.anno;
    this.state = {value: this.anno[this.annoKey()] || ""};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    this.anno[this.annoKey()] = event.target.value;
  }
  render() {
    return <input
      type="text"
      placeholder={this.placeholder()}
      value={this.state.value}
      onChange={this.handleChange}
    />;
  }
}

class PartOfSpeech extends AnnoInput {
  placeholder() {
    return "part of speech";
  }
  annoKey() {
    return "part_of_speech";
  }
}

class DictionaryForm extends AnnoInput {
  placeholder() {
    return "dictionary form";
  }
  annoKey() {
    return "dictionary_form";
  }
}

class HereForm extends AnnoInput {
  placeholder() {
    return "here form";
  }
  annoKey() {
    return "here_form";
  }
}

class HereMeaning extends AnnoInput {
  placeholder() {
    return "here meaning";
  }
  annoKey() {
    return "here_meaning";
  }
}

class Word extends React.Component {
  constructor(props) {
    props.word.anno = props.word.anno || {};
    super(props);
  }

  render() {
    var anno = this.props.word.anno;

    return <div className="word-annotator row">
      <div className="here-word double-row medium-2 columns">{this.props.word.word}</div>
      <div className="medium-8 columns">
        <div className="row">
          <div className="part-of-speech medium-3 columns"><PartOfSpeech anno={anno}/></div>
          <div className="dictionary-form dict medium-4 columns"><DictionaryForm anno={anno}/></div>
          <div className="here-form medium-5 columns"><HereForm anno={anno}/></div>
        </div>
        <div className="row">
          <div className="dictionary-meanings dict medium-12 columns">dictionary meaning</div>
        </div>
      </div>
      <div className="here-meaning double-row medium-2 columns"><HereMeaning anno={anno}/></div>
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
