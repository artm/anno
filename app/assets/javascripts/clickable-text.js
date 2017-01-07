import React from "react";

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

export default class ClickableText extends React.Component {
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
