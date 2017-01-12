import React from "react";
import { autoSave } from "auto-save";
import { docText } from "doc-text";
import Autocomplete from  "react-autocomplete";
import SuggestionSource from "suggestion-source";

class AnnoInput extends React.Component {
  constructor(props) {
    super(props);
    this.anno = props.word.anno;
    this.state = {value: this.anno[this.annoKey()] || ""};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({value: value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    let source = this.props.suggestionSource;
    let context = this.props.word;
    return (
        <Autocomplete
          value={this.state.value}
          inputProps={{placeholder: this.placeholder(), type: "text"}}
          items={source.suggestions(context)}
          getItemValue={(item) => item}
          shouldItemRender={(suggestion, currentInput) =>
            source.shouldRenderSuggestion(suggestion, currentInput, context)}
          sortItems={(a,b,currentInput) => source.compareSuggestions(a,b,currentInput, context)}
          onChange={(event, value) => this.handleChange(value)}
          onSelect={value => this.handleChange(value)}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? {background: "#ffff99"} : {}}
              key={item}
            >{item}</div>
          )}
        />
    );
  }
}
AnnoInput.propTypes = {
  word: React.PropTypes.object.isRequired,
  wordKey: React.PropTypes.string.isRequired,
  suggestionSource: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
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
    this.state = { word: props.word };
    this.updateAnno = this.updateAnno.bind(this);
  }
  updateAnno(key, value) {
    let anno = { anno: {[key]: value} };
    let word = $.extend(true, {}, this.state.word, {anno});
    this.setState({word});
    autoSave.updateWord(this.props.wordKey, anno);
  }
  render() {
    var word = this.state.word;
    var wordKey = this.props.wordKey;

    return <div className="word-annotator row">
      <div className="here-word double-row medium-3 columns">{this.props.word.word}</div>
      <div className="medium-6 columns">
        <div className="row">
          <div className="part-of-speech medium-3 columns">
            <PartOfSpeech
              word={word}
              wordKey={wordKey}
              suggestionSource={docText.suggestions.partOfSpeech}
              onChange={(value) => {this.updateAnno("part_of_speech", value)}}
            />
          </div>
          <div className="dictionary-form dict medium-4 columns">
            <DictionaryForm
              word={word}
              wordKey={wordKey}
              suggestionSource={docText.suggestions.dictionaryForm}
              onChange={(value) => {this.updateAnno("dictionary_form", value)}}
            />
          </div>
          <div className="here-form medium-5 columns">
            <HereForm
              word={word}
              wordKey={wordKey}
              suggestionSource={docText.suggestions.hereForm}
              onChange={(value) => {this.updateAnno("here_form", value)}}
            />
          </div>
        </div>
        <div className="row">
          <div className="dictionary-meanings dict medium-12 columns">...</div>
        </div>
      </div>
      <div className="here-meaning double-row medium-3 columns">
        <HereMeaning
          word={word}
          wordKey={wordKey}
          suggestionSource={docText.suggestions.hereMeaning}
          onChange={(value) => {this.updateAnno("here_meaning", value)}}
        />
      </div>
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
