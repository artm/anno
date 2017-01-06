import React from "react";
import ReactDOM from "react-dom";
import Split from "split.js";

class Word extends React.Component {
  render() {
    return <span>{this.props.word.pre}<span className="word">{this.props.word.word}</span>{this.props.word.post} </span>;
  }
}

class Sentence extends React.Component {
  render() {
    const words = this.props.contents.words.map((word,i) => <Word word={word} key={i} />);
    return <span className="sentence">{words}</span>;
  }
}

class Paragraph extends React.Component {
  render() {
    const sentences = this.props.sentences.map((sentence,i) => <Sentence contents={sentence} key={i} />);
    return <p>{sentences}</p>;
  }
}

class AnnoText extends React.Component {
  render() {
    const paragraphs = this.props.paragraphs.map((paragraph,i) => <Paragraph sentences={paragraph} key={i} />);
    return <div>{paragraphs}</div>;
  }
}

$(function() {
  $("#text").each(function() {
    $(window).on("resize", function() {
      var winHeight = $(window).height();
      var topMenuHeight = $("#top-menu").outerHeight();
      $("#edit_container").outerHeight(winHeight - topMenuHeight - 1);
    });

    Split(["#text_pane", "#anno_pane"], {
      direction: "vertical",
    });
    var text = $(this).data("text");
    ReactDOM.render(
      <AnnoText paragraphs={text} />,
      document.getElementById("clickable_text"));
  });
})
