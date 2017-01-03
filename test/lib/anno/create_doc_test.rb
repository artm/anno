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
    assert_equal @paragraphs.size, 6
  end

  test "splits paragraphs into sentences" do
    expected_sizes = [4, 1, 2, 4, 2, 6]
    @paragraphs.zip(expected_sizes).each do |paragraph, expected_size|
      assert_kind_of Array, paragraph
      assert_equal paragraph.size, expected_size
    end
  end
end
