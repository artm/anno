module Anno
  class PatchDoc
    class << self
      def call *args
        new(*args).call
      end
    end

    def initialize doc, diff
      @doc = doc
      @diff = diff.dup.freeze
    end

    attr_reader :doc, :diff

    def call
      diff["words"].each do |word_key, diff|
        p,s,w = word_key.split(":").map(&:to_i)
        sentence = doc.text[p][s]
        word = sentence["words"][w]
        word.deep_merge!(diff.except("pre", "word", "post"))
      end
      doc.save
    end
  end
end

