require 'test_helper'

class CreateDocTest < ActiveSupport::TestCase
  Libellus = File.read("test/data/libellus_islandorum.txt").freeze
  setup do
    @creator = Anno::CreateDoc.new(
      title: "Libellus Islandorum",
      language: "Old Norse",
      text: Libellus
    )
    @parsed_text = @creator.options[:text]
  end

  test "parses paragraphs" do
    assert @parsed_text.is_a? Array
    assert @parsed_text.size == 6
  end

  test "parses sentences" do
    expected_sizes = [4, 1, 2, 4, 2, 6]
    @parsed_text.zip(expected_sizes).each do |paragraph, expected_size|
      assert paragraph.is_a? Array
      assert paragraph.size == expected_size
    end
  end
end
