require 'test_helper'

class CreateDocTest < ActiveSupport::TestCase
  setup do
    text = file_fixture("libellus_islandorum.txt").read.freeze
    creator = Anno::CreateDoc.new(
      title: "Libellus Islandorum",
      language: "Old Norse",
      text: text
    )
    @paragraphs = creator.options[:text]
  end

  test "splits text into paragraphs" do
    assert_kind_of Array, @paragraphs
    assert_equal 6, @paragraphs.size
  end

  test "splits paragraphs into sentences" do
    expected_sizes = [4, 1, 2, 4, 2, 6]
    @paragraphs.zip(expected_sizes).each do |paragraph, expected_size|
      assert_kind_of Array, paragraph
      assert_equal expected_size, paragraph.size
    end
  end

  test "sentences are objects" do
    sentences = @paragraphs.first
    sentences.each do |sentence|
      assert_kind_of Hash, sentence
    end
  end

  test "splits sentences into words" do
    sentences = @paragraphs.first
    expected_sizes = [17, 26, 19, 18]
    sentences.zip(expected_sizes).each do |sentence, expected_size|
      words = sentence[:words]
      assert_kind_of Array, words
      assert_equal expected_size, words.size
    end
  end

  def assert_word pre, word, post, actual
    expected = { pre: pre, word: word, post: post }
    actual = actual.symbolize_keys
    assert_equal expected, actual
  end

  test "word with combining diacritics" do
    sentences = @paragraphs.first
    sentence = sentences.first
    words = sentence[:words]
    assert_word nil, "Íslendingabók", nil, words[0]
  end

  test "word with post-punctuation" do
    sentences = @paragraphs.first
    sentence = sentences.first
    words = sentence[:words]
    assert_word nil, "Katli", ",", words[8]
  end

  test "standalone punctuation" do
    sentences = @paragraphs[2]
    sentence = sentences.first
    words = sentence[:words]
    assert_equal 65, words.size
    assert_word "--", nil, nil, words[16]
    assert_word ";", nil, nil, words[34]
  end
end
