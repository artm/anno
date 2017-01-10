export default class SuggestionSource {
  suggestions() {
    return [];
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
  filterSuggestions(suggestion, currentInput) {
    let words = suggestion.split(/\s+/);
    return words.find((word) => word.startsWith(currentInput));
  }
}
