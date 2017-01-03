require 'test_helper'

class CreateDocTest < ActiveSupport::TestCase
  setup do
    text = file_fixture("libellus_islandorum.txt").read.freeze
    @creator = Anno::CreateDoc.new(
      title: "Libellus Islandorum",
      language: "Old Norse",
      text: text
    )
    @parsed_text = @creator.options[:text]
  end

  test "parses paragraphs" do
    assert_kind_of Array, @parsed_text
    assert_equal @parsed_text.size, 6
  end

  test "parses sentences" do
    expected_sizes = [4, 1, 2, 4, 2, 6]
    @parsed_text.zip(expected_sizes).each do |paragraph, expected_size|
      assert_kind_of Array, paragraph
      assert_equal paragraph.size, expected_size
    end
  end
end
