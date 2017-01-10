export default class SuggestionSource {
  constructor() {
    this.termCounts = {};
    this.suggestions = this.suggestions.bind(this);
    this.compareSuggestions = this.compareSuggestions.bind(this);
    this.shouldRenderSuggestion = this.shouldRenderSuggestion.bind(this);
  }
  bolster(term) {
    if (term) {
      console.log("bolster", term);
      this.termCounts[term] = (this.termCounts[term]||0) + 1;
    }
  }
  weaken(term) {
    if (--this.termCounts[term] <= 0) {
      delete this.termCounts[term];
    }
  }
  suggestions() {
    return Object.keys(this.termCounts);
  }
  compareSuggestions(a, b, currentInput) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
  shouldRenderSuggestion(suggestion, currentInput) {
    let words = suggestion.split(/\s+/);
    return words.find((word) => word.startsWith(currentInput));
  }
}
