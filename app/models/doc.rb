class Doc < Couchbase::Model
  attribute :title
  attribute :language
  attribute :notes
  attribute :text

  view :all

  validates_presence_of :title, :language, :text
end
