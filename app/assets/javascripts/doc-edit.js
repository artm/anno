import React from "react";
import ReactDOM from "react-dom";
import Split from "split.js";
import SentenceAnnotator from "sentence-annotator.js";
import ClickableText from "clickable-text";
import { docText } from "doc-text.js"

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
      <ClickableText
        paragraphs={docText.paragraphs()}
        onSentenceClicked={this.onSentenceClicked}
      />, this.clickableTextElement);
  }

  setupSentenceAnnotator() {
    this.annotatorElement = $("#annotations").get(0);
  }
}

$(() => DocEditor.setup());
