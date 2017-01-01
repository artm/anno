import React from 'react';
import ReactDOM from 'react-dom';

class Paragraph extends React.Component {
  render() {
    return <p>paragraph be here</p>;
  }
}

$(function() {
  $("#text").each(function() {
    var text = $(this).data("text");
    console.log(text);
    for(var i=0; i<text.length; i++) {
      ReactDOM.render(
        <Paragraph sentences={text[i]} />,
          document.getElementById('text'));
    }
  });
})
