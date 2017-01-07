export default class AutoSave {
  constructor() {
    this.delay = 1000;
    this.url = $("#anno_form").attr("action");
    this.initDiff();
  }

  static singleton() {
    if (!this.instance) {
      this.instance = new AutoSave();
    }
    return this.instance;
  }

  static updateWord(wordKey, update) {
    this.singleton().updateWord(wordKey, update);
  }

  initDiff() {
    this.diff = {
      words: {}
    };
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
