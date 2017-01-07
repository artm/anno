let paragraphs = null;

class DocText {
  paragraphs() {
    if (!paragraphs) {
      paragraphs = $("#text").data("text");
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
}

export let docText = new DocText();
