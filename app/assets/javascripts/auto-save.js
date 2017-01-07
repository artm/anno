let url = null;

class AutoSave {
  constructor() {
    this.delay = 1000;
    this.initDiff();
  }

  get url() {
    if (!url) { url = $("#anno_form").attr("action"); }
    return url;
  }

  initDiff() {
    this.diff = { words: {} };
  }

  updateWord(wordKey, update) {
    if (!this.diff.words[wordKey]) {
      this.diff.words[wordKey] = {};
    }
    $.extend(true, this.diff.words[wordKey], update)
    this.postponeSave();
  }

  postponeSave() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.timeoutId = null;
      this.save();
    }, this.delay);
  }

  save() {
    $.ajax(this.url, {
      data: { diff: this.diff },
      method: "PATCH"
    });
    this.initDiff();
  }
}

export let autoSave = new AutoSave();
