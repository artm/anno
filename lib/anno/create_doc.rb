module Anno
  class CreateDoc
    class << self
      def from *args
        new(*args).doc
      end
    end

    attr_reader :doc

    def initialize options
      options = options.with_indifferent_access.merge(
        text: parse(options[:text])
      )
      @doc = Doc.create!(options)
    end

    private

    def parse string
      string.split(/\n{2,}/).map(&method(:parse_paragraph))
    end

    def parse_paragraph string
      string.scan(sentence_regex).map(&method(:parse_sentence))
    end

    def sentence_regex
      /[^.!?]+[.!?]+/
    end

    def parse_sentence string
      result = []
      string.scan(word_regex) { |pre,word,post|
        result << {
          pre: pre,
          word: word,
          post: post
        }
      }
      result
    end

    def word_regex
      /(\p{P}+)? ((?:\p{L}|\p{M})+)(\p{P}+)?/
    end
  end
end
