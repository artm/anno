module Anno
  class CreateDoc
    class << self
      def from *args
        new(*args).create_doc
      end
    end

    attr_reader :options

    def initialize options
      @options = options.with_indifferent_access.merge(
        text: parse(options[:text])
      )
    end

    def create_doc
      Doc.create!(options)
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
      words = []
      string.scan(word_regex) { |pre,word,post|
        words << {
          pre: pre.presence,
          word: word,
          post: post.presence
        }
      }
      {
        words: words,
        notes: [],
        translations: []
      }
    end

    def word_regex
      /(\p{P}+)|\1?((?:\p{L}|\p{M}|-)+)(\p{P}*)/
    end
  end
end
