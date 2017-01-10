import SuggestionSource from "suggestion-source";

let paragraphs = null;
let suggestions = {
  partOfSpeech: new SuggestionSource(),
  dictionaryForm: new SuggestionSource(),
  hereForm: new SuggestionSource(),
  hereMeaning: new SuggestionSource(),
}

class DocText {
  paragraphs() {
    if (!paragraphs) {
      paragraphs = $("#text").data("text");
      this.initSugestions();
    }
    return paragraphs;
  }

  paragraph(key) {
    return this.paragraphs()[key];
  }

  sentence(key) {
    var addr = key.split(":");
    return this.paragraph(addr[0])[addr[1]];
  }

  word(key) {
    var addr = key.split(":");
    return this.paragraph(addr[0])[addr[1]]["words"][addr[2]];
  }

  get suggestions() {
    this.paragraphs();
    return suggestions;
  }

  initSugestions() {
    for(let p in paragraphs) {
      let sentences = paragraphs[p];
      for(let s in sentences) {
        let words = sentences[s].words;
        for(let w in words) {
          let word = words[w];
          if (word.anno) {
            suggestions.partOfSpeech.bolster(word.anno.part_of_speech);
            suggestions.dictionaryForm.bolster(word.anno.dictionary_form);
            suggestions.hereForm.bolster(word.anno.here_form);
            suggestions.hereMeaning.bolster(word.anno.here_meaning);
          }
        }
      }
    }
  }
}

export let docText = new DocText();
