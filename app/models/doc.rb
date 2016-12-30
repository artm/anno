class Doc < Couchbase::Model
  attribute :title
  attribute :language
  attribute :notes
  attribute :text

  view :all
end
