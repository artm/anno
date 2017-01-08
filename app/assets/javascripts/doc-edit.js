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
    this.loadSentence(this.selectedSentence);
  }

  static setup() {
    $("#edit_container").each(() => new DocEditor());
  }

  loadSentence(sentenceKey) {
    this.selectedSentence = sentenceKey;
    let sentence = docText.sentence(sentenceKey);
    ReactDOM.render(
      <SentenceAnnotator
        sentence={sentence}
        sentenceKey={sentenceKey}
      />, this.annotatorElement);
  }

  onSentenceClicked(sentenceKey) {
    this.loadSentence(sentenceKey);
  }

  saveSetting(newSetting) {
    let key = location.path;
    let settings = JSON.parse(localStorage[key] || "{}");
    $.extend(settings,newSetting);
    localStorage[key] = JSON.stringify(settings);
  }

  getSetting(name, _default = undefined) {
    let key = location.path;
    let settings = JSON.parse(localStorage[key] || "{}");
    return settings[name] || _default;
  }

  get selectedSentence() {
    return this.getSetting("selectedSentence", "0:0");
  }

  set selectedSentence(newValue) {
    this.saveSetting({selectedSentence: newValue});
  }

  setupSplitUI() {
    $(window).on("resize", function() {
      var winHeight = $(window).height();
      var topMenuHeight = $("#top-menu").outerHeight();
      $("#edit_container").outerHeight(winHeight - topMenuHeight - 1);
    });

    let split = Split(["#text_pane", "#anno_pane"], {
      direction: "vertical",
      sizes: this.getSetting("splitSizes", [100,100]),
      onDragEnd: () => {
        this.saveSetting({splitSizes: split.getSizes()});
      }
    });
  }

  setupClicableText() {
    this.clickableTextElement = $("#clickable_text").get(0);
    ReactDOM.render(
      <ClickableText
        paragraphs={docText.paragraphs()}
        onSentenceClicked={(k) => this.onSentenceClicked(k)}
        selectedSentence={this.selectedSentence}
      />, this.clickableTextElement);
  }

  setupSentenceAnnotator() {
    this.annotatorElement = $("#annotations").get(0);
  }
}

$(() => DocEditor.setup());
