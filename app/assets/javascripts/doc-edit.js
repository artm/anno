import React from "react";
import ReactDOM from "react-dom";

class Word extends React.Component {
  render() {
    return <span>{this.props.word.pre}{this.props.word.word}{this.props.word.post} </span>;
  }
}

class Sentence extends React.Component {
  render() {
    const words = this.props.words.map((word,i) => <Word word={word} key={i} />);
    return <span>{words}</span>;
  }
}

class Paragraph extends React.Component {
  render() {
    const sentences = this.props.sentences.map((sentence,i) => <Sentence words={sentence} key={i} />);
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
    var text = $(this).data("text");
    ReactDOM.render(
      <AnnoText paragraphs={text} />,
      document.getElementById("text"));
  });
})
