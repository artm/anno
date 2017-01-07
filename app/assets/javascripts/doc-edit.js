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
  clicked() {
    ReactDOM.render(
      <SentenceAnnotator sentence={this.props.sentence} sentenceKey={this.props.sentenceKey} />,
      $("#annotations").get(0));
  }

  render() {
    var skey = this.props.sentenceKey;
    const words = this.props.sentence.words.map((word,i) => <Word word={word} key={skey + ":" + i} wordKey={skey + ":" + i} />);
    return <span
      className="sentence"
      onClick={() => this.clicked()}
      >
      {words}
    </span>;
  }
}

class Paragraph extends React.Component {
  render() {
    var pkey=this.props.paragraphKey;
    const sentences = this.props.sentences.map((sentence,i) => <Sentence sentence={sentence} key={pkey + ":" + i} sentenceKey={pkey + ":" + i} />);
    return <p>{sentences}</p>;
  }
}

class AnnoText extends React.Component {
  render() {
    const paragraphs = this.props.paragraphs.map((paragraph,i) => <Paragraph sentences={paragraph} key={i} paragraphKey={i} />);
    return <div>{paragraphs}</div>;
  }
}

class DocEditor {
  constructor() {
    this.setupSplitUI();
    this.setupClicableText();
  }

  static setup() {
    $("#edit_container").each(() => new DocEditor());
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
    ReactDOM.render(
      <AnnoText paragraphs={docText.paragraphs()}/>,
      $("#clickable_text").get(0));
  }
}

$(() => DocEditor.setup());
