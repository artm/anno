export default class AutoSave {
  constructor() {
    console.log("new AutoSave");
    this.delay = 5000;
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
    console.log("save", this.diff);
    this.initDiff();
  }
}
