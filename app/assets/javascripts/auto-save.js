export default class AutoSave {
  static singleton() {
    if (!this.instance_) {
      this.instance = new AutoSave();
    }
    return this.instance;
  }

  static updateWord(wordKey, update) {
    this.singleton().updateWord(wordKey, update);
  }

  updateWord(wordKey, update) {
    console.log("updateWord", wordKey, update);
  }
}
