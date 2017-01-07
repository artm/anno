import React from "react";
import ReactDOM from "react-dom";
import Split from "split.js";
import SentenceAnnotator from "sentence-annotator.js";
import { docText } from "doc-text.js"

class Word extends React.Component {
  render() {
    return <span>{this.props.word.pre}<span className="word">{this.props.word.word}</span>{this.props.word.post} </span>;
  }
}

class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.onSentenceClicked = this.onSentenceClicked.bind(this);
  }

  onSentenceClicked() {
    this.props.onSentenceClicked(this.props.sentenceKey);
  }

  render() {
    var skey = this.props.sentenceKey;
    const words = this.props.sentence.words.map((word,i) => {
      let wkey = skey + ":" + i;
      return <Word word={word} key={wkey} wordKey={wkey}/>
    });
    return <span className="sentence" onClick={this.onSentenceClicked}>{words}</span>;
  }
}

class Paragraph extends React.Component {
  constructor(props) {
    super(props);
    this.onSentenceClicked = this.onSentenceClicked.bind(this);
  }

  onSentenceClicked(sentenceKey) {
    this.props.onSentenceClicked(sentenceKey);
  }

  render() {
    var pkey=this.props.paragraphKey;
    const sentences = this.props.sentences.map(
      (sentence,i) => {
        let skey = pkey + ":" + i;
        return <Sentence
                 sentence={sentence}
                 key={skey}
                 sentenceKey={skey}
                 onSentenceClicked={this.onSentenceClicked}
               />;
      });
    return <p>{sentences}</p>;
  }
}

class AnnoText extends React.Component {
  constructor(props) {
    super(props);
    this.onSentenceClicked = this.onSentenceClicked.bind(this);
  }

  onSentenceClicked(sentenceKey) {
    this.props.onSentenceClicked(sentenceKey);
  }

  render() {
    const paragraphs = this.props.paragraphs.map(
      (paragraph,i) =>
        <Paragraph
          sentences={paragraph}
          key={i}
          paragraphKey={i}
          onSentenceClicked={this.onSentenceClicked}
        />);
    return <div>{paragraphs}</div>;
  }
}

class DocEditor {
  constructor() {
    this.setupSplitUI();
    this.setupClicableText();
    this.setupSentenceAnnotator();
    this.onSentenceClicked = this.onSentenceClicked.bind(this);
    this.loadSentence("0:0");
  }

  static setup() {
    $("#edit_container").each(() => new DocEditor());
  }

  loadSentence(sentenceKey) {
    let sentence = docText.sentence(sentenceKey);
    ReactDOM.render(
      <SentenceAnnotator
        sentence={sentence}
        sentenceKey={sentenceKey}
      />, this.annotatorElement);
  }

  onSentenceClicked(sentenceKey) {
    loadSentence(sentenceKey);
  }

  setupSplitUI() {
    $(window).on("resize", function() {
      var winHeight = $(window).height();
      var topMenuHeight = $("#top-menu").outerHeight();
      $("#edit_container").outerHeight(winHeight - topMenuHeight - 1);
    });

    Split(["#text_pane", "#anno_pane"], {
      direction: "vertical",
    });
  }

  setupClicableText() {
    this.clickableTextElement = $("#clickable_text").get(0);
    ReactDOM.render(
      <AnnoText
        paragraphs={docText.paragraphs()}
        onSentenceClicked={this.onSentenceClicked}
      />, this.clickableTextElement);
  }

  setupSentenceAnnotator() {
    this.annotatorElement = $("#annotations").get(0);
  }
}

$(() => DocEditor.setup());
